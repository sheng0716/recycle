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
    FlatList,
    Modal,
    Alert,
    TextInput,
    Button,
} from "react-native";

import {
    Company,
    About,
    Footer,
    Tabs,
    ScreenHeaderBtn,
    MapView,
    MaterialTab,
    FooterRecycle,
    ReviewCenterCard,
} from "../../../components";
import { COLORS, icons, SIZES } from "../../../constants";
// import companiesDbService from "../../assets/DbService/companiesDbService";
import useFetchByCompanyId from "../../../hook/useFetchByCompanyId";
import companiesDbService from "../../../assets/DbService/companiesDbService";
import productDbService from "../../../assets/DbService/productDbService";
import MaterialCard from "../../../components/jobdetails/MaterialTab/MaterialCard";
import { useAuth } from "../../AuthProvider";


const tabs = ["About", "Materials", "Review", "Location"];

const recycleDetail = () => {

    const { userId } = useAuth();

    const router = useRouter();
    const [centerData, setCenterData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [acceptMaterial, setAcceptMaterial] = useState([]);//use to store what material the center accept
    const [review, setReview] = useState([]);//get review from database and store here to show later

    // const { data, isLoading, error, refetch } = useFetch("job-details", {
    //     job_id: params.id,
    // });
    // const [{ company, setCompany }] = useState([]);

    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [refreshing, setRefreshing] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    // const fetchData = async () => {
    //     try {
    //         const companiesData = await companiesDbService.getAllCompanyDetailsBycompanyId(companyId);
    //     }
    //     catch {

    //     }
    // };

    const params = useLocalSearchParams();
    const c_id = params.id;// this is the company id, later will will use to find materials from center materials pivot table
    // const { data, isLoading, error, refetch } = useFetchByCompanyId('/api/centers', c_id)

    const onToggleFavourite = async () => {
        try {
            if (isFavourite) {
                await companiesDbService.removeFavouriteCenter(userId, c_id);
            } else {
                await companiesDbService.addFavouriteCenter(userId, c_id);
            }
            // Toggle the isFavorite state
            setIsFavourite(!isFavourite);
        } catch (error) {
            console.error('Error toggling favourite status', error);
        }
    }

    const addReview = async () => {
        try {
            await companiesDbService.addCenterReview(c_id, rating, comment);
        } catch (error) {
            console.log("Falied to add review center");
        }
    }

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

    const fetchReviewData = async () => {
        setIsLoading(true);
        try {
            const reviewData = await companiesDbService.getReviewCenterByCenterId(c_id);
            setReview(reviewData);
            console.log('Review: ', reviewData);
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
        fetchReviewData();
    }, [])

    const refetch = () => {
        setIsLoading(true);
        fetchCenterData();
        fetchAcceptedMaterialData();
        fetchReviewData();
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
            case "Review":
                return (
                    <View>
                        <TouchableOpacity
                            style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5 }}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={{ color: 'white', textAlign: 'center' }}>Add Review</Text>
                        </TouchableOpacity>
                        <FlatList
                            key={`review-list-${activeTab}`}
                            scrollEnabled={false}
                            data={review}
                            renderItem={({ item }) =>
                                <ReviewCenterCard
                                    item={item}
                                />
                            }
                            keyExtractor={(item, index) => `review-${index}`}
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
                    headerTitle: "Center Info",
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
                            {/* <Text>{params.id}</Text> */}
                            {/* <Text>{data}</Text> */}
                            {/* <Text>{centerData.name}</Text> */}
                            <Company
                                companyLogo={centerData.logoPath}
                                name={centerData.name}
                                type='Recycling Center'

                                location={centerData.state}
                                locationUrl={centerData.locationUrl}
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

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 22 }}>
                        <View style={{
                            margin: 20, // You can decrease the margin to make the modal take up more space
                            backgroundColor: 'white',
                            borderRadius: 20,
                            padding: 35, // Adjust padding as needed
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                            width: '90%', // Adjust width to control the size
                            maxHeight: '80%', // Use maxHeight to control how tall the modal can grow margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 
                        }}>
                            <Text style={{ marginBottom: 15, textAlign: "center" }}>Add a Review</Text>

                            {/* Input fields for rating and comment */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <TouchableOpacity
                                        key={item}
                                        style={{
                                            backgroundColor: rating === item ? 'blue' : 'gray', // Highlight the selected rating
                                            padding: 10,
                                            borderRadius: 5,
                                            marginHorizontal: 5,
                                        }}
                                        onPress={() => setRating(item)}
                                    >
                                        <Text style={{ color: 'white' }}>{item}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <TextInput
                                placeholder="Comment"
                                value={comment}
                                onChangeText={setComment}
                                multiline
                                style={{ height: 100, marginBottom: 20, borderWidth: 1, padding: 10, width: '100%' }}
                            />

                            {/* Submit Button */}
                            <Button
                                title="Submit Review"
                                onPress={() => {
                                    (async () => {
                                        try {
                                            // Call your addReview function here
                                            await addReview();
                                            console.log('Review submitted successfully');
                                            // Close the modal and possibly clear the form or give feedback
                                            setModalVisible(false);
                                            setRating(0); // Resetting the rating for future use
                                            setComment(""); // Clearing the comment field
                                            // Optionally, refresh the reviews to show the new one
                                            // This might involve calling a fetchReviews function or similar
                                        } catch (error) {
                                            console.log("Failed to add review center", error);
                                            // Handle errors, maybe show an alert to the user
                                            Alert.alert("Error", "Failed to submit review. Please try again.");
                                        }
                                    })();
                                }}
                            />


                            {/* Close Button */}
                            <TouchableOpacity
                                style={{ marginTop: 20, backgroundColor: 'grey', borderRadius: 5, padding: 10, width: '100%', alignItems: 'center' }}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={{ color: 'white' }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <FooterRecycle
                    url={centerData?.websiteUrl ?? 'https://careers.google.com/jobs/results/'}
                    isFavourite={isFavourite}
                    onToggleFavourite={onToggleFavourite}

                />
            </>
        </SafeAreaView>
    );
};

export default recycleDetail;