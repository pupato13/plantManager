import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import { PlantsKey } from "../types/asyncStorageKeys";
import { IPlantProps } from "../types/plant";

interface IStoragePlantProps {
    [id: string]: {
        data: IPlantProps;
    };
}

export async function savePlant(plant: IPlantProps): Promise<void> {
    try {
        const data = await AsyncStorage.getItem(PlantsKey);
        const oldPlants = data ? (JSON.parse(data) as IStoragePlantProps) : {};

        const newPlant = {
            [plant.id]: {
                data: plant,
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
