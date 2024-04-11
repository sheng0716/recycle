import { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import { Stack, useRouter, Link } from "expo-router";
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import * as Location from 'expo-location';
// import { usePushNotifications } from "../usePushNotification";
// import * as Notifications from 'expo-notifications';

import { COLORS, icons, images, SIZES, FONT } from "../../constants";
import {
    Recycle,
    Retailer,
    ScreenHeaderBtn,
    Welcome,
    Product,
} from "../../components";

const promotionImage = 'https://firebasestorage.googleapis.com/v0/b/recycle-416816.appspot.com/o/promo-dim-0100ea4fde9a006173f690b2e0915ef32b8d.png?alt=media&token=6e30cd22-1851-4d3e-97d8-6733d216711b'
const Home = () => {
    const router = useRouter()


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: true,
                    // headerLeft: () => (

                    //     <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />

                    // ),
                    // headerRight: () => (
                    //     <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
                    // ),
                    headerTitle: "Welcome",
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium,
                    }}
                >
                    <View>
                        <View style={styles.container}>
                            <Text style={styles.userName}>Hello </Text>
                            <Text style={styles.welcomeMessage}>What are looking for?</Text>
                            <Text style={styles.welcomeMessage}>Today Special</Text>
                        </View>

                    </View>
                    <View style={styles.PromtionContainer}>
                        <Text style={styles.PromotionTitle}>Promotion</Text>
                        <View>

                            <Image
                                source={{ uri: promotionImage }}
                                style={styles.image}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.PriceTitle}>
                            Current Recycling Material Accept Price
                        </Text>
                    </View>


                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    userName: {
        fontFamily: FONT.regular,
        fontSize: SIZES.large,
        color: COLORS.secondary,
    },
    welcomeMessage: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        marginTop: 2,
    },
    PromtionContainer: {
        marginTop: 8,
        width: '100 %',
    },
    PromotionTitle: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        marginTop: 20,
        marginBottom: 15,
    },
    PriceTitle: {
        fontFamily: FONT.bold,
        fontSize: SIZES.large,
        color: COLORS.primary,
        marginTop: 20,
    },

    image: {
        width: "100%",
        height: 180,
        alignSelf: 'flex-start',
        borderRadius: 10,
        resizeMode: 'contain',

    },
})