import { View } from "react-native";
import Svg, { Line, Circle } from "react-native-svg";
import SIngleLocatore from "./SIngleLocatore";
import { useApp } from "../context/AppContext";

const Map = () => {
  const { pointOnMap } = useApp();

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%">
        {/* Draw latitude line */}
        <Line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="#333"
          strokeWidth="0.7"
        />
        {/* Draw longitude line/ Vertical */}
        <Line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="#333"
          strokeWidth="0.7"
        />

        {pointOnMap.map((value, index) => (
          <SIngleLocatore
            key={index}
            startPoint={startPoint}
            endPoint={endPoint}
            {...getOtherValues(value.startPoint, value.endPoint)}
          />
        ))}
      </Svg>
    </View>
  );
};

export default Map;

const styles = StyleSheetList.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});
