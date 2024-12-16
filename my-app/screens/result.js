import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { useMqtt } from '../context/MqttContext1';

const Result = ({ selectedSensors }) => {
    const [sensorData, setSensorData] = useState({});
    const { connected, client } = useMqtt();
    const theme = useColorScheme();

    // Kolory zależne od motywu
    const backgroundColor = theme === 'dark' ? '#333' : 'white';
    const textColor = theme === 'dark' ? 'white' : 'black';

    useEffect(() => {
        if (connected && client) {
            selectedSensors.forEach(sensor => {
                if (sensor.selected) {
                    client.subscribe(`esp32/${sensor.location}/${sensor.type}`);
                }
            });

            client.on('message', (topic, message) => {
                const [_, location, type] = topic.split('/');
                if (selectedSensors.some(sensor => sensor.location === location && sensor.type === type && sensor.selected)) {
                    setSensorData(prevData => ({
                        ...prevData,
                        [`${location}_${type}`]: message.toString(),
                    }));
                }
            });
        }
    }, [connected, client, selectedSensors]);

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={[styles.header, { color: textColor }]}>Wyniki czujników:</Text>
            {selectedSensors.map((sensor, index) => (
                sensor.selected && (
                    <Text key={index} style={[styles.sensorData, { color: textColor }]}>
                        {`${sensor.location} - ${sensor.type === 'temperature' ? 'Temperatura' : 'Wilgotność'}: ${sensorData[`${sensor.location}_${sensor.type}`] || 'Brak danych'}`}
                    </Text>
                )
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
    sensorData: {
        fontSize: 18,
        marginVertical: 10,
    },
});

export default Result;
