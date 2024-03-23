import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 150,
        marginEnd: 22,
        borderRadius: SIZES.medium,
        // backgroundColor: 'white',
    },
    imageContainer: {
        flex: 1,
        width: 90,
        marginLeft: SIZES.small / 2,
        marginRight: SIZES.small / 2,
        borderRadius: SIZES.small,
        overflow: 'hidden',
    },
    image: {
        // width: '100%',
        height: '100 %',
        resizeMode: 'contain',
        // width: 35,
        // height: 35,
        marginBottom: 8,
    },
    detail: {
        padding: SIZES.small,
    },
    title: {
        // fontSize: SIZES.medium,
        // marginBottom: 2,
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
    },
    item: {
        flex: 1,
        alignItems: 'center',
        padding: 8,
        margin: 4,
        height: 100,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 12,
    },
})

export default styles;