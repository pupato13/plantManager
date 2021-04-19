import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";

import wateringImg from "../assets/watering.png";
import { Button } from "../components/Button";
import colors from "../styles/colors";

const Welcome = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Gerencie{"\n"}
                    suas plantas{"\n"}
                    de forma facil
                </Text>
                <Image source={wateringImg} style={styles.image} />
                <Text style={styles.subtitle}>
                    Nao esqueca mais de regar suas plantas. Nos cuidamos de
                    lembrar voce sempre que precisar.
                </Text>
                {/* <Button text="Avancar" /> */}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
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
