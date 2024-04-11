import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location';
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
// import mapView from '../components/mapView';

const map = () => {
    //this is utar location
    // 3.0398872684355758, 101.79468236116317
    const { latitude: stringLatitude, longitude: stringLongitude, centerName } = useLocalSearchParams();
    console.log('centerName:', ' String: latitude:', stringLatitude, ' longitude', stringLongitude);

    const defaultLatitude = 34.0522; // Example default latitude
    const defaultLongitude = -118.2437; // Example default longitude
    const latitude = parseFloat(stringLatitude) || defaultLatitude;
    const longitude = parseFloat(stringLongitude) || defaultLongitude;
    console.log('Float: latitude:', latitude, ' longitude', longitude);


    const [data, setData] = useState([]);//this is use to store distance between user location and center location
    const distance = parseFloat(data.DistanceInKm).toFixed(2);

    const [mapRegion, setMapRegion] = useState({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const resetMapRegion = () => {
        setMapRegion(mapRegion);
    };
    useEffect(() => {
        fetchDistance();
        if (latitude && longitude) { // Check if latitude and longitude are not null or undefined
            setMapRegion((prevRegion) => ({
                ...prevRegion,
                latitude: latitude,
                longitude: longitude,
            }));
        }
    }, [latitude, longitude]);


    const options = {
        method: 'GET',
        url: 'https://geocodeapi.p.rapidapi.com/GetDistance',
        params: {
            lat1: '3.0398872684355758',
            lon1: '101.79468236116317',
            lat2: latitude.toString(),
            lon2: longitude.toString(),
        },
        headers: {
            'X-RapidAPI-Key': '378d3ffb8amsh19157c86607fb19p1e6485jsn5eb95af421c7',
            'X-RapidAPI-Host': 'geocodeapi.p.rapidapi.com'
        }
    };


    const fetchDistance = async () => {
        try {
            const response = await axios.request(options);
            setData(response.data)
            console.log(data);
        } catch (error) {
            console.error(error);
        }

    }


    return (
        <View style={styles.container}>
            <MapView style={styles.map} region={mapRegion} showsUserLocation={true} provider={PROVIDER_GOOGLE}>
                <Marker coordinate={{ latitude: latitude, longitude: longitude }} title="Target">
                    <Callout>
                        <Text>{centerName}</Text>
                        <Text>{distance} KM</Text>
                    </Callout>
                </Marker>
            </MapView>
            <View style={styles.mapOverlay}>
                <Text>{centerName}</Text>
                <Text>{distance} Km</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    map: {
        width: '100%',
        height: '100%',
    },
    mapOverlay: {
        position: 'absolute', // Position the text box absolutely
        bottom: 10, // Distance from the bottom of the container
        left: 75, // Distance from the left of the container
        right: 75, // Distance from the right of the container
        backgroundColor: 'white', // White background for the text box
        padding: 10, // Padding inside the text box
        borderRadius: 5, // Optional: rounded corners for the text box
        // Add more styling as needed for the text box appearance
    }
});
export default map;