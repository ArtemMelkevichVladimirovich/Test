import React, {Component} from 'react';
import {Text, Button, ScrollView, View, Image, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setListComments} from "../../actions/comments";
import {Actions} from 'react-native-router-flux';
import styles from './styles';


class Product extends Component {

    showReviews() {
        Actions.comments();
    }

    componentDidMount() {
        fetch(`http://smktesting.herokuapp.com/api/reviews/${this.props.one.id}`)
            .then((res) => res.json())
            .then((data) => this.props.setListComments(data));
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ backgroundColor: 'red'}}>
                <View style={styles.logoProduct}>
                    <Text style={styles.text}>{this.props.one.title}</Text>
                    <Image
                        source={{uri: `http://smktesting.herokuapp.com/static/${this.props.one.img}`}}
                        style={styles.img}
                    />
                    <Text>Dicription</Text>
                    <Text>{this.props.one.text}</Text>

                    <TouchableOpacity
                        style={{backgroundColor: 'blue'}}
                        onPress={() => Actions.comments()}
                    >
                        <Text>Browsing reviews</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.form}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{flex: 1, padding: 10}}> Give Feedback:</Text>
                        <Button style={{padding: 10}} title='Send' onPress={() => console.log("Hello")}/>
                    </View>
                    <TextInput style={{marginLeft: 20, marginRight: 10}} placeholder='Text...'/>
                </View>
            </ScrollView>
        );


    }
}

export default connect(
    state => {
        return {one: state.one, comments: state.comments}
    },
    dispatch => bindActionCreators({setListComments}, dispatch)
)(Product);