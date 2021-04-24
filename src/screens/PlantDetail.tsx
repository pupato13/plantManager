import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SvgFromUri } from "react-native-svg";

import waterdrop from "../assets/waterdrop.png";
import Button from "../components/Button";

const PlantDetail = () => {
    return (
        <>
            <View style={styles.container}>
                <SvgFromUri uri="" height={150} width={150} />
                <Text style={styles.plantName}>Plant Name</Text>
                <Text style={styles.plantDetail}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore molestias qui laborum omnis, et repellendus aliquam
                    sint dolor sunt tempora iusto at asperiores debitis
                    excepturi tempore autem dicta, impedit suscipit.
                </Text>
            </View>
            <View style={styles.controller}>
                <View style={styles.tipContainer}>
                    <Image source={waterdrop} style={styles.tipImage} />
                    <Text style={styles.tipText}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </Text>
                </View>
                <Text style={styles.alertLabel}>
                    Choose the best time to be remembered
                </Text>

                <Button text="Save Plant" onPress={() => {}} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    plantName: {
        fontSize: 16,
    },
    plantDetail: {
        fontSize: 16,
    },
    controller: {},
    tipContainer: {},
    tipImage: {},
    tipText: {},
    alertLabel: {},
});

export default PlantDetail;
