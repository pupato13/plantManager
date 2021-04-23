import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Avatar from "../../assets/diego.png";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

const Header = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greetings}>Hi,</Text>
                <Text style={styles.userName}>Diego</Text>
            </View>
            <Image style={styles.avatar} source={Avatar} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: getStatusBarHeight(),
    },
    greetings: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    userName: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40,
    },
    avatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
    },
});

export default Header;
