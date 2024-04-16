import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getDirectionAndAngle } from "../utils/helper";
import { AppContextValue, Line, Point, PointDiscription } from "./types";



const AppContext = createContext<AppContextValue | null>(null);

export interface newLine extends Line {
  name: string;
  hight: number;
}

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("No Context to get");
  return context;
};



const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [startLocation, setStartLocation] = useState<Point>({
    latitude: 11,
    longitude: 37.68
  })

  const [pointOnMap, setPointOnMap] = useState<newLine[]>([]);

  const [pointLength, setPointLength] = useState<{ length: number, lengthOnScreen: number, index: number }[]>([])

  const [newL, setNewL] = useState<typeof pointLength>([])

  const [pointDescription, setPointDescription] = useState<PointDiscription[]>([]);

  useEffect(() => {
    console.log("components Rerende ......");

  }, [pointOnMap, pointDescription, pointLength, newL])


  const addPoint = useCallback((startPoint: Point, endPoint: Point, name: string, hight: number) => {

    setPointOnMap([
      ...pointOnMap,
      {
        startPoint,
        endPoint,
        name,
        hight
      },

    ]);

    const { angle, distance, direction } = getDirectionAndAngle(startPoint.latitude, startPoint.longitude, endPoint.latitude, endPoint.longitude);

    setPointLength([
      ...pointLength,
      {
        length: distance,
        lengthOnScreen: window.innerWidth - 50,
        index: pointOnMap.length
      }
    ])


    const getLengthOnScre = (index: number) => {
      const width = window.innerWidth - 90;
      if (index == 0) return width;

      return (width * (1 - (index * 10 / 100)))
    }


    let newLengthPoint = pointLength.slice().sort((a, b) => b.length > a.length ? 1 : -1)

    setNewL([...newLengthPoint.map((value, index) => {
      return {
        length: value.length,
        lengthOnScreen: getLengthOnScre(index),
        index: value.index
      }
    })])

    setPointDescription([
      ...pointDescription,
      {
        visible: true,
        distance,
        direction,
        angle,
        position: {
          x: endPoint.longitude,
          y: endPoint.longitude,
        },
      },
    ]);

  }, [pointOnMap, pointLength, pointDescription]);





  return (
    <AppContext.Provider value={{
      startLocation,
      addPoint,
      pointOnMap,
      setPointOnMap,
      pointDescription,
      setPointDescription,
      pointLength,
      newL
    }} >
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, useApp };
