
import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import AppNavigator from './src/AppNavigator';
import NotificationService from './src/NotificationService';

const App = () => {
  // Initialize NotificationService (it's configured in its constructor)
  console.log('App initialized with NotificationService');

  return(
      <AppNavigator />
    
  )
}


export default App;
