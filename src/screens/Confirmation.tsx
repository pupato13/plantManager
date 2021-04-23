import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import Button from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

const Confirmation = () => {
    const navigation = useNavigation();

    function handleMoveOn() {
        navigation.navigate("PlantSelect");
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.wrapper}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>😁</Text>
                                <Text style={styles.title}>Ready</Text>
                                <Text style={styles.subtitle}>
                                    Now let's start taking care of your plants
                                    with love
                                </Text>
                            </View>
                            <View style={styles.footer}>
                                <Button text="Start" onPress={handleMoveOn} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around",
    },
    wrapper: {
        flex: 1,
        width: "100%",
        padding: 16,
    },
    header: {
        alignItems: "center",
    },
    form: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 56,
        alignItems: "center",
    },
    emoji: {
        fontSize: 80,
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: "center",
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 32,
        textAlign: "center",
        color: colors.heading,
        fontFamily: fonts.text,
        paddingVertical: 10,
    },
    footer: {
        width: "100%",
        marginTop: 48,
        paddingHorizontal: 16,
    },
});

export default Confirmation;
