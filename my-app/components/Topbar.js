import React from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { SCREEN_NAMES } from "../App";

const nonselectedColor = '#2fa5de';
const selectedColor = '#295039';

const Topbar = ({ selectScreen, currentScreen }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
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
                <TouchableOpacity onPress={() => selectScreen(SCREEN_NAMES.DEVICES)}>
                    <FontAwesome5
                        name="tools"
                        size={27}
                        color={currentScreen === SCREEN_NAMES.DEVICES ? selectedColor : nonselectedColor}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectScreen(SCREEN_NAMES.TEMPERATURE)}>
                    <FontAwesome5
                        name="thermometer-full"
                        size={27}
                        color={currentScreen === SCREEN_NAMES.TEMPERATURE ? selectedColor : nonselectedColor}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white',
    },
    container: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.12,
        shadowRadius: 5.46,
        elevation: 9,
    },
});

export default Topbar;
