import Svg, { Line, Circle } from "react-native-svg";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import cordinateDistanceCalculator from "./cordinateDistanceCalculator";
import getDirectionAndAngle from "./getDirectionAndAngle";
import mapAngle from "./convertor";
import { AppContextProvider } from "./context/AppContext";

import Home from "./components/Home";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function App() {

  return (
    <AppContextProvider>
      <View style={styles.container}>
        <Home />
      </View>
    </AppContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    width: screenWidth,
    height: screenHeight,
    overflow: "scroll",
    flex: 1,
  },
 
});
