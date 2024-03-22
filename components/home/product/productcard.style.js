import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        width: 182,
        height: 150,
        marginEnd: 22,
        borderRadius: SIZES.medium,
        backgroundColor: 'white'
    },
    imageContainer: {
        flex: 1,
        width: 90,
        marginLeft: SIZES.small / 2,
        marginRight: SIZES.small / 2,
        borderRadius: SIZES.small,
        overflow: 'hidden',
        backgroundColor: 'black',
    },
    image: {
        width: '100%',
        height: '100 %',
        resizeMode: 'contain',
    },
    detail: {
        padding: SIZES.small,
    },
    title: {
        fontSize: SIZES.large,
        marginBottom: 2,
    }
})

export default styles;