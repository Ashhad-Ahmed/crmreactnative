import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function DoctorDetails({ route }) {
  const { doctor } = route.params;
  return (
    <View style={styles.container}>
      <Image source={{ uri: doctor.profilePic }} style={styles.avatar} />
      <Text style={styles.name}>{doctor.name}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{doctor.email}</Text>
      <Text style={styles.label}>Phone:</Text>
      <Text style={styles.value}>{doctor.phone}</Text>
      <Text style={styles.label}>Clinic Address:</Text>
      <Text style={styles.value}>{doctor.address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  name: { fontWeight: 'bold', fontSize: 22, marginBottom: 10 },
  label: { fontWeight: 'bold', fontSize: 16, marginTop: 10 },
  value: { fontSize: 16 },
});
