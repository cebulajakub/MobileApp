import React, { createContext, useContext, useState } from 'react';
import mqtt from 'mqtt'; // Używamy domyślnego klienta mqtt

const MqttContext = createContext();

export const useMqtt = () => useContext(MqttContext);

export const MqttProvider = ({ children }) => {
    const [client, setClient] = useState(null);
    const [connected, setConnected] = useState(false);

    const connectToBroker = (username, password) => {
        if (connected) return;

        const brokerUrl = 'wss://14a1026d11054c1c86fd47da139743d6.s1.eu.hivemq.cloud:8884/mqtt';
        const options = {
            username,
            password,
            protocol: 'wss',
        };

        const mqttClient = mqtt.connect(brokerUrl, options);

        mqttClient.on('connect', () => {
            console.log('Połączono z brokerem MQTT');
            setClient(mqttClient);
            setConnected(true);
        });

        mqttClient.on('error', (err) => {
            console.error('Błąd połączenia MQTT:', err);
            setConnected(false);
        });

        mqttClient.on('close', () => {
            console.log('Rozłączono z brokerem MQTT');
            setConnected(false);
        });
    };

    const disconnectFromBroker = () => {
        if (client) {
            client.end();
            console.log('Rozłączono z brokera MQTT');
            setClient(null);
            setConnected(false);
        }
    };

    return (
        <MqttContext.Provider value={{ connected, connectToBroker, disconnectFromBroker }}>
            {children}
        </MqttContext.Provider>
    );
};
