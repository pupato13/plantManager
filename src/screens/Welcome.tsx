import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

const Welcome = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Manage your plants</Text>
            </View>
        </SafeAreaView>
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

export default Welcome;
