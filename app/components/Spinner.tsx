import { Box, Spinner as NBSpinner, View } from "native-base";
import React from "react";
import { Animated } from "react-native";

type SpinnerProps = {
  infinite?: boolean;
  fromDeg: string;
  toDeg: string;
  duration: number;
  style?: any;
};

const Spinner: React.FC<SpinnerProps> = ({
  infinite,
  fromDeg,
  toDeg,
  duration,
  style,
}) => {
  const [rotateAnimation, setRotateAnimation] = React.useState(
    new Animated.Value(0)
  );

  const handleAnimation = () => {
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start(() => {
      rotateAnimation.setValue(0);
      handleAnimation();
    });
  };

  const f = fromDeg || "0deg",
    t = toDeg || "360deg";

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [f, t],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
  };

  React.useEffect(() => {
    handleAnimation();
  }, []);

  return (
    <Animated.View
      style={{
        ...animatedStyle,
        backgroundColor: "red",
        width: 24,
        height: 24,
        borderTopLeftRadius: 17,
        borderTopRightRadius: 176,
        borderTopStartRadius: 300,
        borderTopEndRadius: 244,
        borderBottomStartRadius: 144,
        borderBottomEndRadius: 312,
        borderBottomRightRadius: 123,
        borderBottomLeftRadius: 333,
        zIndex: -123,
        ...style,
      }}
    ></Animated.View>
  );
};

export default Spinner;
