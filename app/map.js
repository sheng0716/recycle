import { View, Text, StyleSheet } from "react-native";
import MapView from 'react-native-maps'

const map = () => {
    return (
        <View
            style={styles.container}
        >
            {/* <Text
            // style={styles.headText}
            >
                Map</Text> */}
            <View style={styles.container}>
                <MapView style={styles.map} />
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