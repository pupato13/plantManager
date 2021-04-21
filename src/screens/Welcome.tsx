import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";

import wateringImg from "../assets/watering.png";
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
                <Image
                    source={wateringImg}
                    style={styles.image}
                    // Hack for responsive used with Dimensions.get("window")
                    resizeMode="contain"
                />
                <Text style={styles.subtitle}>
                    Don't forget to water your plants. We take care to remember
                    you whenever you need
                </Text>
                <TouchableOpacity style={styles.button} activeOpacity={0.6}>
                    <Text style={styles.buttonText}>{">"}</Text>
                </TouchableOpacity>
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
        // width: 292,
        // height: 284,
        // Hack for responsive
        height: Dimensions.get("window").width * 0.7,
    },
    subtitle: {
        fontSize: 18,
        textAlign: "center",
        paddingHorizontal: 20,
        color: colors.heading,
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        borderRadius: 16,
        marginBottom: 8,
        height: 56,
        width: 56,
    },
    buttonText: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 24,
    },
});

export default Welcome;
