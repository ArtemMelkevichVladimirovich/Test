import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Text, TouchableOpacity, Image, View, ScrollView, Button, AsyncStorage} from 'react-native';
import {setListProduct} from '../../actions/list';
import {setDetail} from '../../actions/one';
import {Actions} from 'react-native-router-flux';


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
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                {
                    obj.map((item, index) => {
                        return (
                            <View style={{
                                margin: 10,
                                alignItems: 'center',
                                backgroundColor: 'green',
                                width: 130,
                                height: 145
                            }}
                                key={index}
                            >
                                <TouchableOpacity onPress={() => this.showDetailProduct(item)}>
                                    <Image
                                        source={{uri: `http://smktesting.herokuapp.com/static/${item.img}`}}
                                        style={{width: 100, height: 100, margin: 10, padding:50}}
                                    />
                                    <Text>{item.title}</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })
                }
                <Button title = 'EXIT' onPress={() => {
                    AsyncStorage.removeItem('Token');
                    Actions.pop();
                }}/>
            </ScrollView>
        );
    }
}

export default connect(
    state => {
        return {list: state.list};
    },
    dispatch => bindActionCreators({setListProduct, setDetail}, dispatch),
)(Application);
