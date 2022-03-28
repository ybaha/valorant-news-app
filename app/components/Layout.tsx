import {
  Box,
  Heading,
  View,
  StatusBar,
  IHeadingProps,
  KeyboardAvoidingView,
  Text,
} from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import PingIcon from "./PingIcon";
import ReanimatedSpinner from "./ReanimatedSpinner";
import Spinner from "./Spinner";

type ScreenLayoutProps = {
  headerText?: string;
  headerProps?: IHeadingProps;
  spinners?: boolean;
  py?: number;
  px?: number;
};

const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  headerText,
  children,
  headerProps,
  spinners,
  py,
  px,
}) => {
  return (
    <View style={styles.container} py={py} px={px}>
      {spinners && <ReanimatedSpinner />}
      <StatusBar backgroundColor={"black"} barStyle={"light-content"} />
      {headerText && (
        <Heading fontSize={36} color="gray.300" display="flex" {...headerProps}>
          <Text>{headerText}</Text>
          <PingIcon size={24} pl={24}></PingIcon>
        </Heading>
      )}
      <Box>{children}</Box>
      {spinners && <ReanimatedSpinner top={-300} left={1} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default ScreenLayout;
