import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    Text,
    View,
    TextInput,
    ToastAndroid,
    AsyncStorage,
    TouchableOpacity,
} from 'react-native';
import ApiService from './../../services/api.service';
import AuthService from './../../services/auth.service';

import styles from './style';



export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    AuthenticationUser() {

        let data = {
            username: `${this.state.username}`,
            password: `${this.state.password}`,
        }

        ApiService.post('/login/', data)
            .then(response => response.json())
            .then((data) => {
                if (data.success) {
                    ToastAndroid.show('Success', ToastAndroid.SHORT);
                    AuthService.setToken(data.token);
                    Actions.list();
                    return;
                }
                ToastAndroid.show(`${data.message}`, ToastAndroid.SHORT);
            });
    }

    setDataForSignIn(data, id) {
        switch (id) {
            case 'username':
                this.setState({
                    username: `${data}`
                });
                break;

            case 'password':
                this.setState({
                    password: `${data}`
                });
                break;
        }
    }

    singIn() {
        this.AuthenticationUser();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput
                        style={styles.field}
                        placeholderTextColor='#4682B4'
                        placeholder='Username'
                        onChangeText={(text) => this.setDataForSignIn(text, 'username')} />
                    <TextInput
                        style={styles.field} placeholder='Password'
                        placeholderTextColor='#4682B4'
                        secureTextEntry={true}
                        onChangeText={(text) => this.setDataForSignIn(text, 'password')} />
                    <TouchableOpacity
                        onPress={() => this.singIn()}
                        style={styles.button}>
                        <Text> Sing in</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => Actions.list()}
                    style={styles.buttonBrows}>
                    <Text style={styles.textBrows}> BROWSING PRODUCTS </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => Actions.register()}
                    style={styles.textReg}>
                    <Text> Did you register?  </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
