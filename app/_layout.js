import { Stack } from "expo-router";

import { Drawer } from "expo-router/drawer";
import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();
import { AuthProvider } from "./AuthProvider";

export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: "Login",
};

const Layout = () => {
    const [fontsLoaded] = useFonts({
        DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
        DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
        DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <AuthProvider>

            <Stack
            // initialRouteName="home"
            >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />



            </Stack>
        </AuthProvider>

    )
};

export default Layout;