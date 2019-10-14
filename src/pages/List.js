import React, { useState, useEffect } from 'react';
import { Icon } from 'react-native-elements';
import socketio from 'socket.io-client';
import { SafeAreaView, Alert, AsyncStorage, Image, StyleSheet, ScrollView, View } from 'react-native';

import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function List({ navigation }) {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.105:3333', {
                query: { user_id }
            });

            socket.on('booking_response', booking => {
                Alert.alert(
                    "Alerta de Reserva",
                    `Sua reserva em ${booking.spot.company} para ${booking.date} foi ${booking.approved ? 'APROVADA' : 'RECUSADA'}`
                )
            })
        });
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, [])

    async function handleLogout() {
        Alert.alert(
            'Logout',
            'Tem certeza que deseja sair ?',
            [
                { text: 'Sim', onPress: () => logoutConfirmed() },
                { text: 'Voltar', onPress: () => logoutCancelled() },
            ],
            { cancelable: true },
        );
    };

    function logoutConfirmed() {
        AsyncStorage.removeItem('user', 'techs');
        navigation.navigate('Login');
    };

    function logoutCancelled() {
        navigation.navigate('List');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.row}>
                <Image style={styles.logo} source={logo} />
                <Icon
                    containerStyle={styles.logoutButton}
                    color='#f05a5b'
                    name='sign-out'
                    type='font-awesome'
                    onPress={() => handleLogout()}
                />
            </View>
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 35,
        marginHorizontal: 5,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    logo: {
        flex: 0,
        paddingTop: 25,
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,
    },

    logoutButton: {
        height: 32,
        flex: 0,
        alignSelf: 'flex-end',
        right: 15,
    }
});