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
