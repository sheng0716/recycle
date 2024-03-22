import { Redirect } from "expo-router";
//this is the first page will be called out
//here redirect to home.js, /home
const StartPage = () => {
    return <Redirect href="/home" />;
};

export default StartPage;