import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Avatar from "../../assets/diego.png";
import { UserNameKey } from "../../types/asyncStorageKeys";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

const Header = () => {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem(UserNameKey);

            setUserName(user || "");
        }

        loadStorageUserName();
    }, [userName]);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greetings}>Hi,</Text>
                <Text style={styles.userName}>{userName}</Text>
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
