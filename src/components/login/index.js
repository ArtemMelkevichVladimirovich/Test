import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, ToastAndroid, AsyncStorage } from 'react-native';
import styles from './style';
import { Actions } from 'react-native-router-flux';


export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  AuthenticationUser() {
    fetch('http://smktesting.herokuapp.com/api/login/',
      {
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
          AsyncStorage.setItem('Token', data.token);
          Actions.list();
        } else {
          ToastAndroid.show(`${data.message}`, ToastAndroid.SHORT);
        }
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
            onChangeText={(text) => this.setDataForSignIn(text, 'username')}
          />
          <TextInput
            style={styles.field} placeholder='Password'
            placeholderTextColor='#4682B4'
            secureTextEntry={true}
            onChangeText={(text) => this.setDataForSignIn(text, 'password')}
          />
          <TouchableOpacity onPress={() => this.singIn()} style={styles.button}>
            <Text> Sing in</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => Actions.register()} style={{ flex: 0.09 }}>
          <Text> Did you register?  </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
