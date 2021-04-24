import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { formatDistance } from "date-fns";
import { enNZ } from "date-fns/locale";
import Header from "../components/Header";
import colors from "../styles/colors";
import waterdrop from "../assets/waterdrop.png";
import { IPlantProps } from "../types/plant";
import { getPlants } from "../libs/storage";
import fonts from "../styles/fonts";
import PlantCardSecondary from "../components/PlantCardSecondary";
import Loading from "../components/Loading";

const MyPlants = () => {
    const [plants, setPlants] = useState<IPlantProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();

    useEffect(() => {
        async function loadStorageData() {
            const storedPlants = await getPlants();

            if (storedPlants.length === 0) {
                setIsLoading(false);
                return;
            }

            const nextTime = formatDistance(
                new Date(storedPlants[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: enNZ }
            );

            setNextWatered(
                `Don't forget to water ${storedPlants[0].name} at ${nextTime}`
            );

            setPlants(storedPlants);
            setIsLoading(false);
        }

        loadStorageData();
    }, []);

    if (isLoading) return <Loading />;

    return (
        <View style={styles.container}>
            <Header />

            {plants.length > 0 ? (
                <>
                    <View style={styles.spotlight}>
                        <Image
                            source={waterdrop}
                            style={styles.spotlightImage}
                        />
                        <Text style={styles.spotlightText}>{nextWatered}</Text>
                    </View>

                    <View style={styles.plants}>
                        <Text style={styles.plantsTitle}>Next Watered</Text>

                        <FlatList
                            keyExtractor={(plant) => String(plant.id)}
                            data={plants}
                            renderItem={({ item }) => (
                                <PlantCardSecondary data={item} />
                            )}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ flex: 1 }}
                        />
                    </View>
                </>
            ) : (
                <View style={styles.messageEmptyContainer}>
                    <Text style={styles.messageEmptyText}>
                        You need to add a plant first 😎
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingTop: 48,
        backgroundColor: colors.background,
    },
    spotlight: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
    },
    spotlightImage: {
        width: 56,
        height: 56,
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: "100%",
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20,
    },
    messageEmptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    messageEmptyText: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.green,
        textAlign: "center",
    },
});

export default MyPlants;
