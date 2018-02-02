import React from 'react';
import {
    Text,
    ScrollView,
} from 'react-native';

import styles from './style';


const CommentsPresentational = (data) => (
    <ScrollView>
        {
            data.data.map((item, index) => {
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
)

export default CommentsPresentational;