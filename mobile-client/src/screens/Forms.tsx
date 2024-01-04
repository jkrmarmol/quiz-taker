import { View, Text, StatusBar, useWindowDimensions } from 'react-native'
import React, { useState, useEffect, useRef, MutableRefObject } from 'react'
import WebView, { WebViewNavigation } from 'react-native-webview'
import { Camera, CameraType, requestCameraPermissionsAsync } from 'expo-camera'
import { NavigationProp, ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native'
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { shareAsync } from 'expo-sharing';
import { StorageAccessFramework } from 'expo-file-system';
import * as WebBrowser from 'expo-web-browser';
import { SafeAreaView } from 'react-native-safe-area-context'



export default function Forms() {
  const nav = useNavigation<NavigationProp<ParamListBase>>()
  const { height, width } = useWindowDimensions();
  const [cameraPermission, cameraRequestPermission] = Camera.useCameraPermissions();
  const [microphonePermission, microphoneRequestPermission] = Camera.useMicrophonePermissions();
  const [mediaLibraryPermission, mediaLibraryRequestPermission] = MediaLibrary.usePermissions();
  const cameraRef = useRef<Camera>(null)




  const startRecording = async () => {
    try {
      if (cameraRef.current) {
        const cameraPer = await cameraRequestPermission();
        const microphonePer = await microphoneRequestPermission();
        if (cameraPer.granted && microphonePer.granted) {
          const data = await cameraRef.current.recordAsync();
          if (data) {
            await mediaLibraryRequestPermission()
            await MediaLibrary.saveToLibraryAsync(data.uri)
            console.log('Saved')
          }
        }

      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err)
      }
    }
  }

  const stopRecording = async () => {
    try {
      if (cameraRef.current) {
        const data = cameraRef.current.stopRecording();
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err)
      }
    }
  }

  const onNavigationUrl = async (event: WebViewNavigation) => {
    try {
      console.log(event)
      if (event.url.includes("formResponse")) {
        console.log('lol')
        stopRecording();
        return nav.navigate('Home')
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
      }
    }
  }


  useEffect(() => {
    (async () => {
      const cameraPermissions = await Camera.requestCameraPermissionsAsync();
      const audioPermission = await Camera.requestMicrophonePermissionsAsync();
      const mediaPermission = await MediaLibrary.requestPermissionsAsync();
      if (!cameraPermissions.granted || !audioPermission.granted || !mediaPermission.granted) {
        return nav.navigate('Home')
      } else {
        if (cameraPermissions.granted && audioPermission.granted && mediaPermission.granted) {
          console.log('started')
          startRecording();
        }
      }
    })()

    return () => {
      stopRecording();
    }
  }, [])
  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      <View style={{
        flex: 1,
        // top: StatusBar.currentHeight
      }}>
        <WebView
          onNavigationStateChange={e => onNavigationUrl(e)}
          style={{ zIndex: 10 }}
          source={{ uri: 'https://docs.google.com/forms/d/e/1FAIpQLSfoeGoldYKl8AQoOJY-5u0uucoUHyi9dPG8CsMjwQws7jpEYw/viewform' }}
        />
        <Camera
          ratio='4:3'
          type={CameraType.front}
          onCameraReady={() => console.log('camera ready!')}
          onMountError={() => console.log('camera error!')}
          style={{
            height: 1
          }}

          ref={cameraRef}
        >

        </Camera>
      </View>
    </SafeAreaView>

  )
}