import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";

import wateringImg from "../assets/watering.png";
import Button from "../components/Button";
import colors from "../styles/colors";

const Welcome = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Manage{"\n"}
                    your plants{"\n"}
                    easily
                </Text>
                <Image source={wateringImg} style={styles.image} />
                <Text style={styles.subtitle}>
                    Don't forget to water your plants. We take care to remember
                    you whenever you need
                </Text>
                <Button text="Next" />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        color: colors.heading,
        marginTop: 40,
    },
    image: {
        width: 292,
        height: 284,
    },
    subtitle: {
        fontSize: 18,
        textAlign: "center",
        paddingHorizontal: 20,
        color: colors.heading,
    },
});

export default Welcome;
