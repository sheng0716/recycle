import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import styles from "./productcard.style";
import { useRouter } from "expo-router";

const images = {
    'paper.jpg': require('../../../assets/images/paper.jpg'),
    // 'glass.jpg': require('../../../assets/images/glass.jpg'),
}

const imagesDirctory = '../../../assets/images/';
const ProductCard = ({ item }) => {
    const imageSource = images[item.imagePath];
    // const imageSource = require('../../../assets/images/' + item.image);
    // const handlePress = () => {
    //     // router.push(`/search/${item}`, { materialId: item.materialId });
    // };
    return (
        <TouchableOpacity style={styles.item}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>

                    {/* <Image
                        // source={{ uri: 'assets/images/' + item.image }}
                        // source={item.icon} 
                        source={{ uri: 'https://duet-cdn.vox-cdn.com/thumbor/0x0:2012x1341/640x427/filters:focal(1006x670:1007x671):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/15483559/google2.0.0.1441125613.jpg' }}
                        style={styles.image} /> */}
                </View>

                <Text>{item.id}.{item.name}{item.image}</Text>

            </View>
        </TouchableOpacity >
    )
}
export default ProductCard;