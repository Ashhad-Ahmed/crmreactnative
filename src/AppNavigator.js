import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../rsc/Splash';
import Main from '../rsc/Main';
import Signup from '../rsc/Signup';
import Home from '../rsc/Home';
import TabNavigator from '../rsc/BottomTab/TabNavigation';
import Doctor from '../rsc/BottomTab/Doctor';
import Pharmacist from '../rsc/BottomTab/Pharmacist';
import Create from '../rsc/BottomTab/Create';
import Patient from '../rsc/Patientlist';
import Subscription from '../rsc/subscription';
import Clinic from '../rsc/Clanic';
import Features from '../rsc/Features';
import NotificationReminder from '../rsc/NotificationReminder';
import BmiCheckup from '../rsc/BmiCheckup';
import Pediatrics from '../rsc/Pediatrics';
import DrugInteractionCheckup from '../rsc/DrugInteractionCheckup';
import Schedule from '../rsc/Schedule';
import ChatBox from '../rsc/BottomTab/ChatBox';
import NotificationService from './NotificationService';

const Stack = createStackNavigator();

export default function AppNavigator() {
  useEffect(() => {
    (async () => {
      try {
        await NotificationService.initializeNotifications();
        await NotificationService.requestPermissions();
   
      } catch (e) {
        console.log('Notification init error:', e);
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShadowVisible: false }}>
        {/* Tabs as main entry */}
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />

        {/* Existing screens */}
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />

        {/* (Optional) If you navigate to these directly outside tabs */}
        <Stack.Screen name="Doctor" component={Doctor} options={{ headerShown: true, title: 'Doctor' }} />
        <Stack.Screen name="Pharmacist" component={Pharmacist} options={{ headerShown: true, title: 'Pharmacist' }} />
        <Stack.Screen name="Create" component={Create} options={{ headerShown: true, title: 'Create' }} />

        <Stack.Screen name="Patient" component={Patient} options={{ headerShown: false }} />
        <Stack.Screen name="Subscription" component={Subscription} options={{ headerShown: false }} />
        <Stack.Screen name="Clinic" component={Clinic} options={{ headerShown: false }} />
        <Stack.Screen name="Features" component={Features} options={{ headerShown: false }} />
        <Stack.Screen name="Schedule" component={Schedule} options={{ headerShown: true, title: 'Schedule' }} />

        <Stack.Screen
          name="NotificationReminder"
          component={NotificationReminder}
          options={{ title: 'Set Notification Reminder' }}
        />

        <Stack.Screen name="BmiCheckup" component={BmiCheckup} options={{ title: 'BMI Checkup' }} />
        <Stack.Screen name="Pediatrics" component={Pediatrics} options={{ title: 'Pediatrics' }} />
        <Stack.Screen
          name="DrugInteractionCheckup"
          component={DrugInteractionCheckup}
          options={{ title: 'Drug Interaction Checkup' }}
        />

        {/* Chat details */}
        <Stack.Screen
          name="ChatBox"
          component={ChatBox}
          options={({ route }) => ({
            headerShown: true,
            title: route?.params?.otherUser?.name ?? route?.params?.user ?? 'Chat',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
