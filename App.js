/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { View } from 'react-native';

import store from './src/store';
import Application from './src/components/list/index';
import Product from './src/components/product/index';
import Comments from './src/components/comments/index';
import Login from './src/components/login/index';
import Register from './src/components/register/index';


store.subscribe(() => {
    console.log('---------------------------');
    console.log('---------------------------');
    console.log('---------------------------');
    console.log(store.getState());
    console.log('---------------------------');
    console.log('---------------------------');
    console.log('---------------------------');
});

store.dispatch({
    type: "ADD_LIST",
    payload: [{ id: 1, user: 'artem' }, { id: 2, user: 'vika' }],
});


export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Scene key='root'>
                        <Scene
                            key='login'
                            component={Login}
                            
                            hideNavBar
                        />
                        <Scene
                            key='register'
                            component={Register}
                        />
                        <Scene
                            key='list'
                            initial
                            component={Application}
                            hideNavBar
                        />
                        <Scene
                            key='product'
                            
                            component={Product}
                        />
                        <Scene
                            key='comments'
                            component={Comments}
                        />
                    </Scene>
                </Router>
            </Provider>
        );
    }
};
