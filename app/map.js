import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { useLocalSearchParams } from "expo-router";
// import mapView from '../components/mapView';

const map = () => {
    //this is utar location
    //3.0398872684355758, 101.79468236116317
    const { latitude: stringLatitude, longitude: stringLongitude } = useLocalSearchParams();
    console.log('String: latitude:', stringLatitude, ' longitude', stringLongitude);

    const defaultLatitude = 34.0522; // Example default latitude
    const defaultLongitude = -118.2437; // Example default longitude
    const latitude = parseFloat(stringLatitude) || defaultLatitude;
    const longitude = parseFloat(stringLongitude) || defaultLongitude;
    console.log('Float: latitude:', latitude, ' longitude', longitude);

    const [mapRegion, setMapRegion] = useState({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    useEffect(() => {
        if (latitude && longitude) { // Check if latitude and longitude are not null or undefined
            setMapRegion((prevRegion) => ({
                ...prevRegion,
                latitude: latitude,
                longitude: longitude,
            }));
        }
    }, [latitude, longitude]);
    return (
        <View style={styles.container}>
            <MapView style={styles.map} region={mapRegion}>

                <Marker coordinate={{ latitude: latitude, longitude: longitude }} title="Target" />
            </MapView>
        </View >
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
export default map;