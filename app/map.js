import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { useLocalSearchParams } from "expo-router";
// import mapView from '../components/mapView';

const map = () => {
    //this is utar location
    //3.0398872684355758, 101.79468236116317
    const { latitude, longitude } = useLocalSearchParams();
    console.log('latitude:', latitude, ' longitude', longitude);
    return (
        <View style={styles.container}>
            <Text>123{latitude}</Text>
            {/* <MapView
                style={StyleSheet.absoluteFill} // Fill the entire screen with the map
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0922, // Adjust as needed for zoom level
                    longitudeDelta: 0.0421, // Adjust as needed for zoom level
                }}
            >
                <Marker
                    coordinate={{ latitude: latitude, longitude: longitude }}
                    title={"Location Title"} // Optional
                    description={"Location Description"} // Optional
                />
            </MapView> */}
        </View>

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