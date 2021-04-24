import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Platform,
    Alert,
    TouchableOpacity,
} from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useRoute } from "@react-navigation/core";
import { SvgFromUri } from "react-native-svg";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { format, isBefore } from "date-fns";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import waterdrop from "../assets/waterdrop.png";
import Button from "../components/Button";
import { IPlantProps } from "../types/plant";
import { savePlant } from "../libs/storage";

interface IParams {
    plant: IPlantProps;
}

const PlantDetail = () => {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");

    const route = useRoute();

    const { plant } = route.params as IParams;

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === "android") {
            setShowDatePicker((prevState) => !prevState);
        }

        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());

            return Alert.alert(
                "Ops",
                "Please, choose a time in the future! 🕐"
            );
        }

        if (dateTime) setSelectedDateTime(dateTime);
    }

    function handleOpenDateTimePickerForAndroid() {
        setShowDatePicker(!showDatePicker);
    }

    async function handleSave() {
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime,
            });
        } catch (error) {
            Alert.alert("Ops", "It was not possible to save your changes! 😥");
        }
    }

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

                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDateTime}
                        mode="time"
                        display="spinner"
                        onChange={handleChangeTime}
                    />
                )}

                {Platform.OS === "android" && (
                    <TouchableOpacity
                        style={styles.dateTimePickerButton}
                        onPress={handleOpenDateTimePickerForAndroid}
                    >
                        <Text style={styles.dateTimePickerText}>
                            {`Change ${format(selectedDateTime, "HH:mm")}`}
                        </Text>
                    </TouchableOpacity>
                )}

                <Button text="Save Plant" onPress={handleSave} />
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
    dateTimePickerButton: {
        width: "100%",
        alignItems: "center",
        paddingVertical: 40,
    },
    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text,
    },
});

export default PlantDetail;
