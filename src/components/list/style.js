import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    icon: {
        margin: 10,
        alignItems: 'center',
        backgroundColor: '#87CEFA',
        width: 130,
        height: 150,
        paddingBottom: 10,
    },
    container: {
        alignItems: 'center',
    },
    item: {
        margin: 10,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2.5,
        borderColor: '#0000FF',
        backgroundColor: '#00BFFF',
        alignItems: 'center',
        width: 100,
        height: 50,
    },
    img: {
        borderWidth: 2,
        borderColor: '#ADFF2F',
        borderRadius: 10,
        width: 100,
        height: 100,
        margin: 10,
        padding: 50,
    },
    text: {
        fontFamily: 'Comic Sans', 
        margin: 10, 
        fontSize: 15, 
    }
});

export default styles;