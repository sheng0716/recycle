import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import styles from "./productcard.style";
import { useRouter } from "expo-router";

//task for this page is complete the material image
const images = {
    // 'paper.jpg': require('../../../assets/images/paper.jpg'),
    'paper.png': require('../../../assets/images/paper.png'),
    // 'glass.jpg': require('../../../assets/images/glass.jpg'),
}

const imagesDirctory = '../../../assets/images/';
const ProductCard = ({ item, }) => {
    const router = useRouter();
    const imageSource = images[item.image];
    // const imageSource = require('../../../assets/images/' + item.image);
    // const handlePress = () => {
    //     // router.push(`/search/${item}`, { materialId: item.materialId });
    // };

    const handleCardPress = () => {
        router.push(`/search/${item.id}`);
    }
    return (


        <TouchableOpacity
            style={styles.item}
        >

            <View style={{ flex: 1, alignItems: "center" }}>
                <TouchableOpacity style={styles.logoContainer} onPress={handleCardPress}>
                    <Image
                        style={styles.logoImage}
                        source={imageSource} />
                </TouchableOpacity>

                <Text>{item.id}.{item.name}</Text>
            </View>

            <Image
            // source={{ uri: 'assets/images/' + item.image }}
            // source={{ uri: 'https://duet-cdn.vox-cdn.com/thumbor/0x0:2012x1341/640x427/filters:focal(1006x670:1007x671):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/15483559/google2.0.0.1441125613.jpg' }}
            // style={styles.image} 

            />
        </TouchableOpacity >

    )
}
export default ProductCard;