import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
} from 'react-native';

import styles from './style';


class Register extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            passwordConfirm: ''
        }
    }

    registerUser() {
        fetch('http://smktesting.herokuapp.com/api/register/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: `${this.state.uaername}`,
                password: `${this.state.password}`,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    ToastAndroid.show('Success', ToastAndroid.LONG);
                } else {
                    ToastAndroid.show(`${data.message}`, ToastAndroid.LONG);
                }
            });
    }

    setDataForRegistration(data, id) {
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

            case 'passwordConfirm':
                this.setState({
                    passwordConfirm: `${data}`
                });
                break;
        }

    }

    verifyPasswordMatching() {
        if (this.state.password !== this.state.passwordConfirm) {
            ToastAndroid.show('Passwords do not match', ToastAndroid.LONG);
            return false;
        }

        return true;
    }

    sendUserDataForRegistration() {
        if (this.verifyPasswordMatching()) {
            this.registerUser();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput
                        style={styles.field}
                        placeholder='New username'
                        onChangeText={(text) => this.setDataForRegistration(text, 'username')}
                    />
                    <TextInput
                        style={styles.field} placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={(text) => this.setDataForRegistration(text, 'password')}
                    />
                    <TextInput
                        style={styles.field} placeholder='Confirm password'
                        secureTextEntry={true}
                        onChangeText={(text) => this.setDataForRegistration(text, 'passwordConfirm')}
                    />
                    <TouchableOpacity onPress={() => this.sendUserDataForRegistration()} style={styles.button}>
                        <Text> Register </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Register;