import { KeyboardAvoidingView } from "native-base";
import React, { useEffect } from "react";

import { Text, View, StyleSheet, Keyboard } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from "react-native-reanimated";

type ReanimatedSpinnerProps = {
  top?: number;
  left?: number;
  duration?: number;
};

const ReanimatedSpinner: React.FC<ReanimatedSpinnerProps> = ({
  top,
  left,
  duration,
}) => {
  const rotation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);
  // TODO: is [rotation.value] needed?

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: duration || 15000,
        easing: Easing.linear,
      }),
      -1
    );
    return () => cancelAnimation(rotation);
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Animated.View
        style={[
          styles.spinner,
          animatedStyles,
          { top: top || -350, left: left || -300 },
        ]}
      />
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    zIndex: -1,
  },
  spinner: {
    height: 700,
    width: 700,
    position: "absolute",

    backgroundColor: "#323232",
    borderTopLeftRadius: 340,
    borderTopRightRadius: 357,
    borderTopStartRadius: 330,
    borderTopEndRadius: 348,
    borderBottomStartRadius: 370,
    borderBottomEndRadius: 360,
    borderBottomRightRadius: 345,
    borderBottomLeftRadius: 367,
  },
});
export default ReanimatedSpinner;
