import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import styles from "./productcard.style";
import { useRouter } from "expo-router";

//task for this page is complete the material image
const images = {
    'paper.png': require('../../../assets/images/paper.png'),
    'glass.png': require('../../../assets/images/glass.png'),
    'glass.png': require('../../../assets/images/glass.png'),
    'metal.png': require('../../../assets/images/metal.png'),
    'plastic.png': require('../../../assets/images/plastic.png'),
}

const imagesDirctory = '../../../assets/images/';
const ProductCard = ({ item }) => {
    const router = useRouter();
    const imageSource = images[item.image];
    // const imageSource = require('../../../assets/images/' + item.image);
    // const handlePress = () => {
    //     // router.push(`/search/${item}`, { materialId: item.materialId });
    // };

    //store the imageUrl inside the variable
    const imageUrl = item.imageUrl;

    const handleCardPress = () => {
        router.push(
            {
                pathname: `/search/${item.id}`,
                params: { materialName: item.name },
            }
        );
    }
    return (
        <TouchableOpacity
            style={styles.item}
        >

            <View style={{ flex: 1, alignItems: "center" }}>
                <TouchableOpacity style={styles.logoContainer} onPress={handleCardPress}>
                    <Image
                        style={styles.logoImage}
                        source={{ uri: imageUrl }}
                    />
                </TouchableOpacity>

                <Text>{item.id}.{item.name}</Text>
            </View>
        </TouchableOpacity>

    )
}
export default ProductCard;