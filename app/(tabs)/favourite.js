import {
    View,
    TouchableOpacity,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    FlatList
} from 'react-native';
import { COLORS, SIZES, FONT } from '../../constants';
import React, { useState } from 'react';

const favouriteType = ['Retailer', 'Recycle'];
const Favourite = () => {

    const [activeFavouriteType, setActiveFavouriteType] = useState(favouriteType[0]);

    const displayTabContent = () => {
        switch (activeFavouriteType) {
            case 'Retailer':
                return (
                    <View>
                        <Text>This will show retailer favourite</Text>
                    </View>
                );
            case 'Recycle':
                return (
                    <View>
                        <Text>This will show recycle favourite</Text>
                    </View>
                );
            default:
                return null;
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, marginRight: SIZES.small, marginLeft: SIZES.small }}>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View>
                        <Text>favourite</Text>
                    </View>
                    <View style={styles.tabsContainer}>
                        <FlatList
                            data={favouriteType}
                            renderItem={({ item }) => (

                                <TouchableOpacity
                                    style={styles.tab(activeFavouriteType, item)}
                                    onPress={() => {
                                        setActiveFavouriteType(item);
                                        // router.push(`/search/${item}`);
                                    }}
                                >
                                    <Text style={styles.tabText(activeFavouriteType, item)}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item}
                            contentContainerStyle={{ columnGap: SIZES.small }}
                            horizontal
                        />
                    </View>
                    <View>
                        {displayTabContent()}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
export default Favourite;

const styles = StyleSheet.create({
    tabsContainer: {
        width: "100%",
        marginTop: SIZES.medium,
    },
    tab: (activeFavouriteType, item) => ({
        paddingVertical: SIZES.small / 2,
        paddingHorizontal: SIZES.small,
        borderRadius: SIZES.medium,
        borderWidth: 1,
        borderColor: activeFavouriteType === item ? COLORS.secondary : COLORS.gray2,
    }),
    tabText: (activeFavouriteType, item) => ({
        fontFamily: FONT.medium,
        color: activeFavouriteType === item ? COLORS.secondary : COLORS.gray2,
    }),

})