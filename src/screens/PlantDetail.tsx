import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useRoute } from "@react-navigation/core";
import { SvgFromUri } from "react-native-svg";

import waterdrop from "../assets/waterdrop.png";
import Button from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { IPlantProps } from "../types/plant";

interface IParams {
    plant: IPlantProps;
}

const PlantDetail = () => {
    const route = useRoute();

    const { plant } = route.params as IParams;

    return (
        <View style={styles.container}>
            <View style={styles.plantInfo}>
                <SvgFromUri uri={plant.photo} height={150} width={150} />
                <Text style={styles.plantName}>{plant.name}</Text>
                <Text style={styles.plantDetail}>{plant.about}</Text>
            </View>
            <View style={styles.controller}>
                <View style={styles.tipContainer}>
                    <Image source={waterdrop} style={styles.tipImage} />
                    <Text style={styles.tipText}>{plant.water_tips}</Text>
                </View>
                <Text style={styles.alertLabel}>
                    Choose the best time to be remembered
                </Text>

                <Button text="Save Plant" onPress={() => {}} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: colors.shape,
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 32,
        paddingVertical: 48,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.shape,
    },
    plantName: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginTop: 16,
    },
    plantDetail: {
        fontSize: 18,
        fontFamily: fonts.text,
        color: colors.heading,
        textAlign: "center",
        marginTop: 10,
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20,
    },
    tipContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: "relative",
        bottom: 64,
    },
    tipImage: {
        width: 56,
        height: 56,
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 18,
        textAlign: "justify",
    },
    alertLabel: {
        textAlign: "center",
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 16,
        marginBottom: 8,
    },
});

export default PlantDetail;
