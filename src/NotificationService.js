import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';

class NotificationService {
  constructor() {
    this.isInitialized = false;
  }

  initializeNotifications = () => {
    try {
      PushNotification.configure({
        onRegister: function (token) {
          console.log('TOKEN:', token);
        },
        onNotification: function (notification) {
          console.log('NOTIFICATION RECEIVED:', notification);
          if (Platform.OS === 'ios') {
            notification.finish(PushNotificationIOS.FetchResult.NoData);
          }
        },
        permissions: { alert: true, badge: true, sound: true },
        popInitialNotification: true,
        requestPermissions: Platform.OS === 'ios',
        senderID: undefined,
      });

      if (Platform.OS === 'android') {
        PushNotification.createChannel(
          {
            channelId: 'reminder-channel',
            channelName: 'Appointment Reminders',
            channelDescription: 'Channel for appointment reminder notifications',
            playSound: true,
            soundName: 'default',
            importance: 4,
            vibrate: true,
          },
          () => {},
        );
        PushNotification.createChannel(
          {
            channelId: 'immediate-channel',
            channelName: 'Immediate Notifications',
            channelDescription: 'Channel for immediate notifications',
            playSound: true,
            soundName: 'default',
            importance: 5,
            vibrate: true,
          },
          () => {},
        );
      }
      this.isInitialized = true;
    } catch (error) {
      console.log('Error initializing notifications:', error);
    }
  };

  requestPermissions = () => {
    return new Promise((resolve) => {
      try {
        if (Platform.OS === 'ios') {
          PushNotificationIOS.requestPermissions().then((permissions) => resolve(permissions));
        } else {
          resolve({ alert: true, badge: true, sound: true });
        }
      } catch {
        resolve({ alert: false, badge: false, sound: false });
      }
    });
  };

  checkPermissions = () => {
    return new Promise((resolve) => {
      try {
        if (Platform.OS === 'ios') {
          PushNotificationIOS.checkPermissions((permissions) => resolve(permissions));
        } else {
          resolve({ alert: true, badge: true, sound: true });
        }
      } catch {
        resolve({ alert: false, badge: false, sound: false });
      }
    });
  };

  scheduleNotification = (date, isDaily = false, title = 'Reminder', message = 'This is your scheduled reminder!') => {
    let scheduledDate = new Date(date);
    if (scheduledDate <= new Date()) throw new Error('Please select a future date and time');

    const notificationConfig = {
      id: isDaily ? 'daily-reminder' : `reminder-${Date.now()}`,
      channelId: 'reminder-channel',
      title,
      message,
      date: scheduledDate,
      repeatType: isDaily ? 'day' : undefined,
      allowWhileIdle: true,
      importance: 'high',
      priority: 'high',
      playSound: true,
      soundName: 'default',
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_launcher',
    };
    PushNotification.localNotificationSchedule(notificationConfig);
    return { scheduledDate, isDaily };
  };

  sendImmediateNotification = (title, message) => {
    const config = {
      id: `immediate-${Date.now()}`,
      channelId: 'immediate-channel',
      title,
      message,
      allowWhileIdle: true,
      importance: 'high',
      priority: 'high',
      playSound: true,
      soundName: 'default',
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_launcher',
    };
    PushNotification.localNotification(config);
  };

  cancelAllNotifications = () => {
    PushNotification.cancelAllLocalNotifications();
  };
}

export default new NotificationService();
