import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, useColorScheme } from 'react-native';
import { useMqtt } from '../context/MqttContext1.js';

const Connect = () => {
    const { connected, connectToBroker, disconnectFromBroker } = useMqtt();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const theme = useColorScheme();

    // Kolory w zależności od trybu
    const backgroundColor = theme === 'dark' ? '#333' : 'white';
    const textColor = theme === 'dark' ? 'white' : 'black';
    const inputBackgroundColor = theme === 'dark' ? '#555' : '#fff';
    const borderColor = theme === 'dark' ? '#666' : '#ccc';
    const buttonBackgroundColor = theme === 'dark' ? '#444' : '#2fa5de';
    const buttonTextColor = theme === 'dark' ? 'white' : 'white';

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={[styles.header, { color: textColor }]}>Połączenie z Serwerem</Text>

            {!connected && (
                <>
                    <TextInput
                        style={[styles.input, { backgroundColor: inputBackgroundColor, borderColor: borderColor }]}
                        placeholder="Nazwa użytkownika"
                        value={username}
                        onChangeText={setUsername}
                        placeholderTextColor={theme === 'dark' ? '#ccc' : '#888'}
                    />
                    <TextInput
                        style={[styles.input, { backgroundColor: inputBackgroundColor, borderColor: borderColor }]}
                        placeholder="Hasło"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        placeholderTextColor={theme === 'dark' ? '#ccc' : '#888'}
                    />
                </>
            )}

            <TouchableOpacity
                style={[styles.button, { backgroundColor: connected ? 'red' : buttonBackgroundColor }]}
                onPress={connected ? disconnectFromBroker : () => connectToBroker(username, password)}
            >
                <Text style={[styles.buttonText, { color: buttonTextColor }]}>
                    {connected ? 'Rozłącz' : 'Połącz'}
                </Text>
            </TouchableOpacity>

            <Text style={[styles.status, { color: textColor }]}>
                {connected ? 'Połączono z brokerem MQTT' : 'Niepołączony'}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '90%',
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
    },
    button: {
        width: '90%',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    status: {
        marginTop: 10,
        fontSize: 16,
    },
});

export default Connect;
