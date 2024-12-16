import React, { useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import Topbar from './components/Topbar';
import { MqttProvider } from './context/MqttContext1';
import Connect from './screens/connect';
import MainScreen from './screens/main-screen';
import Devices from './screens/devices';
import Result from './screens/result';
import { SCREEN_NAMES } from './components/ScreenNames';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREEN_NAMES.MAIN);
  const [selectedSensors, setSelectedSensors] = useState([
    { location: 'piwnica', type: 'temperature', selected: false },
    { location: 'miasto', type: 'temperature', selected: false },
    { location: 'piwnica', type: 'humidity', selected: false },
    { location: 'miasto', type: 'humidity', selected: false },
  ]);

  const theme = useColorScheme();

  const backgroundColor = theme === 'dark' ? 'black' : 'white';
  const textColor = theme === 'dark' ? 'white' : 'black';

  return (
    <MqttProvider>
      <View style={[styles.container, { backgroundColor }]}>
        <Topbar selectScreen={setCurrentScreen} currentScreen={currentScreen} textColor={textColor} />
        {currentScreen === SCREEN_NAMES.MAIN && <MainScreen />}
        {currentScreen === SCREEN_NAMES.DEVICES && <Devices setSelectedSensors={setSelectedSensors} selectedSensors={selectedSensors} />}
        {currentScreen === SCREEN_NAMES.CONNECT && <Connect />}
        {currentScreen === SCREEN_NAMES.TEMPERATURE && <Result selectedSensors={selectedSensors} />}
      </View>
    </MqttProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
