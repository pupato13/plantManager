import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

interface IPlaceButtonProps extends RectButtonProps {
    title: string;
    active?: boolean;
}

const PlaceButton: React.FC<IPlaceButtonProps> = ({
    title,
    active = false,
    ...rest
}) => {
    return (
        <RectButton
            style={[styles.container, active && styles.containerActive]}
            {...rest}
        >
            <Text
                style={[styles.buttonText, active && styles.buttonTextActive]}
            >
                {title}
            </Text>
        </RectButton>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.shape,
        height: 40,
        minWidth: 72,
        marginHorizontal: 8,
        padding: 8,
        borderRadius: 10,
    },
    containerActive: {
        backgroundColor: colors.green_light,
    },
    buttonText: {
        fontSize: 16,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    buttonTextActive: {
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.green_dark,
    },
});

export default PlaceButton;
