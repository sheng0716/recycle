import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { Product } from '../../components';
import { COLORS, SIZES } from '../../constants';


const recycle = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, marginRight: SIZES.small, marginLeft: SIZES.small }}>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>

                    <View>
                        {/* <Text>This is recycle</Text> */}
                        <Product />

                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
export default recycle;