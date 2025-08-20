import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome6';

import HomeScreen from '../Home';
import SearchScreen from '../BottomTab/Create';
import Chat from '../BottomTab/Chat';
import DoctorList from '../BottomTab/DoctorList';
import ChatBox from '../BottomTab/ChatBox';
import DoctorDetails from '../BottomTab/DoctorDetails';
import { createStackNavigator } from '@react-navigation/stack';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabScreens() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00aaff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon1 name="comments" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Doctor"
        component={DoctorList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user-md" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const TabNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabScreens} />
      <Stack.Screen name="ChatBox" component={ChatBox} />
      <Stack.Screen name="DoctorDetails" component={DoctorDetails} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
  },
});

export default TabNavigator;