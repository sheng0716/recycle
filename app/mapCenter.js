import { StatusBar } from 'expo-status-bar'
import MapView, { MapMarker, PROVIDER_GOOGLE } from "react-native-maps"
import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import * as Location from 'expo-location';
import React, { useEffect } from 'react'; // Import useEffect


export default function mapCenter() {

    // const onRegionChange = (region) => {
    //     console.log(region);
    // }
    // Function to request location permission
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
    }, []); // Empty array ensures this effect runs only once upon mounting

    return (
        <View
            style={
                styles.container
                // { flex: 1 }
            }
        >
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
                // provider={PROVIDER_GOOGLE}
                showsMyLocationButton={true}
                showsUserLocation={true}
            />
            {/* <StatusBar style='auto' /> */}
        </View>
    )
}

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
    }
});