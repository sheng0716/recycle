import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";
import UsersDbService from '../assets/DbService/userDbService';
import { useRouter } from "expo-router";
import { useAuth } from "./AuthProvider";
import { icons } from "../constants";

const LoginScreen = ({ navigation }) => {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const checkCredentials = async () => {
        const data = await UsersDbService.loginUser(email, password)

        if (data.message != "Login successful") {
            Alert.alert("Alert", data.message)
        } else {
            Alert.alert("Alert", data.message)
            // navigation.navigate('TabNavigator', { userId: data.userId })
            login(data.userId);
            router.push({
                pathname: '/profile',
                params: {
                    userId: data.userId,
                }
            })
        }
    }

    // handle when button is pressed, check the input
    const loginHandler = () => {
        if (email === '') {
            Alert.alert('Please enter your email.')

        } else if (password === '') {
            Alert.alert('Please enter your password.')

        } else {
            //check authentication
            checkCredentials();
        }
    }

    const registerHandler = () => {
        // navigation.navigate('Register')
        router.push({
            pathname: '/Register',
        })
    }

    return (
        <View style={styles.container}>

            <Image style={styles.image} source={icons.appLogo} />
            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={loginHandler}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={registerHandler}>
                <Text style={styles.loginText}>REGISTER</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: 40,
        width: 100,
        height: 100,
    },
    inputView: {
        backgroundColor: "#cce6ff",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
        textAlign: "center",
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
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
});

export default LoginScreen;