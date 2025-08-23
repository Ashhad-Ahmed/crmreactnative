import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  Dimensions, ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import NotificationService from '../src/NotificationService'; 

const { width } = Dimensions.get('window');

export default function Schedule({ route }) {
  const [roles, setRoles] = useState(['doctor', 'nurse', 'therapist']);
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const timeSlots = [
    '9:00AM to 10:30AM',
    '11:00AM to 12:30PM',
    '01:00PM to 2:30PM',
    '03:00PM to 04:30PM',
    '05:00PM to 06:30PM',
  ];

  useEffect(() => {
    const apiUrls = [
      'http://localhost:8000/getall',
      'http://10.0.2.2:8000/getall',
      'http://192.168.1.100:8000/getall',
    ];
    const fetchData = async () => {
      for (const url of apiUrls) {
        try {
          const response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' }, timeout: 5000 });
          if (response.ok) {
            const data = await response.json();
            setUsers(data.users || []);
            const uniqueRoles = [...new Set((data.users || []).filter(u => u.role !== 'admin').map(u => u.role))];
            if (uniqueRoles.length > 0) setRoles(uniqueRoles);
            return;
          }
        } catch (e) {}
      }
      setRoles(['doctor', 'nurse', 'therapist']);
      setUsers([
        { id: 1, first_name: 'Dr. John', last_name: 'Smith', role: 'doctor' },
        { id: 2, first_name: 'Dr. Sarah', last_name: 'Johnson', role: 'doctor' },
        { id: 3, first_name: 'Nurse', last_name: 'Mary', role: 'nurse' },
        { id: 4, first_name: 'Therapist', last_name: 'Mike', role: 'therapist' },
      ]);
    };
    fetchData();
  }, []);

  const handlePress = async () => {
    if (!selectedRole || !selectedTimeSlot) {
      alert('Please select role and time slot before booking');
      return;
    }
    const roleLabel = selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1);

    // Immediate confirmation
    await NotificationService.sendImmediateNotification(
      'Appointment Booked',
      `You booked ${roleLabel} for ${selectedTimeSlot}`,
    );

    const today = new Date();
    const parseStart = (slotText) => {
      const startPart = slotText.split('to')[0].trim();
      const m = startPart.match(/(\d{1,2}):(\d{2})(AM|PM)/i);
      if (!m) return null;
      let h = parseInt(m[1], 10);
      const min = parseInt(m[2], 10);
      const ap = m[3].toUpperCase();
      if (ap === 'PM' && h !== 12) h += 12;
      if (ap === 'AM' && h === 12) h = 0;
      return new Date(today.getFullYear(), today.getMonth(), today.getDate(), h, min, 0, 0);
    };

    let startAt = parseStart(selectedTimeSlot);
    if (!startAt) {
      alert('Could not parse selected time slot.');
      return;
    }
    if (startAt <= new Date()) {
      startAt.setDate(startAt.getDate() + 1);
    }

    try {
      await NotificationService.scheduleNotification(
        startAt,
        false,
        'Appointment Reminder',
        `Your ${roleLabel} appointment starts now (${selectedTimeSlot.split('to')[0].trim()})`,
      );
    } catch (e) {}

    alert(`You have booked an appointment of ${roleLabel} for ${selectedTimeSlot}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007bff" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Appointment Booking</Text>
        <Text style={styles.subHeaderText}>Check & Book Appointment</Text>
      </View>
      <View style={styles.contentContainer}>
        <ScrollView>
          <View style={styles.cardContainer}>
            <View style={styles.header1}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>ADD APPOINTMENT </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Select Professional Type:</Text>
              <View style={styles.picker}>
                <Picker selectedValue={selectedRole} onValueChange={val => setSelectedRole(val)}>
                  <Picker.Item label="Select a role" value="" />
                  {roles.map((role, idx) => (
                    <Picker.Item key={idx} label={role.charAt(0).toUpperCase() + role.slice(1)} value={role} />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Select Time Slot:</Text>
              <View style={styles.picker}>
                <Picker selectedValue={selectedTimeSlot} onValueChange={val => setSelectedTimeSlot(val)}>
                  <Picker.Item label="Select a time slot" value="" />
                  {timeSlots.map((slot, idx) => (
                    <Picker.Item key={idx} label={slot} value={slot} />
                  ))}
                </Picker>
              </View>
            </View>
            <TouchableOpacity style={styles.checkButton} onPress={handlePress}>
              <Text style={styles.checkButtonText}>BOOK</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: '#007bff',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: { fontSize: 26, fontWeight: '800', color: '#fff', marginBottom: 10 },
  subHeaderText: { fontSize: 16, fontWeight: '400', color: '#e0e0e0' },
  header1: {
    width: '100%',
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  button: { backgroundColor: '#007bff', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 8, elevation: 3 },
  buttonText: { color: 'white', fontWeight: '600', fontSize: 16 },
  contentContainer: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pickerContainer: { marginBottom: 20 },
  pickerLabel: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' },
  picker: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, backgroundColor: '#f9f9f9' },
  checkButton: { backgroundColor: '#007bff', borderRadius: 10, padding: 15, width: '100%', alignItems: 'center', marginTop: 20 },
  checkButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
