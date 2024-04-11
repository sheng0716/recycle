import React from 'react'
import { View, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';

// import styles from './map.style'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

const MapViewScreen = ({ location }) => {
    return (
        <View>
            {/* <Text>MapView</Text> */}
            <MapView
                // style={styles.map}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                    title={location.name}
                    description={location.address}
                />
            </MapView>
        </View>
    )
}

export default MapViewScreen