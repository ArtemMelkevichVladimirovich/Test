import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import {
    Text,
    View,
    Image,
    Button,
    ScrollView,
    AsyncStorage,
    TouchableOpacity,
    DrawerLayoutAndroid,
} from 'react-native';

import styles from './style';
import { setDetail } from '../../actions/one';
import { setListProduct } from '../../actions/list';


class Application extends Component {

    constructor() {
        super();
        this.state = {
            token: '',
        }
        AsyncStorage.getItem('Token', (err, result) => {
            this.setState({ token: `${result}` })
        });

    }

    showDetailProduct(data) {
        this.props.setDetail(data);
        Actions.product();
    }

    exitAccount() {
        Actions.pop();
        AsyncStorage.removeItem('Token');
    }

    componentWillMount() {
        fetch('http://smktesting.herokuapp.com/api/products/')
            .then((respons) => respons.json())
            .then((data) => this.props.setListProduct(data));
    }

    render() {

        let navigationView = (
            <TouchableOpacity
                onPress={() => this.exitAccount()}
                style={styles.item}>
                <Text style={styles.text}>
                    {this.state.token.length > 4 ? 'SIGN OUT' : 'BACK'}
                </Text>
            </TouchableOpacity>
        );

        return (
            <DrawerLayoutAndroid
                drawerWidth={120}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>
                <ScrollView contentContainerStyle={styles.container}>
                    {
                        this.props.list.map((item, index) => {
                            return (
                                <View key={index}>
                                    <TouchableOpacity
                                        style={styles.icon}
                                        onPress={() => this.showDetailProduct(item)}>
                                        <Image
                                            source={{ uri: `http://smktesting.herokuapp.com/static/${item.img}` }}
                                            style={styles.img} />
                                        <Text>{item.title}</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })
                    }
                </ScrollView>
            </DrawerLayoutAndroid>
        );
    }
}

export default connect(
    state => {
        return { list: state.list };
    },
    dispatch => bindActionCreators({ setListProduct, setDetail }, dispatch),
)(Application);
