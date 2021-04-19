import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";

interface IButtonProps {
    text: string;
}

export function Button({ text }: IButtonProps) {
    return (
        <TouchableOpacity style={styles.button} activeOpacity={0.6}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        justifyContent: "center",
        alignItems: "center",
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
