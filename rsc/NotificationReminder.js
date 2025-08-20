import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import NotificationService from '../src/NotificationService';
import PushNotification from 'react-native-push-notification';

export default function NotificationReminder({ route }) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [isDaily, setIsDaily] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    console.log('NotificationReminder component mounted');
    
    // Initialize notifications and request permissions
    const initializeNotifications = async () => {
      try {
        // Initialize notifications first
        NotificationService.initializeNotifications();
        
        // Then request permissions
        const permissions = await NotificationService.requestPermissions();
        console.log('Notification permissions granted:', permissions);
      } catch (error) {
        console.log('Error initializing notifications:', error);
      }
    };
    
    initializeNotifications();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const toggleDailyNotification = () => {
    setIsDaily(!isDaily);
  };

  const scheduleNotification = async () => {
    try {
      // Check permissions first
      const permissions = await NotificationService.checkPermissions();
      console.log('Current permissions:', permissions);
      
      if (!permissions.alert) {
        Alert.alert(
          'Permission Required',
          'Please grant notification permissions to set reminders.',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Grant Permission', 
              onPress: async () => {
                try {
                  await NotificationService.requestPermissions();
                  // Retry scheduling after permission is granted
                  setTimeout(() => scheduleNotification(), 1000);
                } catch (error) {
                  Alert.alert('Error', 'Failed to get notification permissions.');
                }
              }
            }
          ]
        );
        return;
      }

      let result;
      
      if (isDaily) {
        // For daily notifications
        result = NotificationService.scheduleDailyNotification(
          time,
          'Daily Reminder',
          'This is your daily reminder!'
        );
      } else {
        // For one-time notifications, combine the selected date and time
        const scheduledDate = new Date(date);
        scheduledDate.setHours(time.getHours());
        scheduledDate.setMinutes(time.getMinutes());
        scheduledDate.setSeconds(0);
        scheduledDate.setMilliseconds(0);
        
        result = NotificationService.scheduleNotification(
          scheduledDate,
          false,
          'Reminder',
          'This is your scheduled reminder!'
        );
      }

      // Call PushNotification to schedule the local notification
      PushNotification.localNotificationSchedule({
        message: `Your reminder has been scheduled for ${result.scheduledDate.toLocaleString()}${isDaily ? ' (Daily)' : ''}`,
        date: result.scheduledDate,
        allowWhileIdle: true,
      });

      Alert.alert(
        'Reminder Set',
        `Your reminder has been scheduled for ${result.scheduledDate.toLocaleString()}${
          isDaily ? ' (Daily)' : ''
        }`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleSave = () => {
    scheduleNotification();
  };

  const cancelAllNotifications = () => {
    NotificationService.cancelAllNotifications();
    Alert.alert('Notifications Cancelled', 'All scheduled notifications have been cancelled.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Set Notification</Text>
      </View>

      <View style={styles.formContainer}>
        {/* Date Picker */}
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
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}

        {/* Time Picker */}
        <Text style={styles.label}>Time</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowTimePicker(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.inputText}>{time.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        {/* Daily Notification Switch */}
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Daily Notification?</Text>
          <Switch
            value={isDaily}
            onValueChange={toggleDailyNotification}
            thumbColor={isDaily ? '#007bff' : '#ddd'}
            trackColor={{ false: '#ddd', true: '#007bff' }}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Set Reminder</Text>
        </TouchableOpacity>

        {/* Cancel All Notifications Button */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={cancelAllNotifications}
          activeOpacity={0.8}
        >
          <Text style={styles.cancelButtonText}>Cancel All Notifications</Text>
        </TouchableOpacity>

        {/* Check Permissions Button */}
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={async () => {
            try {
              const permissions = await NotificationService.checkPermissions();
              console.log('Current permissions:', permissions);
              
              if (permissions.alert) {
                Alert.alert('Permissions Status', 'Notification permissions are granted! ✅');
              } else {
                Alert.alert(
                  'Permissions Status', 
                  'Notification permissions are not granted. Please grant permissions to use notifications.',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { 
                      text: 'Grant Permission', 
                      onPress: async () => {
                        try {
                          const newPermissions = await NotificationService.requestPermissions();
                          console.log('New permissions:', newPermissions);
                          if (newPermissions.alert) {
                            Alert.alert('Success', 'Notification permissions granted! ✅');
                          } else {
                            Alert.alert('Error', 'Failed to get notification permissions.');
                          }
                        } catch (error) {
                          Alert.alert('Error', 'Failed to get notification permissions.');
                        }
                      }
                    }
                  ]
                );
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to check permissions.');
            }
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.permissionButtonText}>Check Permissions</Text>
        </TouchableOpacity>

        {/* Immediate Test Notification Button */}
        <TouchableOpacity
          style={styles.immediateTestButton}
          onPress={async () => {
            try {
              // Check permissions first
              const permissions = await NotificationService.checkPermissions();
              console.log('Immediate test permissions:', permissions);
              
              if (!permissions.alert) {
                Alert.alert(
                  'Permission Required',
                  'Please grant notification permissions to test notifications.',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { 
                      text: 'Grant Permission', 
                      onPress: async () => {
                        try {
                          await NotificationService.requestPermissions();
                          // Send immediate notification after permission is granted
                          setTimeout(() => {
                            NotificationService.sendImmediateNotification(
                              'Immediate Test',
                              'This notification appeared immediately!'
                            );
                            Alert.alert('Success', 'Immediate notification sent!');
                          }, 1000);
                        } catch (error) {
                          Alert.alert('Error', 'Failed to get notification permissions.');
                        }
                      }
                    }
                  ]
                );
                return;
              }

              NotificationService.sendImmediateNotification(
                'Immediate Test',
                'This notification appeared immediately!'
              );
              Alert.alert('Success', 'Immediate notification sent!');
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.immediateTestButtonText}>Test Immediate Notification</Text>
        </TouchableOpacity>

        {/* Simple Test Button */}
        <TouchableOpacity
          style={styles.simpleTestButton}
          onPress={() => {
            try {
              NotificationService.testNotification();
              Alert.alert('Test', 'Basic notification test completed!');
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.simpleTestButtonText}>Simple Test</Text>
        </TouchableOpacity>

        {/* Test Notification Button */}
        <TouchableOpacity
          style={styles.testButton}
          onPress={async () => {
            try {
              // Check permissions first
              const permissions = await NotificationService.checkPermissions();
              console.log('Test notification permissions:', permissions);
              
              if (!permissions.alert) {
                Alert.alert(
                  'Permission Required',
                  'Please grant notification permissions to test notifications.',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { 
                      text: 'Grant Permission', 
                      onPress: async () => {
                        try {
                          await NotificationService.requestPermissions();
                          // Retry test after permission is granted
                          setTimeout(() => {
                            const testDate = new Date();
                            testDate.setSeconds(testDate.getSeconds() + 10);
                            NotificationService.scheduleNotification(
                              testDate,
                              false,
                              'Test Notification',
                              'This is a test notification!'
                            );
                            Alert.alert('Test Notification', 'A test notification will appear in 10 seconds!');
                          }, 1000);
                        } catch (error) {
                          Alert.alert('Error', 'Failed to get notification permissions.');
                        }
                      }
                    }
                  ]
                );
                return;
              }

              const testDate = new Date();
              testDate.setSeconds(testDate.getSeconds() + 10); // 10 seconds from now
              
              NotificationService.scheduleNotification(
                testDate,
                false,
                'Test Notification',
                'This is a test notification!'
              );
              Alert.alert('Test Notification', 'A test notification will appear in 10 seconds!');
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.testButtonText}>Test Notification (10s)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
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
  headerText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f7fa',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    borderColor: '#e0e0e0',
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  disabledInputText: {
    color: '#999',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  testButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  testButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  permissionButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  permissionButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  immediateTestButton: {
    backgroundColor: '#17a2b8',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  immediateTestButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  simpleTestButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  simpleTestButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
