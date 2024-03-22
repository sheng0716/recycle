import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import styles from "./productcard.style";
import { useRouter } from "expo-router";

const images = {
    'paper.jpg': require('../../../assets/images/paper.jpg'),
    // 'glass.jpg': require('../../../assets/images/glass.jpg'),
}

const ProductCard = ({ item }) => {
    const imageSource = images[item.imagePath];
    // const handlePress = () => {
    //     // router.push(`/search/${item}`, { materialId: item.materialId });
    // };
    return (
        <TouchableOpacity >
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={imageSource}
                        style={styles.image}
                    />
                </View>
                <View style={styles.detail}>
                    <Text style={styles.title}>{item.materialId} {item.name}</Text>

                </View>
            </View>
        </TouchableOpacity>
    )
}
export default ProductCard;