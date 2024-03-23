import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import { Product } from '../../components';
import { COLORS } from '../../constants';


const retailer = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>

                    <View>
                        <Text>This is home</Text>
                        <Product />
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
export default retailer;