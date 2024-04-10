import { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useApp } from "../context/AppContext";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const AddPoint = ({ handleVisiblity, visiblity }) => {
  const { addPoint } = useApp();

  const [Latitude, setLatitude] = useState(null);
  const [Longitude, setLongitude] = useState(null);

  const updateEndPoint = () => {
    if (Latitude != null && Longitude != null) {
      let start = {
        latitude: 11.58222,
        longitude: 37.3860308,
      };
      let end = {
        latitude: parseFloat(Latitude),
        longitude: parseFloat(Longitude),
      };

      console.log("x :  y ", parseFloat(Longitude), parseFloat(Longitude));
      addPoint(start, end);
    }
    handleVisiblity();
  };

  return (
    <View style={[styles.inputsContainer, !visiblity && { display: "none" }]}>
      <Text style={styles.inputText}>Type destination point </Text>
      <TextInput
        onChangeText={(text) => {
          setLatitude(text);
        }}
        value={Latitude ? Latitude?.toString() : ""}
        placeholder="Enter Latitude"
        keyboardType="numeric"
        style={styles.inputButton}
      />
      <TextInput
        onChangeText={(text) => {
          setLongitude(text);
        }}
        value={Longitude ? Longitude?.toString() : ""}
        placeholder="Enter Longitude"
        keyboardType="numeric"
        style={styles.inputButton}
      />
      <Button title="Change" onPress={() => updateEndPoint()} />
      <Button title="Cancel" onPress={handleVisiblity} />
    </View>
  );
};

export default AddPoint;

const styles = StyleSheet.create({
  inputsContainer: {
    position: "absolute",
    top: "50%",
    left: "0%",
    width: screenWidth,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    gap: 10,
  },
  inputText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  inputButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 7,
    borderRadius: 10,
  },
});
