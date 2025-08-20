import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const doctorNames = [
  'Dr. Ahmed Khan', 'Dr. Fatima Noor', 'Dr. Ali Raza', 'Dr. Ayesha Siddiqui', 'Dr. Bilal Ahmed',
  'Dr. Hira Zafar', 'Dr. Usman Tariq', 'Dr. Sana Javed', 'Dr. Imran Abbas', 'Dr. Zainab Malik',
  'Dr. Salman Qureshi', 'Dr. Rabia Aslam', 'Dr. Kamran Shah', 'Dr. Mahira Khan', 'Dr. Farhan Saeed'
];
const doctorPics = [
  'https://randomuser.me/api/portraits/men/41.jpg',
  'https://randomuser.me/api/portraits/women/42.jpg',
  'https://randomuser.me/api/portraits/men/43.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/45.jpg',
  'https://randomuser.me/api/portraits/women/46.jpg',
  'https://randomuser.me/api/portraits/men/47.jpg',
  'https://randomuser.me/api/portraits/women/48.jpg',
  'https://randomuser.me/api/portraits/men/49.jpg',
  'https://randomuser.me/api/portraits/women/50.jpg',
  'https://randomuser.me/api/portraits/men/51.jpg',
  'https://randomuser.me/api/portraits/women/52.jpg',
  'https://randomuser.me/api/portraits/men/53.jpg',
  'https://randomuser.me/api/portraits/women/54.jpg',
  'https://randomuser.me/api/portraits/men/55.jpg',
];
const doctors = doctorNames.map((name, i) => ({
  id: String(i + 1),
  name,
  profilePic: doctorPics[i],
  email: `doctor${i + 1}@pakclinic.com`,
  phone: `+92 3${Math.floor(100000000 + Math.random() * 899999999)}`,
  address: `Clinic Address ${i + 1}, Karachi, Pakistan`,
}));

export default function DoctorList({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={doctors}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.doctorItem}>
            <Image source={{ uri: item.profilePic }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('DoctorDetails', { doctor: item })}>
              <Icon name="info-circle" size={24} color="#00aaff" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ChatBox', { user: item.name })}>
              <Icon name="comments" size={24} color="#00aaff" style={styles.icon} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  doctorItem: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderColor: '#eee' },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  name: { fontWeight: 'bold', fontSize: 16 },
  icon: { marginLeft: 10 },
});
