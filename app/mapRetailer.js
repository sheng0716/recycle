import { StatusBar } from 'expo-status-bar'
import MapView, { MapMarker, Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps"
import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react'; // Import useEffect
import companiesDbService from '../assets/DbService/companiesDbService';
import retailer from './(tabs)/retailer';
import { Stack, useRouter } from 'expo-router';


export default function mapRetailer() {
    const router = useRouter();

    const [retailerData, setRetailerData] = useState([]);
    const fetchRetailerData = async () => {
        try {
            const retailerData = await companiesDbService.getAllRetailer();
            setRetailerData(retailerData);
            console.log('Retailer Data in Map Retailer: ', retailerData);
        } catch (error) {
            console.log(error);
        }

    }


    const handleCalloutPress = (id) => {
        router.push(
            {
                pathname: `/company-details/retailerDetail/${id}`
            }
        )
    }
    async function getLocationPermission() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                "Permission not granted",
                "Sorry, we need location permissions to make this work!",
                [{ text: "OK" }]
            );
            return;
        }
        // Optionally, get and log the current position
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
    }
    useEffect(() => {
        getLocationPermission();
        fetchRetailerData();
    }, []);

    return (
        <View
            style={
                styles.container
                // { flex: 1 }
            }
        >
            <Stack.Screen
                options={{
                    headerShadowVisible: true,
                    headerTitle: "Retailer Map",
                }}
            />
            <MapView
                style={styles.map}
                // onRegionChange={onRegionChange}
                // style={StyleSheet.absoluteFill}
                initialRegion={{
                    latitude: 3.0399856265754805,
                    latitudeDelta: 0.007128988281827731,
                    longitude: 101.79388610646129,
                    longitudeDelta: 0.0045419856905937195
                }}
                provider={PROVIDER_GOOGLE}
                showsMyLocationButton={true}
                showsUserLocation={true}
            >
                {retailerData.map((retailer, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: retailer.latitude,
                            longitude: retailer.longitude
                        }}
                    >
                        <Callout onPress={() => handleCalloutPress(retailer.retailerId)}>
                            <View style={styles.calloutView}>
                                <Text style={styles.calloutText}>{retailer.name}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            {/* <StatusBar style='auto' /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    calloutView: {
        maxWidth: 160, // Set the maximum width of the callout
        padding: 5, // Padding inside the callout
    },
    calloutText: {
        color: 'black', // Text color
        fontSize: 14, // Font size
        fontWeight: 'bold', // Font weight
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    }
});