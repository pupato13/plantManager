import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Confirmation = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Confirmation</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 16,
    },
});

export default Confirmation;
