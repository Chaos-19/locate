import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Alert,
  View,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { getDistance } from "geolib";
import MapView, { Marker, Polyline, Callout } from "react-native-maps";



import SearchBar from "./components/SearchBar";
import BottomBar from "./components/BottomBar";

import Map from './components/Map.1';

import ContextProvider from "./context/ContextProvider";



export default function App() {
  const { width, height } = Dimensions.get("window");

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [markers, setMarkers] = useState([]);


  const [input, onChangeInput] = useState("");

  const addMarker = (event) => {
    // setMarkers([...markers, event.nativeEvent.coordinate]);
  };


  const [longitudeIn, onChangeLongitudeIn] = useState(null);
  const [latitudeIn, onChangeLatitudeIn] = useState(null);

  const addLocation = () => {
    if (latitudeIn && longitudeIn) {
      console.log("add");
      setMarkers([
        ...markers,
        {
          latitude: parseFloat(latitudeIn),
          longitude: parseFloat(longitudeIn),
        },
      ]);
    }
  };

  return (
    <ContextProvider>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.container}>
          <SearchBar
            input={input}
            onChangeInput={onChangeInput}
          />
          <Map />
        </View>
        <BottomBar
          height={height}
        />
      </KeyboardAvoidingView>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
