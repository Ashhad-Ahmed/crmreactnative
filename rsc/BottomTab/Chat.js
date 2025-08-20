// rsc/BottomTab/Chat.js
import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { ensureSignedIn, getOrCreateChat } from '../../src/firebase';

const users = [
  { id: '1', name: 'Ahmed Khan', profilePic: 'https://randomuser.me/api/portraits/men/31.jpg', lastMessage: 'Salam! Kaise ho?', lastTime: '09:15' },
  { id: '2', name: 'Fatima Noor', profilePic: 'https://randomuser.me/api/portraits/women/32.jpg', lastMessage: 'Kal milte hain?', lastTime: '08:50' },
  { id: '3', name: 'Ali Raza', profilePic: 'https://randomuser.me/api/portraits/men/33.jpg', lastMessage: 'Shukriya!', lastTime: '08:30' },
  { id: '4', name: 'Ayesha Siddiqui', profilePic: 'https://randomuser.me/api/portraits/women/34.jpg', lastMessage: 'Theek hai, Allah Hafiz.', lastTime: '07:45' },
  { id: '5', name: 'Bilal Ahmed', profilePic: 'https://randomuser.me/api/portraits/men/35.jpg', lastMessage: 'File bhej di hai.', lastTime: '07:10' },
  { id: '6', name: 'Hira Zafar', profilePic: 'https://randomuser.me/api/portraits/women/36.jpg', lastMessage: 'Lunch ka plan?', lastTime: '06:55' },
  { id: '7', name: 'Usman Tariq', profilePic: 'https://randomuser.me/api/portraits/men/37.jpg', lastMessage: 'Chalein?', lastTime: '06:30' },
  { id: '8', name: 'Sana Javed', profilePic: 'https://randomuser.me/api/portraits/women/38.jpg', lastMessage: 'Subha bakhair!', lastTime: '06:00' },
  { id: '9', name: 'Imran Abbas', profilePic: 'https://randomuser.me/api/portraits/men/39.jpg', lastMessage: 'Project shuru karte hain.', lastTime: '05:45' },
  { id: '10', name: 'Zainab Malik', profilePic: 'https://randomuser.me/api/portraits/women/40.jpg', lastMessage: 'Bohat shukriya!', lastTime: '05:20' },
];

export default function Chat({ navigation }) {
  const openChat = useCallback(async (item) => {
    try {
      const me = await ensureSignedIn();
      const otherUid = item.id; // demo UID

      const chatId = await getOrCreateChat(
        me.uid,
        { name: me.displayName || 'Me' },
        otherUid,
        { name: item.name, avatar: item.profilePic }
      );

      navigation.navigate('ChatBox', {
        chatId,
        otherUser: { _id: otherUid, name: item.name, avatar: item.profilePic },
      });
    } catch (e) {
      Alert.alert('Error', String(e?.message || e));
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem} onPress={() => openChat(item)}>
            <Image source={{ uri: item.profilePic }} style={styles.avatar} />
            <View style={styles.textContainer}>
              <View style={styles.row}>
                <Text style={styles.user}>{item.name}</Text>
                <Text style={styles.time}>{item.lastTime}</Text>
              </View>
              <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  chatItem: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#fff' },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  textContainer: { flex: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  user: { fontWeight: 'bold', fontSize: 16, color: '#222' },
  time: { color: '#888', fontSize: 12 },
  lastMessage: { color: '#666', marginTop: 4, fontSize: 14 },
  separator: { height: 1, backgroundColor: '#eee', marginLeft: 80 },
});
