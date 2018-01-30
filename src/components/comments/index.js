import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,

} from 'react-native';
import {connect} from 'react-redux';

class Comments extends Component {

    render() {
        let obj = this.props.comments;
        return (
            <ScrollView contentContainerStyle={{ backgroundColor: 'red'}}>
                {
                    obj.map((item, index) => {
                        return (
                            <View
                                style={{
                                    height:100,
                                    marginBottom: 10,
                                    padding: 20,
                                    backgroundColor: '#F5F5DC',
                                }}
                                key={item.id}
                            >
                                <Text> User: {item.created_by.username} </Text>
                                <Text> Date: {item.created_at} </Text>
                                <Text> Rote: {item.rate} </Text>
                                <Text> Comment:{item.text} </Text>
                            </View>
                        );
                    })
                }
            </ScrollView>
        );
    }
}

export default connect(
    (state) => {
        return {comments: state.comments}
    },
)(Comments);