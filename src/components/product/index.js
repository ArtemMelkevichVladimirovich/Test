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
import { setListComments } from "../../actions/comments";


class Product extends Component {

    constructor() {
        super();
        this.state = {
            token: '',
            text: '',
            rate: 0
        }
        this.setToken();
    }

    setReviewsServer() {
        fetch(`http://smktesting.herokuapp.com//api/reviews/${this.props.one.id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${this.state.token}`,
            },
            body: JSON.stringify({
                rate: `${this.state.rate}`,
                text: `${this.state.text}`,
            }),
        });
    }

    sendReview() {
        if (this.state.token.length > 4) {
            this.setReviewsServer();
            ToastAndroid.show('Published', ToastAndroid.SHORT);
        } else {
            ToastAndroid.show('You should sign in first', ToastAndroid.SHORT);
        }
        fetch(`http://smktesting.herokuapp.com/api/reviews/${this.props.one.id}`)
            .then((res) => res.json())
            .then((data) => this.props.setListComments(data));
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
        fetch(`http://smktesting.herokuapp.com/api/reviews/${this.props.one.id}`)
            .then((res) => res.json())
            .then((data) => this.props.setListComments(data));
    }

    render() {
        return (
            <ScrollView>
                <ScrollView contentContainerStyle={styles.logoProduct}>
                    <Text style={styles.text}> {this.props.one.title} </Text>
                    <Image
                        source={{ uri: `http://smktesting.herokuapp.com/static/${this.props.one.img}` }}
                        style={styles.img} />
                    <Text style={styles.logoDecr}>Product Decription</Text>
                    <Text style={styles.logoText}>{this.props.one.text}</Text>
                </ScrollView>


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
                </View>

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