import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// ✅ Create Notification Channel (match with Manifest meta-data)
PushNotification.createChannel(
  {
    channelId: 'immediate-channel', // 👈 same as AndroidManifest.xml
    channelName: 'Immediate Notifications',
    importance: 4,
    vibrate: true,
  },
  created => console.log(`createChannel returned '${created}'`)
);

// ✅ Ask permission and get FCM token
messaging()
  .requestPermission()
  .then(authStatus => {
    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log('Permission granted:', authStatus);
    }
  });

messaging()
  .getToken()
  .then(token => {
    console.log('FCM Token:', token);
    // TODO: send token to your backend
  });

messaging().onMessage(async remoteMessage => {
  PushNotification.localNotification({
    channelId: 'immediate-channel',
    title: remoteMessage.notification?.title,
    message: remoteMessage.notification?.body,
  });
});

AppRegistry.registerComponent(appName, () => App);
