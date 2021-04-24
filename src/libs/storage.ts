import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import * as Notifications from "expo-notifications";
import { PlantsKey } from "../types/asyncStorageKeys";
import { IPlantProps } from "../types/plant";

export interface IStoragePlantProps {
    [id: string]: {
        data: IPlantProps;
        notificationId: string;
    };
}

export async function savePlant(plant: IPlantProps): Promise<void> {
    try {
        const nextTime = new Date(plant.dateTimeNotification);
        const now = new Date();

        const { times, repeat_every } = plant.frequency;

        if (repeat_every === "week") {
            const interval = Math.trunc(7 / times);
            nextTime.setDate(now.getDate() + interval);
        } else {
            nextTime.setDate(nextTime.getDate() + 1);
        }

        const seconds = Math.abs(
            Math.ceil(now.getTime() - nextTime.getTime()) / 1000
        );

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: "Heeey, 🌱",
                body: `It's time to water your ${plant.name}`,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                data: {
                    plant,
                },
            },
            trigger: {
                seconds: seconds < 60 ? 60 : seconds,
                repeats: true,
            },
        });

        const data = await AsyncStorage.getItem(PlantsKey);
        const oldPlants = data ? (JSON.parse(data) as IStoragePlantProps) : {};

        const newPlant = {
            [plant.id]: {
                data: plant,
                notificationId,
            },
        };

        await AsyncStorage.setItem(
            PlantsKey,
            JSON.stringify({
                ...newPlant,
                ...oldPlants,
            })
        );
    } catch (error) {
        throw new Error(error);
    }
}

export async function getPlants(): Promise<IPlantProps[]> {
    try {
        const data = await AsyncStorage.getItem(PlantsKey);
        const plants = data ? (JSON.parse(data) as IStoragePlantProps) : {};

        const sortedPlants = Object.keys(plants)
            .map((plant) => {
                return {
                    ...plants[plant].data,
                    hour: format(
                        new Date(plants[plant].data.dateTimeNotification),
                        "HH:mm"
                    ),
                };
            })
            .sort((a, b) =>
                Math.floor(
                    new Date(a.dateTimeNotification).getTime() / 1000 -
                        Math.floor(
                            new Date(b.dateTimeNotification).getTime() / 1000
                        )
                )
            );

        return sortedPlants;
    } catch (error) {
        throw new Error(error);
    }
}

export async function removePlant(id: string): Promise<void> {
    const data = await AsyncStorage.getItem(PlantsKey);

    const plants = data ? (JSON.parse(data) as IStoragePlantProps) : {};

    const notificationId = plants[id] ? plants[id].notificationId : "";

    delete plants[id];

    await AsyncStorage.setItem(PlantsKey, JSON.stringify(plants));

    if (!!notificationId)
        await Notifications.cancelScheduledNotificationAsync(notificationId);
}
