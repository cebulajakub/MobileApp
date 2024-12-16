import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { useMqtt } from '../context/MqttContext1';

const Devices = ({ setSelectedSensors, selectedSensors }) => {
    const { connected, client } = useMqtt();
    const theme = useColorScheme();

    // Kolory zależne od motywu
    const backgroundColor = theme === 'dark' ? '#333' : 'white';
    const textColor = theme === 'dark' ? 'white' : 'black';
    const buttonColor = theme === 'dark' ? '#444' : '#2fa5de';  // Kolor przycisków

    const handleSensorToggle = (location, type) => {
        setSelectedSensors(prevState =>
            prevState.map(sensor =>
                sensor.location === location && sensor.type === type
                    ? { ...sensor, selected: !sensor.selected } // Przełączamy stan wybrania
                    : sensor
            )
        );
    };

    useEffect(() => {
        if (connected && client) {
            selectedSensors.forEach(sensor => {
                if (sensor.selected) {
                    client.subscribe(`esp32/${sensor.location}/${sensor.type}`);
                } else {
                    client.unsubscribe(`esp32/${sensor.location}/${sensor.type}`);
                }
            });
        }
    }, [connected, client, selectedSensors]);

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={[styles.header, { color: textColor }]}>Wybierz czujniki:</Text>
            {selectedSensors.map((sensor, index) => (
                <View key={index} style={styles.checkboxContainer}>
                    <Text style={{ color: textColor }}>
                        {`${sensor.location} - ${sensor.type === 'temperature' ? 'Temperatura' : 'Wilgotność'}`}
                    </Text>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: sensor.selected ? buttonColor : '#ccc' }]}
                        onPress={() => handleSensorToggle(sensor.location, sensor.type)}
                    >
                        <Text style={styles.buttonText}>{sensor.selected ? "Odznacz" : "Zaznacz"}</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150, // Ustalamy szerokość przycisków
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default Devices;
