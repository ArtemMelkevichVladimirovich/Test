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
import Config from '../../config';
import { setDetail } from '../../actions/one';
import ApiService from '../../services/api.service';
import { setListProduct } from '../../actions/list';
import AuthService from '../../services/auth.service';

class Application extends Component {

    showDetailProduct(data) {
        this.props.setDetail(data);
        Actions.product();
    }

    exitAccount() {
        Actions.pop();
        AuthService.deleteToken();
    }

    componentWillMount() {
        ApiService.get('/products/')
            .then((respons) => respons.json())
            .then((data) => this.props.setListProduct(data));
    }

    render() {

        let navigationView = (
            <TouchableOpacity
                onPress={() => this.exitAccount()}
                style={styles.item}>
                <Text style={styles.text}>
                    {   
                        AuthService.getToken()? 'SIGN OUT' : 'BACK'
                    }
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
                                            source={{ uri: `${Config.STATIC_URL}/${item.img}` }}
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
