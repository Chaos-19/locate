import Svg, { Line, Circle } from "react-native-svg";
import React, { useContext, useEffect, useState } from "react";

import { StyleSheet, Text, View } from "react-native";

import cordinateDistanceCalculator from "../cordinateDistanceCalculator";
import getDirectionAndAngle from "../getDirectionAndAngle";
import mapAngle from "../convertor";

import SIngleLocatore from "./SIngleLocatore";
import Descripiton from "./Descripiton";
import AddPoint from "./AddPoint";
import { useApp } from "../context/AppContext";
import { getOtherValues } from "../utils";

export default function Home() {
  const { addPoint, pointOnMap, pointDescription } = useApp();

  const [visiblity, setVisiblity] = useState(true);

  const handleVisiblity = () => setVisiblity(!visiblity);

  const [startPoint] = useState({
    latitude: 11.58222,
    longitude: 37.3860308,
  });
  const [endPoint, setEndPoint] = useState({
    latitude: 50,
    longitude: -50,       
  });

  
  return (
    <>
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
            startPoint={value.startPoint}
            endPoint={value.endPoint}
            {...getOtherValues(value.startPoint, value.endPoint)}
          />
        ))}
      </Svg>
      {pointDescription.map(
        (point, index) =>
          point.visible && (
            <Descripiton
              key={"id=" + index}
              distance={point.distance}
              angle={point.angle}
              direction={point.direction}
              startPoint={startPoint}
              endPoint={endPoint}
              setVisiblity={""}
              positionX={point.positionOnScreen.x}
              positionY={point.positionOnScreen.y}
            />
          )
      )}
      <AddPoint handleVisiblity={handleVisiblity} visiblity={visiblity} />
      <View style={styles.absoluteV}>
        <Text style={styles.absText}>
          start Lat {startPoint.latitude}, Lon {startPoint.longitude}
        </Text>
        <Text style={styles.absText}></Text>
        <Text onPress={handleVisiblity} style={styles.absTextChanger}>
          add location
        </Text>
      </View>
    </>
  );
}

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
});
