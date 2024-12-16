import React from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView, useColorScheme } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useMqtt } from '../context/MqttContext1';
import { SCREEN_NAMES } from './ScreenNames';

const nonselectedColor = '#2fa5de';
const selectedColor = '#295039';

const Topbar = ({ selectScreen, currentScreen }) => {
    const { connected } = useMqtt();
    const theme = useColorScheme(); // Pobieramy motyw systemowy (dark/light)

    // Kolory tła i ikon w zależności od trybu
    const backgroundColor = theme === 'dark' ? '#333' : 'white';


    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
            <View style={[styles.container, { backgroundColor }]}>
                <TouchableOpacity onPress={() => selectScreen(SCREEN_NAMES.MAIN)}>
                    <FontAwesome5
                        name="home"
                        size={27}
                        color={currentScreen === SCREEN_NAMES.MAIN ? selectedColor : nonselectedColor}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => selectScreen(SCREEN_NAMES.CONNECT)}>
                    <FontAwesome5
                        name="wifi"
                        size={27}
                        color={currentScreen === SCREEN_NAMES.CONNECT ? selectedColor : nonselectedColor}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => connected && selectScreen(SCREEN_NAMES.DEVICES)}
                    disabled={!connected}
                >
                    <FontAwesome5
                        name="tools"
                        size={27}
                        color={connected
                            ? (currentScreen === SCREEN_NAMES.DEVICES ? selectedColor : nonselectedColor)
                            : '#cccccc'}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => connected && selectScreen(SCREEN_NAMES.TEMPERATURE)}
                    disabled={!connected}
                >
                    <FontAwesome5
                        name="thermometer-full"
                        size={27}
                        color={connected
                            ? (currentScreen === SCREEN_NAMES.TEMPERATURE ? selectedColor : nonselectedColor)
                            : '#cccccc'}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        // Domyślnie tło w SafeAreaView, ale będzie zmieniane w zależności od motywu
    },
    container: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.12,
        shadowRadius: 5.46,
        elevation: 9,
    },
});

export default Topbar;
