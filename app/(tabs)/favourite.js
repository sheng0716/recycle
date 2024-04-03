import {
    View,
    TouchableOpacity,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    FlatList,
    RefreshControl
} from 'react-native';
import { COLORS, SIZES, FONT } from '../../constants';
import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../AuthProvider';
import companiesDbService from '../../assets/DbService/companiesDbService';

const favouriteType = ['Retailer', 'Recycle'];
const Favourite = () => {
    const { userId } = useAuth();

    const [activeFavouriteType, setActiveFavouriteType] = useState(favouriteType[0]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const [favouriteRetailer, setFavouriteRetailer] = useState([]);
    const [favouriteCenter, setFavouriteCenter] = useState([]);

    const fetchFavouriteRetailerData = async () => {
        setIsLoading(true);
        try {
            const favouriteRetailerData = await companiesDbService.getFavouriteRetailerByUserId(1);
            setFavouriteRetailer(favouriteRetailerData.favourite_retailer);
            console.log('Favourite Retailer: ', favouriteRetailer);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchFavouriteRetailerData();
    }, [])

    // const refetch = () => {
    //     setIsLoading(true);
    // }

    // const onRefresh = useCallback(() => {
    //     setRefreshing(true);
    //     refetch()
    //     setRefreshing(false)
    // }, []);



    const displayTabContent = () => {
        switch (activeFavouriteType) {
            case 'Retailer':
                return (
                    <View>
                        <Text>This will show retailer favourite</Text>
                        <View>
                            <FlatList
                                scrollEnabled={false}
                                data={favouriteRetailer}
                                renderItem={({ item }) => (
                                    <View>
                                        <Text>RetailerId: {item.retailerId}</Text>
                                    </View>
                                    //since get the favourite retailer id, pass the retailer id to the favourite card, inside the favourite card use fetch
                                    //the retailer information on the card by the retailer id

                                )
                                }
                            />
                        </View>
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

            <ScrollView showsVerticalScrollIndicator={false}
            // refreshControl=
            // {
            //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
            >
                <View>
                    <View>
                        <Text>favourite</Text>
                        <Text>UserId: {userId}</Text>
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