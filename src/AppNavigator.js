// src/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

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

// ✅ ChatBox import (BottomTab folder se)
import ChatBox from '../rsc/BottomTab/ChatBox';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Tabs as main entry */}
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        {/* Existing screens */}
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Patient" component={Patient} options={{ headerShown: false }} />
        <Stack.Screen name="Subscription" component={Subscription} options={{ headerShown: false }} />
        <Stack.Screen name="Clinic" component={Clinic} options={{ headerShown: false }} />
        <Stack.Screen name="Features" component={Features} options={{ headerShown: false }} />
        <Stack.Screen name="Schedule" component={Schedule} options={{ headerShown: true }} />
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

        {/* ✅ NEW: Chat details screen (Chat.js se navigate hota hai) */}
        <Stack.Screen
          name="ChatBox"
          component={ChatBox}
          options={({ route }) => ({
            headerShown: true,
            // agar user ka name pass hua hai to title wahi dikhayega
            title: route?.params?.otherUser?.name ?? 'Chat',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
