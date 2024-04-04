import { useRouter } from "expo-router";
import React from "react";
import {
    View,
    Text, Image, StyleSheet,
    TouchableOpacity,
} from 'react-native';
//this component is used to show the card in favourite page
const FavouriteCard = ({ name, address, state, logoPath, retailerId }) => {
    const router = useRouter();
    const handleCardPress = () => {
        router.push(
            {
                pathname: `/company-details/retailerDetail/${retailerId}`
            }
        )
    }

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={handleCardPress}>
            <Image source={{ uri: logoPath }} style={styles.image} resizeMode="contain" />
            <View style={styles.textContainer}>
                <Text style={styles.shopName}>{name}</Text>
                <Text style={styles.shopType}>{address}</Text>
                <Text style={styles.location}>{state}</Text>
            </View>
            {/* Add touchable heart icon or any other interactive element here */}
        </TouchableOpacity>
    )
}

export default FavouriteCard;

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,

    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    shopName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    shopType: {
        color: 'gray',
    },
    location: {
        color: 'gray',
    },
    ratingContainer: {
        flexDirection: 'row',
    },
    filledStar: {
        color: '#FFD700',
    },
    unfilledStar: {
        color: '#CCCCCC',
    },
});