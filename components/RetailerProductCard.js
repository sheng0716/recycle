import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { checkImageURL } from "../utils";
import { COLORS, SIZES } from "../constants";

const RetailerProductCard = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri: checkImageURL(item.imagePath)
                            ? item.imagePath
                            : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
                    }}
                    style={styles.coverImage}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>Rm {item.price}</Text>
            <Text style={styles.quantity}>{item.quantity} Pcs</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,//show the outline of the border
    },
    imageContainer: {
        flex: 1,
        width: 90,
        marginLeft: SIZES.small / 3,
        marginRight: SIZES.small / 2,
        borderRadius: SIZES.small,
        overflow: 'hidden',
    },
    coverImage: {
        height: 100,
        width: '90%',
        borderRadius: 20,
        marginVertical: 10,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        fontSize: 18,
        color: "#444444",
        fontWeight: "600",
        marginLeft: 5,
    },
    price: {
        fontSize: 18,
        color: "#9c9c9c",
        fontWeight: "600",
        marginLeft: 5,
    },
    quantity: {
        fontSize: 18,
        color: "#9c9c9c",
        fontWeight: "600",
        marginLeft: 5,
    },

})

export default RetailerProductCard