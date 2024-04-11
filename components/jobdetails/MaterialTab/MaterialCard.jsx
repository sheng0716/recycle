import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import styles from "./MaterialCard.style";
import { useRouter } from "expo-router";
import { checkImageURL } from "../../../utils";

//task for this page is complete the material image
const images = {
    'paper.png': require('../../../assets/images/paper.png'),
    'glass.png': require('../../../assets/images/glass.png'),
    'glass.png': require('../../../assets/images/glass.png'),
    'metal.png': require('../../../assets/images/metal.png'),
    'plastic.png': require('../../../assets/images/plastic.png'),
}

const imagesDirctory = '../../../assets/images/';
const MaterialCard = ({ item }) => {
    const router = useRouter();
    const imageSource = images[item.image];
    //store the imageUrl inside the variable
    const imageUrl = item.imageUrl;
    return (
        <TouchableOpacity
            style={styles.item}
        >

            <View style={{ flex: 1, alignItems: "center" }}>
                <TouchableOpacity style={styles.logoContainer} onPress={() => { }}>
                    <Image
                        style={styles.logoImage}
                        source={{
                            uri: checkImageURL(imageUrl)
                                ? imageUrl
                                : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",

                        }}
                    />
                </TouchableOpacity>

                <Text>{item.materialId}.{item.name}</Text>
            </View>
        </TouchableOpacity>

    )
}
export default MaterialCard;