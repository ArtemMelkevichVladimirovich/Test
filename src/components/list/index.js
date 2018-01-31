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
} from 'react-native';

import styles from './style';
import { setDetail } from '../../actions/one';
import { setListProduct } from '../../actions/list';
import style from './style';



class Application extends Component {

    showDetailProduct(data) {
        this.props.setDetail(data);
        Actions.product();
    }

    componentWillMount() {
        fetch('http://smktesting.herokuapp.com/api/products/')
            .then((respons) => respons.json())
            .then((data) => this.props.setListProduct(data));
    }

    render() {
        let obj = this.props.list;
        return (
            <ScrollView contentContainerStyle={styles.container}>
                {
                    obj.map((item, index) => {
                        return (
                            <View
                                style={styles.icon}
                                key={index}
                            >
                                <TouchableOpacity onPress={() => this.showDetailProduct(item)}>
                                    <Image
                                        source={{ uri: `http://smktesting.herokuapp.com/static/${item.img}` }}
                                        style={styles.img}
                                    />
                                    <Text>{item.title}</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })
                }
                <Button title='EXIT' onPress={() => {
                    AsyncStorage.removeItem('Token');
                    Actions.pop();
                }} />
            </ScrollView>
        );
    }
}

export default connect(
    state => {
        return { list: state.list };
    },
    dispatch => bindActionCreators({ setListProduct, setDetail }, dispatch),
)(Application);
