import React from "react";
import {
    useFonts,
    Jost_400Regular,
    Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import AppLoading from "expo-app-loading";
import Welcome from "./src/screens/Welcome";

export default function App() {
    const [isFontsLoaded] = useFonts({
        Jost_400Regular,
        Jost_600SemiBold,
    });

    if (!isFontsLoaded) {
        return <AppLoading />;
    }

    return <Welcome />;
}
