import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    TouchableOpacityProps,
} from "react-native";
import colors from "../../styles/colors";

interface IButtonProps extends TouchableOpacityProps {
    text: string;
}

const Button: React.FC<IButtonProps> = ({ text, ...rest }) => {
    return (
        <TouchableOpacity style={styles.button} activeOpacity={0.6} {...rest}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        borderRadius: 16,
        marginBottom: 8,
        height: 56,
    },
    buttonText: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 24,
    },
});

export default Button;