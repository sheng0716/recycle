import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ReviewCenterCard = ({ item }) => {
    const renderStars = (rating) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <MaterialCommunityIcons
                    key={i}
                    name={i < rating ? "star" : "star-outline"}
                    size={24}
                    color="#FFD700"
                />
            );
        }
        return stars;

    };
    return (
        <View style={styles.reviewItem}>
            <View style={styles.ratingContainer}>
                {renderStars(item.rating)}
            </View>
            <Text style={styles.comment}>{item.comment}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    reviewItem: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginVertical: 8,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 4, // Space between stars and comment
    },
    comment: {
        marginTop: 4,
    },
});
export default ReviewCenterCard;
