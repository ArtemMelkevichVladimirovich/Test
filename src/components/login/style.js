import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B0E0E6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    field: {
        width: 150,
        height: 40,
        backgroundColor: '#AFEEEE',
        marginBottom: 10,
        fontStyle: 'italic',
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#4169E1',
        padding: 15,
        borderRadius: 1000,
        marginBottom: 150,
    },
    form: {
        marginTop: 200,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;