import { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import * as Location from 'expo-location'

import { COLORS, icons, images, SIZES } from "../../constants";
import {
    Recycle,
    Retailer,
    ScreenHeaderBtn,
    Welcome,
    Product,
} from "../../components";

const Home = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("");


    // const [location, setLocation] = useState(null);
    // const [errorMsg, setErrorMsg] = useState(null);

    // useEffect(() => {
    //     (async () => {

    //         let { status } = await Location.requestForegroundPermissionsAsync();
    //         if (status !== 'granted') {
    //             setErrorMsg('Permission to access location was denied');
    //             return;
    //         }

    //         let location = await Location.getCurrentPositionAsync({});
    //         setLocation(location);
    //         console.log(location);
    //     })();
    // }, []);

    // let text = 'Waiting..';
    // if (errorMsg) {
    //     text = errorMsg;
    // } else if (location) {
    //     text = JSON.stringify(location);
    // }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (

                        <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />

                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
                    ),
                    headerTitle: "",
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium,
                    }}
                >
                    <Welcome
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleClick={() => {
                            if (searchTerm) {
                                router.push(`/search/${searchTerm}`)
                            }
                        }}
                    />

                    {/* <Retailer /> */}
                    {/* <Recycle /> */}

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;