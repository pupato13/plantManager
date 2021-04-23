import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import loadingAnimation from "../../assets/load.json";

const Loading = () => {
    return (
        <View style={styles.container}>
            <LottieView
                source={loadingAnimation}
                autoPlay
                loop
                style={styles.animation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // padding: 16
    },
    animation: {
        backgroundColor: "transparent",
        width: 200,
        height: 200,
    },
});

export default Loading;
