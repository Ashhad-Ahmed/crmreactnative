
import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import App from './App';
import {name as appName} from './app.json';

// Foreground FCM -> tray
messaging().onMessage(async remoteMessage => {
  const n = remoteMessage?.notification;
  const d = remoteMessage?.data || {};
  const title = n?.title || d?.title || 'Notification';
  const body  = n?.body  || d?.body  || 'You have a new message';

  await notifee.createChannel({ id: 'default', name: 'General' });
  await notifee.displayNotification({
    title,
    body,
    android: { channelId: 'default', pressAction: { id: 'default' } },
    data: d,
  });
});

// Background/Quit FCM -> tray
messaging().setBackgroundMessageHandler(async remoteMessage => {
  const n = remoteMessage?.notification;
  const d = remoteMessage?.data || {};
  const title = n?.title || d?.title || 'Notification';
  const body  = n?.body  || d?.body  || 'You have a new message';

  await notifee.createChannel({ id: 'default', name: 'General' });
  await notifee.displayNotification({
    title,
    body,
    android: { channelId: 'default', pressAction: { id: 'default' } },
    data: d,
  });
});

AppRegistry.registerComponent(appName, () => App);
