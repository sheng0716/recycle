import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../constants";


const BestSellingCard = ({ item, handlePress }) => {

    console.log('In Best Selling Card: ', item)
    const itemImage = item.imagePath;

    return (
        <TouchableOpacity>

            <View style={styles.container}>
                <Image
                    source={{ uri: itemImage }}
                    style={styles.image}

                />
                <View style={styles.infoContainer}>

                    <Text style={{ fontSize: 17, }}>{item.name}</Text>
                    <Text style={{ fontSize: 15, }}>RM {item.price}</Text>
                    <Text style={{ fontSize: 13, padding: 3, color: COLORS.primary }}>{item.quantity} pcs</Text>
                </View>

            </View>
        </TouchableOpacity>

    )
}

export default BestSellingCard

const styles = StyleSheet.create({
    image: {
        width: 160,
        height: 100,
        borderRadius: 10,
        resizeMode: 'contain',
    },
    container: {
        padding: 10,
        backgroundColor: COLORS.white,
        borderRadius: 10,
    },
    infoContainer: {
        padding: 3,
        display: 'Flex',
        gap: 3,
    }
})