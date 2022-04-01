import React, { useMemo } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

type CustomBackdropProps = {
  animatedIndex: Animated.SharedValue<number>;
  animatedPosition: Animated.SharedValue<number>;
  style: any;
  modalRef: React.RefObject<BottomSheet>;
  setModalOpen: (s: boolean) => void;
};

const CustomBackdrop = ({
  animatedIndex,
  style,
  modalRef,
  setModalOpen,
}: CustomBackdropProps) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "rgba(0,0,0,0.5)",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return (
    <Animated.View
      style={containerStyle}
      onTouchEnd={() => {
        modalRef?.current?.close();
        setModalOpen(false);
      }}
    />
  );
};

export default CustomBackdrop;
