import { Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from 'react';
import { useRouter } from "expo-router";
import BestSellingCard from "./BestSellingCard";

const BestSelling = () => {

    const bestSellItem = [
        {
            "category": null,
            "imagePath": "https://firebasestorage.googleapis.com/v0/b/recycle-416816.appspot.com/o/paperBowl.jpg?alt=media&token=e2515d7e-a71a-405d-881b-b7f769ab01cf",
            "name": "Paper Bowl",
            "price": 390,
            "productId": 1,
            "quantity": 500,
            "retailerId": 1
        },
        {
            "category": null,
            "imagePath": "https://firebasestorage.googleapis.com/v0/b/recycle-416816.appspot.com/o/paperLunchBox.jpg?alt=media&token=5090307d-d4be-45fb-adee-27bac655d416",
            "name": "Paper Lunch Box",
            "price": 145,
            "productId": 2,
            "quantity": 500,
            "retailerId": 1
        },
        {
            "category": null,
            "imagePath": "https://firebasestorage.googleapis.com/v0/b/recycle-416816.appspot.com/o/bioPlate.jpg?alt=media&token=2f0d6274-0e88-4b26-9637-9dc0caacb899",
            "name": "Bio Plate",
            "price": 275,
            "productId": 3,
            "quantity": 800,
            "retailerId": 1
        },
    ]

    console.log('In BestSelling Component')
    console.log('Best Selling Item: ', bestSellItem)
    const router = useRouter();




    return (
        <View>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 20,
                marginBottom: 10,
            }}>
                Best Selling</Text>
            <FlatList
                data={bestSellItem}
                horizontal={true}

                renderItem={({ item }) => (
                    <BestSellingCard
                        item={item}
                    />

                )}
            />
        </View>

    )
}
export default BestSelling;