import { Line, Circle } from "react-native-svg";
import mapAngle from "../convertor";
import { Dimensions, View } from "react-native";
import { useState } from "react";
import { useApp } from "../context/AppContext";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export const isEqual = (pointOne, pointTwo) => {
  return (
    pointOne.latitude === pointTwo.latitude &&
    pointOne.longitude === pointTwo.longitude
  );
};

const SIngleLocatore = ({
  startPoint,
  endPoint,
  horizontalInitial,
  horizontalEnd,
  verticalInitial,
  verticalEnd,
}) => {
  const [toggle, setToggle] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const { pointDescription, setPointDescription } = useApp();

  const handleVisiblity = () => {
    const itmeIndex = pointDescription.findIndex((value) =>
      isEqual(value.endPoint, endPoint)
    );

    console.log("Press");

    const oldItem = pointDescription[itmeIndex];

    let newItem = {
      ...oldItem,
      visible: !oldItem.visible,
    };

    const newPontDiscription = pointDescription.filter(
      (value, index) => index !== itmeIndex
    );

    setPointDescription([...newPontDiscription, newItem]);
  };

  return (
    <View
      style={{
        position: "relative",
      }}
    >
      {/* Actual coordinates */}
      <Line
        onPress={handleVisiblity}
        x1={`${mapAngle(startPoint.latitude)}%`}
        y1={`${mapAngle(startPoint.longitude)}%`}
        x2={`${mapAngle(endPoint.latitude)}%`}
        y2={`${mapAngle(endPoint.longitude)}%`}
        stroke="gray"
        strokeWidth="3"
      />

      {/* Destionation point */}
      <Circle
        onPress={(e) => {
          // setVisiblity(true);
          let point = e.nativeEvent;

          setToggle(!toggle);

          setPosition({
            x: Math.max(
              0,
              Math.min(screenWidth - 150, Number(point.locationX))
            ),
            /* Number(point.locationX) > screenWidth
                ? Number(point.locationX) - 300
                : Number(point.locationX), */
            //Math.max(0, Math.min(screen.width - componentWidth, event.nativeEvent.locationX));
            // const newY = Math.max(0, Math.min(screen.height - componentHeight, event.nativeEvent.locationY));

            y: Math.max(
              0,
              Math.min(screenHeight - 150, Number(point.locationY))
            ),
            /* Number(point.locationY) > screenHeight
                ? Number(point.locationY) - 150
                : Number(point.locationY), */
          });
          console.log("==== Hithere ===");
          console.log(position.x, position.y);

          const itmeIndex = pointDescription.findIndex((value) =>
            isEqual(value.endPoint, endPoint)
          );

          const oldItem = pointDescription[itmeIndex];

          let newItem = {
            ...oldItem,
            positionOnScreen: position,
            visible: toggle,
          };

          const newPontDiscription = pointDescription.filter(
            (value, index) => index !== itmeIndex
          );
          setPointDescription([...newPontDiscription, newItem]);
        }}
        cx={`${mapAngle(endPoint.latitude)}%`}
        cy={`${mapAngle(endPoint.longitude)}%`}
        r="10"
        fill="red"
      />

      {/* Relative horizontal */}
      <Line
        onPress={handleVisiblity}
        x1={`${mapAngle(horizontalInitial.latitude)}%`}
        y1={`${mapAngle(horizontalInitial.longitude)}%`}
        x2={`${mapAngle(horizontalEnd.latitude)}%`}
        y2={`${mapAngle(horizontalEnd.longitude)}%`}
        stroke="#555"
        strokeWidth="2"
      />

      {/* Relative horizontal */}
      <Line
        onPress={handleVisiblity}
        x1={`${mapAngle(verticalInitial.latitude)}%`}
        y1={`${mapAngle(verticalInitial.longitude)}%`}
        x2={`${mapAngle(verticalEnd.latitude)}%`}
        y2={`${mapAngle(verticalEnd.longitude)}%`}
        stroke="#555"
        strokeWidth="2"
      />
    </View>
  );
};

export default SIngleLocatore;
