import {
    View,
    TouchableOpacity,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    FlatList,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import { COLORS, SIZES, FONT } from '../../constants';
import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../AuthProvider';
import companiesDbService from '../../assets/DbService/companiesDbService';
import { FavouriteCenterCard, FavouriteRetailerCard } from '../../components';

const favouriteType = ['Retailer', 'Recycle'];
const Favourite = () => {
    const { userId } = useAuth();

    const [activeFavouriteType, setActiveFavouriteType] = useState(favouriteType[0]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const [favouriteRetailer, setFavouriteRetailer] = useState([]);
    //item can retrieve
    // 'userId': row[0],
    // 'retailerId': row[1],
    // 'retailerName':row[3],
    // 'address':row[4],
    // 'state':row[5],
    // 'logoPath':row[12],
    const [favouriteCenter, setFavouriteCenter] = useState([]);

    const fetchFavouriteRetailerData = async () => {
        setIsLoading(true);
        try {
            //inside parameter should change to userId
            const favouriteRetailerData = await companiesDbService.getFavouriteRetailerByUserId(userId);
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
    const fetchFavouriteCenterData = async () => {
        setIsLoading(true);
        try {
            //inside parameter should change to userId
            const favouriteCenterData = await companiesDbService.getFavouriteCenterByUserId(userId);
            setFavouriteCenter(favouriteCenterData.favourite_center);
            console.log('Favourite Center: ', favouriteCenter);
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
        fetchFavouriteCenterData();
    }, [])

    const refetch = () => {
        setIsLoading(true);
        fetchFavouriteRetailerData();
        fetchFavouriteCenterData();
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch()
        setRefreshing(false)
    }, []);



    const displayTabContent = () => {
        switch (activeFavouriteType) {
            case 'Retailer':
                return (
                    <View>
                        {/* <Text>This will show retailer favourite</Text> */}
                        <View>
                            <FlatList
                                scrollEnabled={false}
                                data={favouriteRetailer}
                                renderItem={({ item }) => (
                                    <FavouriteRetailerCard
                                        logoPath={item.logoPath}
                                        name={item.retailerName}
                                        address={item.address}
                                        state={item.state}
                                        retailerId={item.retailerId}
                                    />
                                )
                                }
                            />
                        </View>
                    </View>
                );
            case 'Recycle':
                return (
                    <View>
                        {/* <Text>This will show recycle favourite</Text> */}
                        <FlatList
                            scrollEnabled={false}
                            data={favouriteCenter}
                            renderItem={({ item }) => (
                                <FavouriteCenterCard
                                    logoPath={item.logoPath}
                                    name={item.centerName}
                                    address={item.address}
                                    state={item.state}
                                    centerId={item.centerId}
                                />
                            )} />
                    </View>
                    // here should use another card because it will push to another detail page
                    //with different handle card press
                );
            default:
                return null;
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, marginRight: SIZES.small, marginLeft: SIZES.small }}>
            <View>
                {/* <Text>favourite</Text>
                <Text>UserId: {userId}</Text> */}
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
            </View>

            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl=
                {
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {
                    isLoading ? (
                        <ActivityIndicator size='large' color={COLORS.primary} />
                    ) : error ? (
                        <Text>Something Went Wrong</Text>
                    ) : favouriteRetailer.length === 0 ? (
                        <Text>No data available</Text>
                    ) : (

                        <View>
                            <View>
                                {displayTabContent()}
                            </View>
                        </View>
                    )
                }

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