import { View, FlatList, Text } from 'react-native'
import { useState, useEffect } from 'react'
import { SIZES } from '../../../constants';
import ProductCard from './ProductCard'
import { useRouter } from 'expo-router'
import materialDbService from '../../../assets/DbService/productDbService'
import axios from 'axios';


const Product = () => {
    const router = useRouter();
    const [materials, setMaterials] = useState([]);

    // see what data is fetch
    const fetchMaterials = async () => {
        try {
            const materialData = await materialDbService.getAllMaterials();
            setMaterials(materialData);
            console.log(materials);
        } catch (error) {
            console.error('error fetching data from database', error);
        }
    };
    useEffect(() => {
        fetchMaterials();
    }, []);

    return (
        <View>
            <View style={{ marginTop: SIZES.small }}>
                <FlatList
                    // scrollEnabled={false}
                    data={materials}
                    renderItem={({ item }) =>
                        <ProductCard
                            item={item}
                        />
                    }
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ rowGap: SIZES.medium }}
                />
            </View>
        </View>
    )
}

export default Product;