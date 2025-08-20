// src/firebase.js
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export async function ensureSignedIn() {
  if (!auth().currentUser) await auth().signInAnonymously();
  return auth().currentUser;
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

export { auth, firestore };
