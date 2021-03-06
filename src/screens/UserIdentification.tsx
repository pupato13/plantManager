import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from "react-native";
import Button from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { UserNameKey } from "../types/asyncStorageKeys";

const UserIdentification = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();
    const navigation = useNavigation();

    async function handleSubmit() {
        if (!name) {
            return Alert.alert("Ops", "Tell me your name first 😥");
        }

        try {
            await AsyncStorage.setItem(UserNameKey, name);

            navigation.navigate("Confirmation", {
                title: "Ready",
                subtitle:
                    "Now let's start taking care of your plants with love",
                buttonTitle: "Start",
                icon: "smile",
                nextScreen: "PlantSelect",
            });
        } catch (error) {
            Alert.alert("Ops", "It was not possible to save your name 😓");
        }
    }

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!name);
    }

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputChange(value: string) {
        setIsFocused(!!value);
        setName(value);
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
                                <Text style={styles.emoji}>
                                    {isFilled ? "😉" : "😐"}
                                </Text>
                                <Text style={styles.title}>
                                    How can we{"\n"} call you?
                                </Text>
                            </View>
                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) && {
                                        borderColor: colors.green,
                                    },
                                ]}
                                autoCorrect={false}
                                autoFocus={false}
                                autoCapitalize="words"
                                placeholder="Enter your name"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />
                            <View style={styles.footer}>
                                <Button text="Confirm" onPress={handleSubmit} />
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
        fontSize: 48,
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: "center",
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20,
    },
    input: {
        borderBottomWidth: 2,
        borderColor: colors.gray,
        color: colors.heading,
        fontFamily: fonts.text,
        width: "100%",
        fontSize: 18,
        marginTop: 48,
        padding: 8,
        textAlign: "center",
    },
    footer: {
        width: "100%",
        marginTop: 48,
        paddingHorizontal: 16,
    },
});

export default UserIdentification;
