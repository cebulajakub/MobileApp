import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Topbar from './components/Topbar.js';
import { useState } from 'react';
import Connect from './screens/connect.js';
import MainScreen from './screens/main-screen.js';
import Devices from './screens/devices.js';
import Result from './screens/result.js';

export const SCREEN_NAMES = {
  MAIN: 'main',
  DEVICES: 'devices',
  CONNECT: 'connect',
  TEMPERATURE: 'temperature'
}


export default function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREEN_NAMES.MAIN)
  return (
    <View style={styles.container}>
      <Topbar selectScreen={setCurrentScreen} currentScreen={currentScreen} />
      {currentScreen == SCREEN_NAMES.MAIN && <MainScreen />}
      {currentScreen == SCREEN_NAMES.DEVICES && <Devices />}
      {currentScreen == SCREEN_NAMES.CONNECT && <Connect />}
      {currentScreen == SCREEN_NAMES.TEMPERATURE && <Result />}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
