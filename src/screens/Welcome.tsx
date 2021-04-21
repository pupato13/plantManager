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
import { Feather } from "@expo/vector-icons";

import wateringImg from "../assets/watering.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

const Welcome = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
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
                    <Feather
                        style={styles.buttonIcon}
                        name="chevron-right"
                        size={32}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 32,
        fontFamily: fonts.heading,
        fontWeight: "bold",
        textAlign: "center",
        color: colors.heading,
        marginTop: 40,
        lineHeight: 40,
    },
    image: {
        // width: 292,
        // height: 284,
        // Hack for responsive
        height: Dimensions.get("window").width * 0.7,
    },
    subtitle: {
        fontSize: 18,
        fontFamily: fonts.text,
        textAlign: "center",
        paddingHorizontal: 20,
        color: colors.heading,
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        marginBottom: 8,
        height: 56,
        width: 56,
    },
    buttonIcon: {
        flexDirection: "row",
        color: colors.white,
    },
});

export default Welcome;
