import React from "react";
import { Text, StyleSheet } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { SvgFromUri } from "react-native-svg";

interface IPlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
    };
}

const PlantCardPrimary: React.FC<IPlantProps> = ({ data, ...rest }) => {
    return (
        <RectButton style={styles.container}>
            <SvgFromUri uri={data.photo} width={70} height={70} />
            <Text style={styles.title}>{data.name}</Text>
        </RectButton>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        maxWidth: "45%",
        backgroundColor: colors.shape,
        margin: 8,
        paddingVertical: 8,
        borderRadius: 16,
    },
    title: {
        color: colors.green_dark,
        fontFamily: fonts.heading,
        marginVertical: 16,
    },
});

export default PlantCardPrimary;
