/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
    Scene,
    Router,
    Actions
} from 'react-native-router-flux';
import {
    View,
    AsyncStorage
} from 'react-native';

import store from './src/store';
import Login from './src/components/login/index';
import Product from './src/components/product/index';
import Comments from './src/components/comments/index';
import Register from './src/components/register/index';
import Application from './src/components/list/index';
import AuthService from './src/services/auth.service';



export default class App extends Component {


    componentWillMount() {
        AuthService.setOnStart(function (token) {
            if (token) {
                Actions.list();
                return;
            }
            Actions.login();
        });

        AuthService.init();
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Scene key='root'>
                        <Scene
                            key='login'
                            component={Login}
                            hideNavBar />
                        <Scene
                            key='register'
                            hideNavBar
                            component={Register} />
                        <Scene
                            hideNavBar
                            key='list'
                            component={Application} />
                        <Scene
                            key='product'
                            component={Product} />
                        <Scene
                            key='comments'
                            component={Comments} />
                    </Scene>
                </Router>
            </Provider>
        );
    }
};
