import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import { Product, BestSelling } from '../../components';
import { COLORS, SIZES } from '../../constants';


const retailer = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, marginRight: SIZES.small, marginLeft: SIZES.small }}>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>

                    <View>
                        <Text>This is retailer</Text>
                        <BestSelling />
                        {/* Shop */}

                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
export default retailer;