import { Button, StyleSheet, Text, View } from "react-native";

const Descripiton = ({
  distance,
  angle,
  direction,
  startPoint,
  endPoint,
  setVisiblity,
  positionX,
  positionY,
}) => {
 

  //an angle of {angle}&deg; to {direction}{" "} direction;
  return (
    <View style={[styles.absoluteV, { left: positionX, top: positionY }]}>
      <Text style={styles.absText}>Distance: {distance} km at</Text>
      <Text style={styles.absText}>at an angle of {angle}&deg;</Text>
      <Text style={styles.absText}>to {direction} direction</Text>
    </View>
  );
};

export default Descripiton;

const styles = StyleSheet.create({
  absoluteV: {
    position: "absolute",
    backgroundColor: "#fff", //#ffffff55
    bottom: 10,
    left: 10,
    borderRadius: 4,
    gap: 10,
    paddingVertical: 10,
    height: 100,
  },
  absText: {
    color: "black",
    fontSize: 13,
    paddingHorizontal: 10,
  },
  absTextChanger: {
    color: "white",
    fontSize: 12,
    backgroundColor: "#888",
    padding: 10,
  },
  hidde: {
    backgroundColor: "#000",
    color: "#fff",
    font: 13,
    fontWeight: "400",
  },
  hiddeBtn: {
    borderWidth: 2,
    borderColor: "#fff",
    padding: 3,
  },
});
