import { Stack, useRouter, useLocalSearchParams, useNavigation, Link } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
    FlatList
} from "react-native";

import {
    Company,
    About,
    Footer,
    Tabs,
    ScreenHeaderBtn,
    MapView,
    MaterialTab,
} from "../../../components";
import { COLORS, icons, SIZES } from "../../../constants";
// import companiesDbService from "../../assets/DbService/companiesDbService";
import useFetchByCompanyId from "../../../hook/useFetchByCompanyId";
import companiesDbService from "../../../assets/DbService/companiesDbService";
import productDbService from "../../../assets/DbService/productDbService";
import MaterialCard from "../../../components/jobdetails/MaterialTab/MaterialCard";

const tabs = ["About", "Products", "Location"];

const retailerDetail = () => {
    const params = useLocalSearchParams();

    const navigation = useNavigation();

    const router = useRouter();
    const [retailerData, setRetailerData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [productSell, setProductSell] = useState([]);//use to store what material the center accept

    // const { data, isLoading, error, refetch } = useFetch("job-details", {
    //     job_id: params.id,
    // });
    // const [{ company, setCompany }] = useState([]);

    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [refreshing, setRefreshing] = useState(false);

    // const fetchData = async () => {
    //     try {
    //         const companiesData = await companiesDbService.getAllCompanyDetailsBycompanyId(companyId);
    //     }
    //     catch {

    //     }
    // };

    const c_id = params.id;// this is the company id, later will will use to find materials from center materials pivot table
    // const { data, isLoading, error, refetch } = useFetchByCompanyId('/api/centers', c_id)

    const fetchRetailerData = async () => {
        setIsLoading(true);
        try {
            const retailerData = await companiesDbService.getRetailerDataByRetailerId(c_id);
            setRetailerData(retailerData);
            console.log('Retailer Information: ', retailerData);
            console.log('Name: ', retailerData.name)//this ouput undefined
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    // const fetchAcceptedMaterialData = async () => {
    //     setIsLoading(true);
    //     try {
    //         const acceptedMaterials = await productDbService.getAcceptedMaterialByCenterId(c_id);
    //         setAcceptMaterial(acceptedMaterials);
    //         console.log('Accepted Material: ', acceptMaterial);
    //         setIsLoading(false);
    //     } catch (error) {
    //         setError(error);
    //         console.log(error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }
    useEffect(() => {
        fetchRetailerData();
        // fetchAcceptedMaterialData();
    }, [])

    const refetch = () => {
        setIsLoading(true);
        fetchRetailerData();
        // fetchAcceptedMaterialData();
    };

    const companyName = retailerData.name;
    console.log(companyName);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch()
        setRefreshing(false)
    }, []);


    const displayTabContent = () => {
        switch (activeTab) {
            case "About":
                return (
                    <About
                        info={retailerData.description ?? "No data provided"}

                    />
                );

            case "Materials":
                return (
                    <View>
                        {/* <FlatList
                            scrollEnabled={false}
                            numColumns={2}
                            data={acceptMaterial}
                            renderItem={({ item }) =>
                                <MaterialCard
                                    item={item}
                                />
                            }
                        /> */}
                    </View>
                );


            case "Location":
                return (
                    <View>
                        <Text>{retailerData.name}</Text>
                        <Text>{retailerData.latitude}</Text>
                        <Text>{retailerData.longitude}</Text>
                        <Text>{retailerData.contactNo}</Text>

                        <View>

                            <TouchableOpacity onPress={() => {
                                router.push({
                                    pathname: '/map',
                                    params: {
                                        latitude: retailerData.latitude,
                                        longitude: retailerData.longitude,
                                        centerName: retailerData.name,

                                    }
                                }
                                )
                            }}>
                                <Text style={{ padding: 20, backgroundColor: 'skyblue', textAlign: 'center' }}>View Map</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );

            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
                    ),
                    headerTitle: "Retailer Info",
                }}
            />

            <>
                <ScrollView showsVerticalScrollIndicator={false}
                    refreshControl=
                    {
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {isLoading ? (
                        <ActivityIndicator size='large' color={COLORS.primary} />
                    ) : error ? (
                        <Text>Something went wrong</Text>
                    ) : retailerData.length === 0 ? (
                        <Text>No data available</Text>
                    ) : (
                        <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                            <Text>{params.id}</Text>
                            {/* <Text>{data}</Text> */}
                            <Text>{retailerData.name}</Text>
                            <Company
                                companyLogo={retailerData.logoPath}
                                name={retailerData.name}
                                contact={retailerData.contactNo}

                                location={retailerData.state}
                                locationUrl={retailerData.locationUrl}
                            />

                            <Tabs
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />

                            {displayTabContent()}
                        </View>
                    )}
                </ScrollView>

                <Footer url={retailerData?.websiteUrl ?? 'https://google.com/'} />
            </>
        </SafeAreaView>
    );
};

export default retailerDetail;