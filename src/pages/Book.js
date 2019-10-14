import React, { useState } from 'react';
import { SafeAreaView, Alert, TextInput, Image, StyleSheet, StatusBar, TouchableOpacity, AsyncStorage, Text } from 'react-native';

import logo from '../assets/logo.png';
import api from '../services/api';


export default function Book({ navigation }) {
    const id = navigation.getParam('id');
    const [date, setDate] = useState('');

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');
        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: { user_id }
        })

        Alert.alert('Solicitação enviada!');

        navigation.navigate('List');
    }

    function handleCancel() {
        navigation.navigate('List');

    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <Text style={styles.label}>DATA DE INTERESSE</Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data deseja reservar"
                placeholderTextColor='#999'
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Reservar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 35,
        marginHorizontal: 30,
    },

    logo: {
        paddingTop: 25,
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 25
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20.,
        fontSize: 16,
        color: "#444",
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    inputDate: {
        flex: 1,
        alignSelf: 'center',
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },

    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});