import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Animated from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { SvgFromUri } from "react-native-svg";

interface IPlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    };
    handleRemove: () => void;
}

const PlantCardSecondary: React.FC<IPlantProps> = ({
    data,
    handleRemove,
    ...rest
}) => {
    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton
                            style={styles.buttonRemove}
                            onPress={handleRemove}
                        >
                            <Feather
                                name="trash"
                                size={32}
                                color={colors.white}
                            />
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <RectButton style={styles.container} {...rest}>
                <SvgFromUri uri={data.photo} width={48} height={48} />
                <Text style={styles.title}>{data.name}</Text>
                <View style={styles.details}>
                    <Text style={styles.timeLabel}>Water at</Text>
                    <Text style={styles.time}>{data.hour}</Text>
                </View>
            </RectButton>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 8,
        paddingVertical: 24,
        borderRadius: 20,
        backgroundColor: colors.shape,
        marginVertical: 5,
    },
    title: {
        flex: 1,
        marginLeft: 8,
        fontFamily: fonts.heading,
        fontSize: 16,
        color: colors.heading,
    },
    details: {
        alignItems: "flex-end",
    },
    timeLabel: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_light,
    },
    time: {
        marginTop: 4,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark,
    },
    buttonRemove: {
        width: 100,
        height: 85,
        backgroundColor: colors.red,
        marginTop: 10,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        right: 20,
        // paddingRight: 16,
        paddingLeft: 16,
    },
});

export default PlantCardSecondary;
