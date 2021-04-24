import React, { useEffect } from "react";
import {
    useFonts,
    Jost_400Regular,
    Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import AppLoading from "expo-app-loading";
import * as Notifications from "expo-notifications";
import Routes from "./src/routes";
import { IPlantProps } from "./src/types/plant";

export default function App() {
    const [isFontsLoaded] = useFonts({
        Jost_400Regular,
        Jost_600SemiBold,
    });

    useEffect(() => {
        // const subscriptionNotifications = Notifications.addNotificationReceivedListener(
        //     async (notifications) => {
        //         const data = notifications.request.content.data
        //             .plant as IPlantProps;
        //         console.log(data);
        //     }
        // );
        // return () => subscriptionNotifications.remove();
        // async function notifications() {
        //     // await Notifications.cancelAllScheduledNotificationsAsync();
        //     // const data = await Notifications.getAllScheduledNotificationsAsync();
        // }
        // notifications();
    }, []);

    if (!isFontsLoaded) {
        return <AppLoading />;
    }

    return <Routes />;
}
