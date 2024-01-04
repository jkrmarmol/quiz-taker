import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'

export default function Home() {
  const nav = useNavigation<NavigationProp<ParamListBase>>()
  return (
    <View style={[{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'red',
    }]}>
      <Button
        title='Start Quiz'
        onPress={() => nav.navigate('Forms')}
      />
    </View>
  )
}