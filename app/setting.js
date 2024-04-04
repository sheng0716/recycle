import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, TouchableNativeFeedback, Alert, Image } from 'react-native';
import { Layout } from '@ui-kitten/components';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { icons } from "../constants"

// const CustomSwitch = ({ value, onValueChange }) => {

//     // const handleSwitchChange = async (newValue) => {
//     //     onValueChange(newValue);

//     //     try {
//     //         await AsyncStorage.setItem('notification', newValue.toString());
//     //     } catch (error) {
//     //         console.error('Error saving data to AsyncStorage:', error);
//     //     }
//     // };

//     const router = useRouter();

//     return (
//         <TouchableOpacity
//             onPress={() => handleSwitchChange(!value)}
//             style={[
//                 styles.switch,
//                 {
//                     backgroundColor: value ? 'blue' : 'grey',
//                 },
//             ]}
//         >
//             <View style={[styles.switchThumb, { left: value ? '50%' : 0 }]} />
//         </TouchableOpacity>
//     );
// };

const SettingsScreen = ({ }) => {
    //     const [notiEnabled, setNotiEnabled] = useState(false);

    // useEffect(() => {

    //     const retrieveSetting = async () => {

    //         try {
    //             const value = await AsyncStorage.getItem('notification');
    //             if (value !== null) {
    //                 setNotiEnabled(value === 'true');
    //             }
    //         } catch (error) {
    //             console.error('Error retrieving data from AsyncStorage:', error);
    //         }

    //     };

    //     retrieveSetting();

    // }, []);


    const router = useRouter();
    const handleLogOut = () => {
        Alert.alert("Log Out Successfully!!\nThank You!!");

        //Log out session

        router.push({
            pathname: '/Login'
        })
    }

    return (
        <View style={styles.container}>

            {/* <View style={styles.subcontainer}>
                <Text style={styles.subtitle}>Notification</Text>
                <CustomSwitch value={notiEnabled} onValueChange={setNotiEnabled} />
                <StatusBar style="auto" />
            </View> */}

            <Image style={styles.image} source={icons.appLogo} />
            <Text style={styles.title}>About Us</Text>
            <Text style={styles.aboutUs}>This is a recyle info application.{"\n"}v1.0.0{"\n"}Up to date.</Text>

            <TouchableNativeFeedback
                onPress={handleLogOut}
            // background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}
            >
                <View style={styles.buttonLogOut}>
                    <Text style={styles.buttonTextLogOut}>Log Out</Text>
                </View>
            </TouchableNativeFeedback>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    subcontainer:
    {
        alignSelf: 'center',
        backgroundColor: '#fff',
        width: '90%',
        padding: 20,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 10,
        elevation: 15,
        marginTop: 5,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    subtitle:
    {
        fontSize: 18,
        color: 'black',
    },

    switch: {
        width: 65,
        height: 30,
        borderRadius: 15,
        borderBlockColor: 'black',
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: 'grey',
    },
    switchThumb: {
        width: '50%',
        height: '100%',
        borderRadius: 50,
        backgroundColor: 'white',
        position: 'static',
        borderWidth: 1,
        borderColor: 'grey',
    },
    buttonLogOut: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: '#f53b3b',
        width: '90%',
        height: 50,
        borderRadius: 10,
        margin: 18,
        marginTop: 30,
        marginBottom: 20,
    },
    buttonTextLogOut: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        padding: 6,
    },
    title: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginBottom: 10,
    },
    aboutUs: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
    },
    image: {
        width: 100,
        height: 100,
        margin: 15,
    },
});

export default SettingsScreen;
