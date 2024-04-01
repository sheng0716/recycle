import React from "react";
import {
    View,
    Text, Image, StyleSheet,
    TouchableOpacity,
} from 'react-native';

const FavouriteProductCard = ({ }) => {

    return (
        <View>
            <Image source={{ uri: product.imageUrl }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.retailer}>{product.retailer}</Text>
                <Text style={styles.price}>RM {product.price}</Text>
                <Text style={styles.soldCount}>{product.soldCount} sold</Text>
            </View>
            <TouchableOpacity onPress={() => onToggleFavorite(product.id)}>
                <Icon
                    name={product.isFavorite ? 'heart' : 'heart-o'}
                    size={24}
                    color={product.isFavorite ? 'red' : 'grey'}
                />
            </TouchableOpacity>
        </View>
    )
}

export default FavouriteProductCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    retailer: {
        fontSize: 14,
        color: 'grey',
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
    },
    soldCount: {
        fontSize: 12,
        color: 'grey',
    },
});