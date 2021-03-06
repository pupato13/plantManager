import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import Header from "../components/Header";
import Loading from "../components/Loading";
import PlaceButton from "../components/PlaceButton";
import PlantCardPrimary from "../components/PlantCardPrimary";
import api from "../services/api";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { IPlantProps } from "../types/plant";
import { IPlaceProps } from "../types/place";

const PlantSelect = () => {
    const [places, setPlaces] = useState<IPlaceProps[]>([]);
    const [plants, setPlants] = useState<IPlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<IPlantProps[]>([]);
    const [selectedPlace, setSelectedPlace] = useState("all");
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [loadMore, setLoadMore] = useState(true);

    const navigation = useNavigation();

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
        const { data } = await api.get(
            `plants?_sort=name&_order=asc&_page=${page}&_limit=8`
        );

        if (!data) return setIsLoading(true);

        if (page > 1) {
            setPlants((prevState) => [...prevState, ...data]);
            setFilteredPlants((prevState) => [...prevState, ...data]);
        } else {
            setPlants(data);
            setFilteredPlants(data);
        }

        setIsLoading(false);
        setLoadMore(false);
    }

    useEffect(() => {
        fetchPlaces();
    }, []);

    useEffect(() => {
        fetchPlants();
    }, []);

    function handleSelectedPlace(place: string) {
        setSelectedPlace(place);

        if (place === "all") return setFilteredPlants(plants);

        const filtered = plants.filter((plant) =>
            plant.environments.includes(place)
        );

        setFilteredPlants(filtered);
    }

    async function handleFetchMorePlants(distance: number) {
        if (distance < 1) return;

        setLoadMore(true);
        setPage((prevState) => prevState + 1);
        await fetchPlants();
    }

    function handlePlantSelect(plant: IPlantProps) {
        navigation.navigate("PlantDetail", { plant });
    }

    if (isLoading) return <Loading />;

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
                    keyExtractor={(place) => String(place.key)}
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
                    keyExtractor={(plant) => String(plant.id)}
                    data={filteredPlants}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <PlantCardPrimary
                            data={item}
                            onPress={() => handlePlantSelect(item)}
                        />
                    )}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) =>
                        handleFetchMorePlants(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadMore ? (
                            <ActivityIndicator color={colors.green} />
                        ) : (
                            <></>
                        )
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
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
