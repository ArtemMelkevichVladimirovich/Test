import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';

import styles from './style';


class Comments extends Component {

    render() {
        let data = this.props.comments;
        data.reverse();

        return (
            <ScrollView>
                {
                    data.map((item, index) => {
                        return (
                            <ScrollView
                                contentContainerStyle={styles.comment}
                                key={item.id}>
                                <Text> User: {item.created_by.username} </Text>
                                <Text> Date: {item.created_at} </Text>
                                <Text> Rote: {item.rate} </Text>
                                <Text> Comment: {item.text} </Text>
                            </ScrollView>
                        );
                    })
                }
            </ScrollView>
        );
    }
}

export default connect(
    (state) => {
        return { comments: state.comments }
    },
)(Comments);