import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Stack, useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router'
import { Text, SafeAreaView } from 'react-native'
import axios from 'axios'

import { ScreenHeaderBtn, NearbyJobCard } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import styles from '../../styles/search'
import companiesDbService from '../../assets/DbService/companiesDbService'
import PopularJobCard from '../../components/common/cards/PopularJobCard'
import CardInfo from '../../components/common/cards/CardInfo'

const SearchResultScreen = () => {
    const params = useLocalSearchParams();
    // const materialName = params.materialName;
    const router = useRouter()

    const [searchResult, setSearchResult] = useState([]);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [page, setPage] = useState(1);

    const [center, setCenter] = useState([]);//empty erray to store all center information, later will be used to filter out by material id
    const [item, setItem] = useState([]); // item list to store the compant details which have finish filter by material id

    // const handleSearch = async () => {
    //     setSearchLoader(true);
    //     setSearchResult([])

    //     try {
    //         const options = {
    //             method: "GET",
    //             url: `https://jsearch.p.rapidapi.com/search`,
    //             headers: {
    //                 "X-RapidAPI-Key": 'cb36ed8f1dmsh898d8c5ae1f13e8p19ec38jsn858f2fc09078',
    //                 "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    //             },
    //             params: {
    //                 query: params.id,
    //                 page: page.toString(),
    //             },
    //         };

    //         const response = await axios.request(options);
    //         setSearchResult(response.data.data);
    //     } catch (error) {
    //         setSearchError(error);
    //         console.log(error);
    //     } finally {
    //         setSearchLoader(false);
    //     }
    // };

    const materialId = params.id;
    const fetchData = async (page, limit = 5) => {
        setSearchLoader(true);
        setCenter([])
        try {
            const response = await companiesDbService.getCenterDataByMaterialId(materialId, page, limit);
            setCenter(response.centers);
            console.log('Fetching data for page:', page);
            console.log('Fetched Center:', response.centers);
        } catch (error) {
            setSearchError(error);
            console.error('Error fetching data from database', error);
        } finally {
            setSearchLoader(false);
        }
    };
    useEffect(() => {
        fetchData(page);
    }, [page]);
    // useFocusEffect(
    //     useCallback(() => {
    //         async function fetchCenterWithMaterialId() {
    //             try {
    //                 // use materialId to search center

    //             } catch (error) {

    //             }
    //         }
    //     })
    // )

    const handlePagination = (direction) => {
        setPage(prevPage => {
            const newPage = direction === 'left' ? Math.max(prevPage - 1, 1) : prevPage + 1;
            return newPage;
        });
        // if (direction === 'left' && page > 1) {
        //     setPage(page - 1)
        //     // handleSearch()
        //     fetchData()
        // } else if (direction === 'right') {
        //     setPage(page + 1)
        //     // handleSearch()
        //     fetchData()
        // }
    }

    // useEffect(() => {
    //     handleSearch()
    // }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerTitle: "Search Result",
                    headerTitleAlign: 'center'
                }}
            />
            <Text>this is the material id: {params.id}</Text>
            <Text>this is the material id: {materialId}</Text>
            <Text>{params.materialName}</Text>
            <FlatList
                data={center}
                keyExtractor={(item) => item.centerId}
                contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.searchTitle}>{params.materialName}</Text>
                        </View>
                        <View style={styles.loaderContainer}>
                            {searchLoader ? (
                                <ActivityIndicator size='large' color={COLORS.primary} />
                            ) : searchError && (
                                <Text>Something went Wrong</Text>
                            )}

                        </View>
                    </>
                )}
                ListFooterComponent={() => (
                    <View style={styles.footerContainer}>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => setPage(1)} // Set the page back to 1
                        >
                            <Image
                                source={icons.chevronDoubleLeft}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('left')}
                        >
                            <Image
                                source={icons.chevronLeft}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>

                        <View style={styles.paginationTextBox}>
                            <Text style={styles.paginationText}>{page}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('right')}
                        >
                            <Image
                                source={icons.chevronRight}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                )}
                renderItem={({ item }) => (
                    <CardInfo
                        company={item}
                        handleNavigate={() => router.push(`/company-details/${item.centerId}`)}
                    />
                )
                }
            />

            {/* <FlatList
                data={searchResult}
                renderItem={({ item }) => (
                    <NearbyJobCard
                        job={item}
                        handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
                    />
                )}
                keyExtractor={(item) => item.job_id}
                contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.searchTitle}>{params.id}</Text>
                            <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
                        </View>
                        <View style={styles.loaderContainer}>
                            {searchLoader ? (
                                <ActivityIndicator size='large' color={COLORS.primary} />
                            ) : searchError && (
                                <Text>Oops something went wrong</Text>
                            )}
                        </View>
                    </>
                )}
                ListFooterComponent={() => (
                    <View style={styles.footerContainer}>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('left')}
                        >
                            <Image
                                source={icons.chevronLeft}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <View style={styles.paginationTextBox}>
                            <Text style={styles.paginationText}>{page}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('right')}
                        >
                            <Image
                                source={icons.chevronRight}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                )}
            /> */}
        </SafeAreaView>
    )
}

export default SearchResultScreen