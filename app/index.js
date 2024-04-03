import { Redirect } from "expo-router";
import { View } from 'react-native'
import { AuthProvider } from "./AuthProvider";
//this is the first page will be called out
//here redirect to home.js, /home
const StartPage = () => {
    return (
        <AuthProvider>


            <Redirect href="/favourite" />
        </AuthProvider>
    )

};

export default StartPage;