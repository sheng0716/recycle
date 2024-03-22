import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';

const map = () => {
    //3.0398872684355758, 101.79468236116317
    const [location, setLocation] = useState();
    const [mapRegion, setMapRegion] = useState({
        latitude: 3.0398872684355758,
        longitude: 101.79468236116317,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    useEffect(() => {
        const getPermission = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Please grant location permission');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            console.log('Location:');
            console.log(currentLocation);
        };

        getPermission();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <MapView style={styles.map}
                    region={mapRegion}
                >
                    <Marker coordinate={mapRegion} title="Current Locatoin" />
                </MapView>
            </View>

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