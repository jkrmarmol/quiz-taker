import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home';
import Forms from '../screens/Forms';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        component={Home}
        name='Home'
      />
      <Stack.Screen
        component={Forms}
        name='Forms'
      />
    </Stack.Navigator>
  )
}