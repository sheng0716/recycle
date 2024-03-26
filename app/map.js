import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Callout, Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { useLocalSearchParams } from "expo-router";
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
    const [mapRegion, setMapRegion] = useState({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
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
            'X-RapidAPI-Key': 'cb36ed8f1dmsh898d8c5ae1f13e8p19ec38jsn858f2fc09078',
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
            <MapView style={styles.map} region={mapRegion}>

                <Marker coordinate={{ latitude: latitude, longitude: longitude }} title="Target">
                    <Callout>
                        <Text>{centerName}</Text>
                        <Text>{data.DistanceInKm} KM</Text>
                    </Callout>
                </Marker>
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