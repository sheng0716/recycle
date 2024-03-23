import { useState } from "react";
import { SafeAreaView, ScrollView, View, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";

import { COLORS, icons, images, SIZES } from "../../constants";
import {
    Nearbyjobs,
    Retailer,
    ScreenHeaderBtn,
    Welcome,
    Product,
} from "../../components";

const Home = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("");

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

                    <Retailer />
                    <Nearbyjobs />

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;