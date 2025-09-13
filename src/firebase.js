// src/firebase.js
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

export async function ensureSignedIn() {
  if (!auth().currentUser) await auth().signInAnonymously();
  const user = auth().currentUser;
  
  // Save FCM token for push notifications (using existing NotificationService function)
  try {
    const token = await messaging().getToken();
    await firestore().collection('users').doc(user.uid).set(
      {
        fcmTokens: firestore.FieldValue.arrayUnion(token),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  } catch (e) {
    console.log('Failed to save FCM token:', e);
  }
  
  return user;
}

export async function getOrCreateChat(uidA, userA, uidB, userB) {
  const membersKey = [uidA, uidB].sort().join('_');
  const chatsRef = firestore().collection('chats');
  const snap = await chatsRef.where('membersKey', '==', membersKey).limit(1).get();
  if (!snap.empty) return snap.docs[0].id;

  const doc = await chatsRef.add({
    membersKey,
    members: [
      { _id: uidA, name: userA?.name || 'Me', avatar: userA?.avatar || null },
      { _id: uidB, name: userB?.name || 'User', avatar: userB?.avatar || null },
    ],
    lastMessage: '',
    updatedAt: firestore.FieldValue.serverTimestamp(),
  });
  return doc.id;
}

// Function to send push notification to the receiver (not sender)
export async function sendChatNotification(toUid, senderName, messageText) {
  try {
    // Get the receiver's FCM tokens from Firestore
    const userDoc = await firestore().collection('users').doc(toUid).get();
    const userData = userDoc.data();
    const fcmTokens = userData?.fcmTokens || [];
    
    if (fcmTokens.length === 0) {
      console.log('No FCM tokens found for receiver:', toUid);
      return;
    }

    // Get current user to avoid sending notification to self
    const currentUser = auth().currentUser;
    if (currentUser && currentUser.uid === toUid) {
      console.log('Skipping notification - sending to self');
      return;
    }

    // For now, we'll use a simple approach: store notification data in Firestore
    // The receiver's app will check for new notifications and display them
    await firestore().collection('notifications').add({
      toUid: toUid,
      fromUid: currentUser?.uid,
      title: `New message from ${senderName}`,
      body: messageText,
      type: 'chat_message',
      read: false,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    console.log('Notification data saved for user:', toUid);
  } catch (e) {
    console.log('Failed to send chat notification:', e);
  }
}

export { auth, firestore };
