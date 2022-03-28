import { Box } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from "react-native-reanimated";

type PingIconProps = {
  duration?: number;
  size?: number;
  style?: any;
  pl?: number;
};

const PingIcon: React.FC<PingIconProps> = ({ duration, size, style, pl }) => {
  const scale = useSharedValue(0);
  const scaleReverse = useSharedValue(3);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: scaleReverse.value,
      height: size || 36,
      width: size || 36,
    };
  });
  const animatedStyleReverse = useAnimatedStyle(() => {
    return {
      width: (size && size / 2) || 20,
      height: (size && size / 2) || 20,
      opacity: 1,
      position: "absolute",
    };
  });

  const fonksiyon = () => {
    let a = 123;
  };

  React.useEffect(() => {
    // from 1 to 1.2
    scale.value = withRepeat(
      withTiming(1, { duration: duration || 1000, easing: Easing.linear }),
      -1,
      false
    );
    scaleReverse.value = withRepeat(
      withTiming(0, { duration: duration || 1000, easing: Easing.ease }),
      -1,
      false
    );

    return () => {
      cancelAnimation(scale);
      cancelAnimation(scaleReverse);
    };
  }, []);

  return (
    <Box
      style={{
        position: "relative",
        width: size || 40,
        height: size || 40,
        paddingLeft: pl,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      <Animated.View style={[styles.ping, animatedStyle]}></Animated.View>
      <Box
        style={{
          position: "absolute",
          width: (size && size / 2) || 20,
          height: (size && size / 2) || 20,
          paddingLeft: pl ? pl + (size || 40) / 2 : 0,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Animated.View
          style={[styles.ping, animatedStyleReverse]}
        ></Animated.View>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  ping: {
    backgroundColor: "red",
    borderRadius: 100,
  },
});

export default PingIcon;
