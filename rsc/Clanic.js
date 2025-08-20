import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const clinicsData = [
  {
    id: '1',
    name: 'City Health Clinic',
    address: '123 Main St, Springfield',
    phone: '(555) 123-4567',
    hours: 'Mon-Fri 8am - 6pm',
  },
  {
    id: '2',
    name: 'Downtown Medical Center',
    address: '456 Elm St, Springfield',
    phone: '(555) 987-6543',
    hours: 'Mon-Sat 9am - 7pm',
  },
  {
    id: '3',
    name: 'Green Valley Clinic',
    address: '789 Oak Ave, Springfield',
    phone: '(555) 246-8101',
    hours: 'Mon-Fri 7am - 5pm',
  },
  {
    id: '4',
    name: 'Sunrise Family Clinic',
    address: '321 Pine Rd, Springfield',
    phone: '(555) 369-1212',
    hours: 'Mon-Sun 8am - 8pm',
  },
];

const Clinic = () => {
  const navigation = useNavigation();

  const renderClinicItem = ({ item }) => (
    <TouchableOpacity style={styles.clinicCard} activeOpacity={0.7} onPress={() => {
      // Example navigation or action
      alert(`Selected clinic:\n${item.name}`);
    }}>
      <Text style={styles.clinicName}>{item.name}</Text>
      <Text style={styles.clinicInfo}>{item.address}</Text>
      <Text style={styles.clinicInfo}>Phone: {item.phone}</Text>
      <Text style={styles.clinicInfo}>Hours: {item.hours}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Clinics</Text>
        <Text style={styles.subHeaderText}>Find and update clinic details</Text>
      </View>

      <FlatList
        data={clinicsData}
        keyExtractor={(item) => item.id}
        renderItem={renderClinicItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa', // consistent with other pages
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: '#007bff', // primary blue
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 6,
  },
  subHeaderText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#e0e0e0',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  clinicCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  clinicName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  clinicInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
});

export default Clinic;


