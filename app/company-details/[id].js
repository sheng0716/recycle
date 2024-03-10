import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
} from "react-native";

import {
    Company,
    JobAbout,
    JobFooter,
    JobTabs,
    ScreenHeaderBtn,
    Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
// import companiesDbService from "../../assets/DbService/companiesDbService";
import useFetchByCompanyId from "../../hook/useFetchByCompanyId";

const tabs = ["About", "Qualifications", "Responsibilities"];

const CompanyDetails = () => {
    const params = useLocalSearchParams();
    const router = useRouter();

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
    const { data, isLoading, error, refetch } = useFetchByCompanyId('/api/companies', c_id)

    const companyName = data.name;
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
                        info={data.description ?? "No data provided"}

                    />
                );

            case "Qualifications":
                return (
                    <Specifics
                    // title='Qualifications'
                    // points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
                    />
                );


            case "Responsibilities":
                return (
                    <Specifics
                    // title='Responsibilities'
                    // points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
                    />
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
                    ) : data.length === 0 ? (
                        <Text>No data available</Text>
                    ) : (
                        <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                            <Text>{params.id}</Text>
                            <Text>{data.name}</Text>
                            <Company
                                companyLogo={data.logoPath}
                                type={data.type}
                                companyName={data.name}
                                location={data.state}
                                locationUrl={data.locationUrl}
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

export default CompanyDetails;