import { StyleSheet, Text, View, TextInput } from "react-native";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import { Callout } from "react-native-maps";
import { useState } from "react";

const MarkerInfo = ({ text }) => {
  const [handleClick, setHandleClick] = useState(false);

  return (
    <Callout
      style={styles.plainView}
      onPress={() => console.log("nativeEvent")}
    >
      <View style={styles.container}>
        <View style={styles.editePan}>
          <Ionicons
            onPress={() => console.log("edit")}
            name="add-sharp"
            size={24}
            color="black"
          />
          <Feather name="edit" size={24} color="black" />
        </View>
        <Text>{text}</Text>
      </View>
    </Callout>
  );
};

export default MarkerInfo;

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 110,
    padding: 5,
  },
  editePan: {
    flexDirection: "row",
    justifyContente: "flex-end",
    gap: 10,
  },
  input: {
    flexGrow: 2,
    height: "100%",
    paddingVertical: 10,
    fontSize: 20,
  },
});
