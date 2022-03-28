import { View, Text } from "react-native";
import React from "react";
import MainContextProvider from "./store/mainContext";
import Navigation from "./Navigation";

const App = () => {
  return (
    // <MainContextProvider>
    <Navigation></Navigation>
    // </MainContextProvider>
  );
};

export default App;
