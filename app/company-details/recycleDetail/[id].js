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

const tabs = ["About", "Materials", "Location"];

const recycleDetail = () => {
    const params = useLocalSearchParams();

    const navigation = useNavigation();

    const router = useRouter();
    const [centerData, setCenterData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [acceptMaterial, setAcceptMaterial] = useState([]);//use to store what material the center accept

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

    const fetchCenterData = async () => {
        setIsLoading(true);
        try {
            const centerData = await companiesDbService.getCenterDataByCenterId(c_id);
            setCenterData(centerData);
            console.log('Center Information: ', centerData);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    const fetchAcceptedMaterialData = async () => {
        setIsLoading(true);
        try {
            const acceptedMaterials = await productDbService.getAcceptedMaterialByCenterId(c_id);
            setAcceptMaterial(acceptedMaterials);
            console.log('Accepted Material: ', acceptMaterial);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchCenterData();
        fetchAcceptedMaterialData();
    }, [])

    const refetch = () => {
        setIsLoading(true);
        fetchCenterData();
        fetchAcceptedMaterialData();
    };

    const companyName = centerData.name;
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
                        info={centerData.description ?? "No data provided"}

                    />
                );

            case "Materials":
                return (
                    <View>
                        <FlatList
                            scrollEnabled={false}
                            numColumns={2}
                            data={acceptMaterial}
                            renderItem={({ item }) =>
                                <MaterialCard
                                    item={item}
                                />
                            }
                        />
                    </View>
                );


            case "Location":
                return (
                    <View>
                        <Text>{centerData.name}</Text>
                        <Text>{centerData.latitude}</Text>
                        <Text>{centerData.longitude}</Text>

                        <View>

                            <TouchableOpacity onPress={() => {
                                router.push({
                                    pathname: '/map',
                                    params: {
                                        latitude: centerData.latitude,
                                        longitude: centerData.longitude,
                                        centerName: centerData.name,

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
                    headerTitle: "",
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
                    ) : centerData.length === 0 ? (
                        <Text>No data available</Text>
                    ) : (
                        <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                            <Text>{params.id}</Text>
                            {/* <Text>{data}</Text> */}
                            <Text>{centerData.name}</Text>
                            <Company
                                companyLogo={centerData.logoPath}
                                name={centerData.name}
                            // companyLogo={data.logoPath}
                            // type={data.type}
                            // companyName={data.name}
                            // location={data.state}
                            // locationUrl={data.locationUrl}
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

                {/* <Footer url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results/'} /> */}
            </>
        </SafeAreaView>
    );
};

export default recycleDetail;