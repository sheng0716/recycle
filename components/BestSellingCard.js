import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../constants";
import { useRouter } from "expo-router";


const BestSellingCard = ({ item }) => {

    const router = useRouter();

    const handleCardPress = () => {
        router.push(
            {
                pathname: `/company-details/retailerDetail/${item.retailerId}`,
                // params: {},
            }
        )
    }

    console.log('In Best Selling Card: ', item)
    const itemImage = item.imagePath;

    return (

        <View style={styles.container}>
            <TouchableOpacity onPress={handleCardPress}>
                <Image
                    source={{ uri: itemImage }}
                    style={styles.image}

                />

            </TouchableOpacity>
            <View style={styles.infoContainer}>

                {/* <Text style={{ fontSize: 17, }}>THIS IS RETAILER ID {item.retailerId}</Text> */}
                <Text style={{ fontSize: 17, }}>{item.name}</Text>
                <Text style={{ fontSize: 15, }}>RM {item.price}</Text>
                <Text style={{ fontSize: 13, padding: 3, color: COLORS.primary }}>{item.quantity} pcs</Text>
            </View>

        </View>


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