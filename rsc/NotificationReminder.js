import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import NotificationService from '../src/NotificationService'; 

export default function NotificationReminder() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [isDaily, setIsDaily] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    (async () => {
      await NotificationService.initializeNotifications();
      await NotificationService.requestPermissions();
    })();
  }, []);

  const handleDateChange = (_, selected) => { setShowDatePicker(false); if (selected) setDate(selected); };
  const handleTimeChange = (_, selected) => { setShowTimePicker(false); if (selected) setTime(selected); };

  const scheduleNotification = async () => {
    const perm = await NotificationService.checkPermissions();
    if (!perm.alert) { Alert.alert('Permission Required', 'Please allow notifications first.'); return; }

    let result;
    if (isDaily) {
      result = await NotificationService.scheduleDailyNotification(
        time,
        'Daily Reminder',
        'This is your daily reminder!'
      );
    } else {
      const scheduledDate = new Date(date);
      scheduledDate.setHours(time.getHours(), time.getMinutes(), 0, 0);
      result = await NotificationService.scheduleNotification(
        scheduledDate,
        false,
        'Reminder',
        'This is your scheduled reminder!'
      );
    }

    await NotificationService.sendImmediateNotification(
      'Reminder Set',
      `Scheduled for ${result.scheduledDate.toLocaleString()}${isDaily ? ' (Daily)' : ''}`
    );
    Alert.alert('Success', `Scheduled for ${result.scheduledDate.toLocaleString()}${isDaily ? ' (Daily)' : ''}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}><Text style={styles.headerText}>Set Notification</Text></View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={[styles.input, isDaily && styles.disabledInput]}
          onPress={() => !isDaily && setShowDatePicker(true)}
          disabled={isDaily}
          activeOpacity={0.7}
        >
          <Text style={[styles.inputText, isDaily && styles.disabledInputText]}>
            {isDaily ? 'Daily Notification Enabled' : date.toDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} minimumDate={new Date()} />
        )}

        <Text style={styles.label}>Time</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)} activeOpacity={0.7}>
          <Text style={styles.inputText}>{time.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showTimePicker && <DateTimePicker value={time} mode="time" display="default" onChange={handleTimeChange} />}

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Daily Notification?</Text>
          <Switch
            value={isDaily}
            onValueChange={() => setIsDaily(v => !v)}
            thumbColor={isDaily ? '#007bff' : '#ddd'}
            trackColor={{ false: '#ddd', true: '#007bff' }}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={scheduleNotification} activeOpacity={0.8}>
          <Text style={styles.saveButtonText}>Set Reminder</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.immediateTestButton}
          onPress={() => NotificationService.sendImmediateNotification('Immediate Test', 'This appeared instantly!')}
          activeOpacity={0.8}
        >
          <Text style={styles.immediateTestButtonText}>Test Immediate Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={NotificationService.cancelAllNotifications} activeOpacity={0.8}>
          <Text style={styles.cancelButtonText}>Cancel All Notifications</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#f5f7fa' },
  header:{ width:'100%', paddingHorizontal:20, paddingTop:50, paddingBottom:30, backgroundColor:'#007bff', alignItems:'center', borderBottomLeftRadius:30, borderBottomRightRadius:30 },
  headerText:{ fontSize:26, fontWeight:'800', color:'#fff' },
  formContainer:{ backgroundColor:'#fff', borderRadius:15, padding:20, marginTop:20, marginBottom:20, elevation:5 },
  label:{ fontSize:16, fontWeight:'600', color:'#333', marginBottom:8 },
  input:{ backgroundColor:'#f5f7fa', borderRadius:15, paddingVertical:15, paddingHorizontal:20, marginBottom:20, borderWidth:1, borderColor:'#ddd' },
  disabledInput:{ backgroundColor:'#f0f0f0', borderColor:'#e0e0e0' },
  inputText:{ fontSize:16, color:'#333' },
  disabledInputText:{ color:'#999' },
  switchContainer:{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:20 },
  saveButton:{ backgroundColor:'#007bff', paddingVertical:15, borderRadius:15, alignItems:'center' },
  saveButtonText:{ fontSize:18, fontWeight:'600', color:'#fff' },
  immediateTestButton:{ backgroundColor:'#17a2b8', paddingVertical:15, borderRadius:15, alignItems:'center', marginTop:10 },
  immediateTestButtonText:{ fontSize:18, fontWeight:'600', color:'#fff' },
  cancelButton:{ backgroundColor:'#dc3545', paddingVertical:15, borderRadius:15, alignItems:'center', marginTop:10 },
  cancelButtonText:{ fontSize:18, fontWeight:'600', color:'#fff' },
});
