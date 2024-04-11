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
                            {/* two button here show in a row,one button named recycling center another button name retailer */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        // Handle the press for Recycling Center
                                        router.push(
                                            {
                                                pathname: '../mapCenter'
                                            }
                                        )
                                        console.log('Recycling Center pressed');
                                    }}>
                                    <Image
                                        source={{ uri: "https://firebasestorage.googleapis.com/v0/b/recycle-416816.appspot.com/o/recycling_center_icon_map.png?alt=media&token=b7e0b0f8-456d-4fee-a5cd-c015304cd9a8" }}

                                        // source={icons.recycleCenter} 
                                        style={styles.buttonIcon} />
                                    <Text style={styles.buttonText}>Recycling Center</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        // Handle the press for Retailer
                                        console.log('Retailer pressed');
                                    }}>
                                    <Image
                                        source={{ uri: "https://firebasestorage.googleapis.com/v0/b/recycle-416816.appspot.com/o/retailer_icon_map.png?alt=media&token=6065ac17-b217-41c0-9ecb-8c0071538b43" }}

                                        // source={icons.retailer} 
                                        style={styles.buttonIcon} />
                                    <Text style={styles.buttonText}>Retailer</Text>
                                </TouchableOpacity>
                            </View>
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
    button: {
        // Other styles remain the same
        justifyContent: 'center', // Center content vertically and horizontally
        alignItems: 'center', // Align items in the center for the column layout
        flexDirection: 'column', // Stack items vertically
        backgroundColor: '#f0f0f0', // Example color, replace with your COLORS.lightGray
        padding: 10,
        borderRadius: 5,
        width: '48%', // Adjust as necessary
        margin: 4, // Space between buttons
    },
    buttonIcon: {
        width: 40, // Adjusted for a bigger icon
        height: 40, // Adjusted for a bigger icon
        marginBottom: 5, // Adds some space between the icon and the text
    },
    buttonText: {
        fontSize: 20, // Adjusted for bigger text
        color: '#000', // Example color, replace with your COLORS.primary
        textAlign: 'center', // Ensure text is centered under the icon
    },
})