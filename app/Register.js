import { React, useState } from 'react';
import { Alert, Text, View, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';
import UsersDbService from '../assets/DbService/userDbService';
import { useRouter } from 'expo-router';
import { useAuth } from './AuthProvider';
import { icons } from '../constants';

const RegisterScreen = ({ navigation }) => {
    const router = useRouter();
    const { login } = useAuth();

    const [confirmPassword, setConfirmPassword] = useState("");
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        email: "",
        phoneNumber: "",
    });

    // const goBack = () => {
    //     navigation.goBack();
    // };

    const handleChange = (key, value) => {
        setUserData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const registerUser = async () => {
        const data = await UsersDbService.registerUser(userData)

        if (!data.isUnique) {
            Alert.alert("Alert", data.message)
        } else {
            Alert.alert("Alert", data.message)
            // navigation.navigate('TabNavigator', { userId: data.userId })
            login(data.userId);
            router.push({
                pathname: '/profile',
            })

        }
    }

    // handle when button is pressed, check the input
    const registerHandler = () => {
        if (userData.username === '') {
            Alert.alert('Please enter your username.')

        } else if (userData.email === '') {
            Alert.alert('Please enter your email.')

        } else if (userData.phoneNumber === '') {
            Alert.alert('Please enter your phone number.')

        } else if (userData.password === '') {
            Alert.alert('Please enter your password.')

        } else if (confirmPassword === '') {
            Alert.alert('Please enter your confirm password.')

        } else if (confirmPassword !== userData.password) {
            Alert.alert('Your password and confirm password are different.')

        } else {
            registerUser();
        }
    }

    return (
        <View style={{ backgroundColor: "#FFF", height: "100%" }}>

            {/* <TouchableOpacity onPress={goBack}>
                <Icon
                    name='chevron-left-outline'
                    style={{ width: 40, height: 50, marginLeft: 20, marginTop: 40 }}
                />
            </TouchableOpacity> */}

            <Image source={icons.appLogo}
                style={styles.image}
            />
            <Text style={styles.headers}>Register New Account</Text>

            <View style={[styles.container, { marginTop: 50 }]}>
                <TextInput
                    placeholder="Username"
                    placeholderTextColor="#00716F"
                    onChangeText={(text) => handleChange('username', text)}
                    style={{ paddingHorizontal: 10 }}
                />
            </View>

            <View style={styles.container}>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#00716F"
                    onChangeText={(text) => handleChange('email', text)}
                    style={{ paddingHorizontal: 10 }}
                />
            </View>

            <View style={styles.container}>
                <TextInput
                    placeholder="Phone Number"
                    placeholderTextColor="#00716F"
                    onChangeText={(text) => handleChange('phoneNumber', text)}
                    style={{ paddingHorizontal: 10 }}
                />
            </View>

            <View style={styles.container}>
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    onChangeText={(text) => handleChange('password', text)}
                    placeholderTextColor="#00716F"
                    style={{ paddingHorizontal: 10 }}
                />
            </View>

            <View style={styles.container}>
                <TextInput
                    secureTextEntry
                    placeholder="Confirm Password"
                    onChangeText={(text) => setConfirmPassword(text)}
                    placeholderTextColor="#00716F"
                    style={{ paddingHorizontal: 10 }}
                />
            </View>

            <TouchableOpacity style={styles.registerBtn} onPress={registerHandler}>
                <Text style={styles.registerTxt}>REGISTER</Text>
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 55,
        borderWidth: 2,
        paddingHorizontal: 10,
        borderColor: "#00716F",
        borderRadius: 23,
        paddingVertical: 2
    },
    registerBtn: {
        marginHorizontal: 55,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        backgroundColor: "#00716F",
        paddingVertical: 10,
        borderRadius: 23
    },
    registerTxt: {
        color: 'white'
    },
    headers: {
        fontSize: 30,
        // fontFamily: "SemiBold",
        alignSelf: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    button: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#6897bb",
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },

});

export default RegisterScreen;