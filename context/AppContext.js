import { createContext, useContext, useState } from "react";
import cordinateDistanceCalculator from "../cordinateDistanceCalculator";
import mapAngle from "../convertor";
import getDirectionAndAngle from "../getDirectionAndAngle";

const AppContext = createContext();

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("No Context to get");
  return context;
};

const AppContextProvider = ({ children }) => {
  const [pointOnMap, setPointOnMap] = useState([]);

  const [pointDescription, setPointDescription] = useState([]);

  const addPoint = (startPoint, endPoint) => {
    setPointOnMap([
      ...pointOnMap,
      {
        startPoint,
        endPoint,
      },
    ]);

    const { direction, angle } = getDirectionAndAngle(startPoint, endPoint);

    setPointDescription([
      ...pointDescription,
      {
        visible: true ,
        distance: cordinateDistanceCalculator(
          mapAngle(startPoint.latitude),
          mapAngle(startPoint.longitude),
          mapAngle(endPoint.latitude),
          mapAngle(endPoint.longitude)
        ),
        direction,
        angle,
        startPoint,
        endPoint,
        positionOnScreen: {
          x: endPoint.longitude,
          y: endPoint.longitude,
        },
      },
    ]);
  };

  return (
    <AppContext.Provider
      value={{ addPoint, pointOnMap, pointDescription, setPointDescription }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, useApp };
