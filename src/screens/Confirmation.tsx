import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
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

interface IConfirmationParams {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: "smile" | "hug";
    nextScreen: string;
}

const emojis = {
    hug: "🤗",
    smile: "😄",
};

const Confirmation = () => {
    const navigation = useNavigation();
    const routes = useRoute();

    const {
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen,
    } = routes.params as IConfirmationParams;

    function handleMoveOn() {
        navigation.navigate(nextScreen);
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
                                <Text style={styles.emoji}>{emojis[icon]}</Text>
                                <Text style={styles.title}>{title}</Text>
                                <Text style={styles.subtitle}>{subtitle}</Text>
                            </View>
                            <View style={styles.footer}>
                                <Button
                                    text={buttonTitle}
                                    onPress={handleMoveOn}
                                />
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
