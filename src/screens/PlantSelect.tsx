import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Header from "../components/Header";
import PlaceButton from "../components/PlaceButton";
import PlantCardPrimary from "../components/PlantCardPrimary";
import api from "../services/api";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface IPlaceProps {
    key: string;
    title: string;
}

interface IPlantProps {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number;
        repeat_every: string;
    };
}

const PlantSelect = () => {
    const [places, setPlaces] = useState<IPlaceProps[]>([]);
    const [plants, setPlants] = useState<IPlantProps[]>([]);
    const [selectedPlace, setSelectedPlace] = useState("all");

    async function fetchPlaces() {
        const { data } = await api.get(
            "plants_environments?_sort=title&_order=asc"
        );

        setPlaces([
            {
                key: "all",
                title: "All",
            },
            ...data,
        ]);
    }

    async function fetchPlants() {
        const { data } = await api.get("plants?_sort=name&_order=asc");

        setPlants(data);
    }

    useEffect(() => {
        fetchPlaces();
    }, []);

    useEffect(() => {
        fetchPlants();
    }, []);

    function handleSelectedPlace(place: string) {
        setSelectedPlace(place);
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Header />
                <Text style={styles.title}>Which place</Text>
                <Text style={styles.subtitle}>
                    do you want to place your plant in?
                </Text>
            </View>

            <View>
                <FlatList
                    data={places}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <PlaceButton
                            title={item.title}
                            active={item.key === selectedPlace}
                            onPress={() => handleSelectedPlace(item.key)}
                        />
                    )}
                    contentContainerStyle={styles.placeList}
                />
            </View>

            <View style={styles.plants}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={plants}
                    renderItem={({ item }) => <PlantCardPrimary data={item} />}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 16,
        backgroundColor: colors.background,
        // justifyContent: "center",
        // alignItems: "center",
    },
    wrapper: {
        paddingHorizontal: 32,
    },
    title: {
        fontSize: 16,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 16,
    },
    subtitle: {
        fontSize: 16,
        color: colors.heading,
        fontFamily: fonts.text,
        lineHeight: 20,
    },
    placeList: {
        height: 40,
        justifyContent: "center",
        paddingBottom: 8,
        marginLeft: 24,
        marginVertical: 32,
        paddingRight: 32,
    },
    plants: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: "center",
    },
});

export default PlantSelect;
