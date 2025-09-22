import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

import { AuthProvider } from './contexts/AuthContext';
import CameraScreen from './screens/CameraScreen';
import GalleryScreen from './screens/GalleryScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#ff6b6b',
            tabBarInactiveTintColor: '#666',
            tabBarStyle: {
              backgroundColor: '#fff',
              borderTopWidth: 1,
              borderTopColor: '#e0e0e0',
              height: 80,
              paddingBottom: 20,
              paddingTop: 10,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
            headerShown: false,
          }}
        >
          <Tab.Screen 
            name="Camera" 
            component={CameraScreen}
            options={{
              tabBarIcon: ({ focused, color }) => (
                <CameraIcon color={color} focused={focused} />
              ),
            }}
          />
          <Tab.Screen 
            name="Gallery" 
            component={GalleryScreen}
            options={{
              tabBarIcon: ({ focused, color }) => (
                <GalleryIcon color={color} focused={focused} />
              ),
            }}
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ focused, color }) => (
                <ProfileIcon color={color} focused={focused} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

// Simple icon components using text emojis for now
const CameraIcon = ({ color, focused }) => (
  <View>
    <Text style={{ fontSize: focused ? 24 : 20, color }}>📷</Text>
  </View>
);

const GalleryIcon = ({ color, focused }) => (
  <View>
    <Text style={{ fontSize: focused ? 24 : 20, color }}>🖼️</Text>
  </View>
);

const ProfileIcon = ({ color, focused }) => (
  <View>
    <Text style={{ fontSize: focused ? 24 : 20, color }}>👤</Text>
  </View>
);