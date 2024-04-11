import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from "axios";

const RetailerCard = ({ companyName, logoPath, contactNo, state }) => {

    return (
        <View style={styles.card}>
            {logoPath ? (
                <Image source={{ uri: logoPath }} style={styles.logo} />
            ) : (
                <Text>No Logo Available</Text>
            )}
            <Text style={styles.companyName}>{companyName}</Text>
            <Text>Contact: {contactNo}</Text>
            <Text>Location: {state}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 8,
    },
    companyName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});
export default RetailerCard;