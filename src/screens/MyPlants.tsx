import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MyPlants = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>MyPlants</Text>
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

export default MyPlants;
