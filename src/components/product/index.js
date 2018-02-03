import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import {
    Text,
    View,
    Image,
    Slider,
    Button,
    TextInput,
    ScrollView,
    AsyncStorage,
    ToastAndroid,
    TouchableOpacity,
} from 'react-native';

import styles from './styles';
import Comments from '../comments/index';
import ApiService from '../../services/api.service';
import AuthService from '../../services/auth.service';
import { setListComments } from "../../actions/comments";
import Config from '../../config';

class Product extends Component {

    constructor() {
        super();
        this.state = {
            issetToken: !!AuthService.getToken(),
            text: '',
            rate: 0
        }
        this.setToken();
    }

    sendReview() {
        let data = {
            rate: `${this.state.rate}`,
            text: `${this.state.text}`,
        }

        console.log('SEND REVIEW!!!!!!!!')

        ApiService.post(`/reviews/${this.props.one.id}`, data)
            .then((response) => response.json())
            .then((data) => {
                ApiService.get(`/reviews/${this.props.one.id}`)
                    .then((response) => response.json())
                    .then((data) => this.props.setListComments(data));
            });
    }


    setRate(value) {
        this.setState({
            rate: value,
        })
    }

    setText(value) {
        this.setState({
            text: value,
        })
    }

    setToken() {
        AsyncStorage.getItem('Token', (err, result) => {
            this.setState({
                token: `${result}`
            })
        });
    }

    componentDidMount() {
        ApiService.get(`/reviews/${this.props.one.id}`)
            .then((res) => res.json())
            .then((data) => this.props.setListComments(data));
    }

    render() {
        let reviewInput =
            <View style={styles.form}>
                <View style={styles.rate}>
                    <Text style={styles.textRate}> Rate: {this.state.rate} </Text>
                    <Slider
                        onValueChange={(value) => this.setRate(value)}
                        style={styles.slider}
                        maximumValue={5}
                        minimumValue={0}
                        step={1} />
                </View>
                <View style={styles.formFeedback}>
                    <Text style={styles.titleFeedback}> Give Feedback:</Text>
                    <Button
                        style={styles.button}
                        title='Send'
                        onPress={() => this.sendReview()} />
                </View>
                <TextInput
                    onChangeText={(text) => this.setText(text)}
                    style={styles.inputReview}
                    placeholder='Text...' />
            </View>;

        return (
            <ScrollView>
                <ScrollView contentContainerStyle={styles.logoProduct}>
                    <Text style={styles.text}> {this.props.one.title} </Text>
                    <Image
                        source={{ uri: `${Config.STATIC_URL}/${this.props.one.img}` }}
                        style={styles.img} />
                    <Text style={styles.logoDecr}>Product Decription</Text>
                    <Text style={styles.logoText}>{this.props.one.text}</Text>
                </ScrollView>


                {this.state.issetToken ? reviewInput : undefined}

                <Comments />
            </ScrollView>
        );
    }
}

export default connect(
    state => {
        return { one: state.one, comments: state.comments }
    },
    dispatch => bindActionCreators({ setListComments }, dispatch)
)(Product);