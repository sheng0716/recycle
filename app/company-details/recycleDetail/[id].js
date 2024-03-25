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
} from "react-native";

import {
    Company,
    JobAbout,
    JobFooter,
    JobTabs,
    ScreenHeaderBtn,
    Specifics,
    MapView,
} from "../../../components";
import { COLORS, icons, SIZES } from "../../../constants";
// import companiesDbService from "../../assets/DbService/companiesDbService";
import useFetchByCompanyId from "../../../hook/useFetchByCompanyId";
import companiesDbService from "../../../assets/DbService/companiesDbService";

const tabs = ["About", "Qualifications", "Location"];

const recycleDetail = () => {
    const params = useLocalSearchParams();

    const navigation = useNavigation();

    const router = useRouter();
    const [centerData, setCenterData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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

    const c_id = params.id;
    // const { data, isLoading, error, refetch } = useFetchByCompanyId('/api/centers', c_id)

    const fetchCenterData = async () => {
        setIsLoading(true);
        try {
            const centerData = await companiesDbService.getCenterDataByCenterId(c_id);
            setCenterData(centerData);
            console.log(centerData);
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
    }, [])

    const refetch = () => {
        setIsLoading(true);
        fetchCenterData();
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
                    <JobAbout
                        info={centerData.description ?? "No data provided"}

                    />
                );

            case "Qualifications":
                return (
                    <Specifics
                    // title='Qualifications'
                    // points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
                    />
                );


            case "Location":
                return (
                    // <MapView
                    //     // title='Responsibilities'
                    //     // points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
                    //     location={{
                    //         latitude: centerData.latitude,
                    //         longitude: centerData.longitude,
                    //         name: centerData.name,
                    //         address: centerData.address
                    //     }}
                    // />
                    // router.push({
                    //     pathname: '/map',
                    // }
                    <View>
                        <Text>{centerData.latitude}</Text>
                        <Text>{centerData.longitude}</Text>

                        <View>

                            <TouchableOpacity onPress={() => {
                                router.push({
                                    pathname: '/map',
                                    params: {
                                        latitude: centerData.latitude,
                                        longitude: centerData.longitude
                                    }
                                }
                                )
                                // <Link href={{ pathname: 'map', params: { latitude: centerData.latitude, longitude: centerData.longitude } }}></Link>
                            }}>
                                <Text style={{ padding: 20, backgroundColor: 'skyblue', textAlign: 'center' }}>View Map</Text>
                            </TouchableOpacity>
                        </View>
                    </View >
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

                            <JobTabs
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />

                            {displayTabContent()}
                        </View>
                    )}
                </ScrollView>

                {/* <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results/'} /> */}
            </>
        </SafeAreaView>
    );
};

export default recycleDetail;