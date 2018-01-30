/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {Provider} from 'react-redux';

import store from './src/store';
import Application from './src/components/list/index';
import Product from './src/components/product/index';
import Comments from './src/components/comments/index';


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
    payload: [{id: 1, user: 'artem'}, {id: 2, user: 'vika'}],
});


export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Scene key="root">
                        <Scene
                            key="scarlet"
                            component={Application}
                            title="List"
                            initial
                        />
                        <Scene
                            key="gray"
                            component={Product}
                            title="Product"
                        />
                        <Scene
                            key="comments"
                            component={Comments}
                            title="Reviews"
                        />
                    </Scene>
                </Router>
            </Provider>
        );
    }
}

