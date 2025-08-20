// rsc/BottomTab/ChatBox.js
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, StyleSheet, Image, Alert } from 'react-native';
import { ensureSignedIn, firestore } from '../../src/firebase';
import firestoreModule from '@react-native-firebase/firestore';

export default function ChatBox({ route }) {
  const { chatId, otherUser } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [me, setMe] = useState({ _id: '', name: 'Me', avatar: null });
  const flatListRef = useRef();

  useEffect(() => {
    let unsub;
    (async () => {
      try {
        const u = await ensureSignedIn();
        setMe({ _id: u.uid, name: u.displayName || 'Me', avatar: null });

        unsub = firestore()
          .collection('chats').doc(chatId)
          .collection('messages')
          .orderBy('createdAt', 'asc')
          .limit(200)
          .onSnapshot(snap => {
            const rows = snap.docs.map(d => {
              const data = d.data();
              return {
                id: d.id,
                fromMe: data?.user?._id === u.uid,
                text: data?.text || '',
                createdAt: data?.createdAt?.toDate?.() || new Date(),
              };
            });
            setMessages(rows);
          });
      } catch (e) {
        Alert.alert('Error', String(e?.message || e));
      }
    })();
    return () => unsub && unsub();
  }, [chatId]);

  const sendMessage = useCallback(async () => {
    const text = (input || '').trim();
    if (!text) return;

    try {
      const chatRef = firestore().collection('chats').doc(chatId);
      const msgRef  = chatRef.collection('messages').doc();

      const msg = {
        _id: msgRef.id,
        text,
        user: { _id: me._id, name: me.name, avatar: me.avatar },
        createdAt: firestoreModule.FieldValue.serverTimestamp(),
      };

      const batch = firestore().batch();
      batch.set(msgRef, msg);
      batch.set(chatRef, {
        lastMessage: text,
        updatedAt: firestoreModule.FieldValue.serverTimestamp(),
      }, { merge: true });

      await batch.commit();
      setInput('');
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 50);
    } catch (e) {
      Alert.alert('Send failed', String(e?.message || e));
    }
  }, [chatId, input, me._id, me.name, me.avatar]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View style={styles.header}>
        {!!otherUser?.avatar && <Image source={{ uri: otherUser.avatar }} style={styles.avatar} />}
        <Text style={styles.headerText}>{otherUser?.name || 'Chat'}</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.message, item.fromMe ? styles.myMessage : styles.otherMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 10, paddingBottom: 20 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#00aaff', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  headerText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  message: { padding: 10, borderRadius: 15, marginVertical: 5, maxWidth: '80%' },
  myMessage: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
  otherMessage: { backgroundColor: '#fff', alignSelf: 'flex-start', borderWidth: 1, borderColor: '#eee' },
  messageText: { fontSize: 16 },
  inputRow: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#f8f8f8' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingHorizontal: 15, height: 40, backgroundColor: '#fff' },
  sendBtn: { backgroundColor: '#00aaff', borderRadius: 20, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 10, height: 40 },
});
