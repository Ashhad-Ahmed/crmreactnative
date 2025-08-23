
import { Platform, PermissionsAndroid, Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  TriggerType,
  RepeatFrequency,
} from '@notifee/react-native';
import { firestore } from './firebase';

// -- internal: high-importance channel (heads-up) --
async function ensureChannel() {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'General',
    importance: AndroidImportance.HIGH,
  });
  return channelId;
}


async function ensureExactAlarmPermissionAndroid() {
  if (Platform.OS === 'android' && Platform.Version >= 31) {
   
    try {
      await Linking.openSettings();
    } catch (e) {
      console.log('Open settings failed:', e);
    }
  }
}

// -- init/permissions --
async function initializeNotifications() {
  await ensureChannel();
  await ensureExactAlarmPermissionAndroid(); // exact timing ke liye settings prompt
}

async function requestPermissions() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    await PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS');
  }
  const s = await messaging().requestPermission();
  const ok =
    s === messaging.AuthorizationStatus.AUTHORIZED ||
    s === messaging.AuthorizationStatus.PROVISIONAL;
  return { alert: ok, badge: ok, sound: ok };
}

async function checkPermissions() {
  const st = await notifee.getNotificationSettings();
  const ok =
    st.authorizationStatus === notifee.AuthorizationStatus.AUTHORIZED ||
    st.authorizationStatus === notifee.AuthorizationStatus.PROVISIONAL;
  return { alert: ok, badge: ok, sound: ok };
}

// -- optional: FCM token save for server pushes --
async function saveFcmTokenFor(uid) {
  const token = await messaging().getToken();
  await firestore().collection('users').doc(uid).set(
    {
      fcmTokens: firestore.FieldValue.arrayUnion(token),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  return token;
}

// -- immediate tray notification --
async function sendImmediateNotification(title, message, data = {}) {
  const channelId = await ensureChannel();
  await notifee.displayNotification({
    title,
    body: message,
    data,
    android: { channelId, pressAction: { id: 'default' } },
  });
}

// -- one-time schedule at exact Date (offline ok) --
async function scheduleNotification(date, _isDaily = false, title = 'Reminder', message = 'This is your scheduled reminder!', data = {}) {
  if (date <= new Date()) throw new Error('Please select a future date and time');
  const channelId = await ensureChannel();
  await notifee.createTriggerNotification(
    {
      title,
      body: message,
      data,
      android: {
        channelId,
        pressAction: { id: 'default' },
      },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      alarmManager: true, // exact/alarm behavior
    }
  );
  return { scheduledDate: date, isDaily: false };
}

// -- daily repeating based on time (hours/minutes) --
async function scheduleDailyNotification(time, title = 'Daily Reminder', message = 'This is your daily reminder!', data = {}) {
  const now = new Date();
  const first = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    time.getHours(),
    time.getMinutes(),
    0,
    0
  );
  if (first <= new Date()) first.setDate(first.getDate() + 1);

  const channelId = await ensureChannel();
  await notifee.createTriggerNotification(
    {
      title,
      body: message,
      data,
      android: { channelId, pressAction: { id: 'default' } },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp: first.getTime(),
      repeatFrequency: RepeatFrequency.DAILY,
      alarmManager: true,
    }
  );
  return { scheduledDate: first, isDaily: true };
}

async function cancelAllNotifications() {
  await notifee.cancelAllNotifications();
}

// quick smoke test
async function testNotification() {
  const t = new Date(Date.now() + 10 * 1000);
  await scheduleNotification(t, false, 'Test Notification', 'This is a test notification!');
}

export default {
  initializeNotifications,
  requestPermissions,
  checkPermissions,
  saveFcmTokenFor,
  sendImmediateNotification,
  scheduleNotification,
  scheduleDailyNotification,
  cancelAllNotifications,
  testNotification,
};
