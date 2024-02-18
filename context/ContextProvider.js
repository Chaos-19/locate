import { createContext, useState } from "react";

export const ApplicationContext = createContext();

const ContextProvider = ({ children }) => {
  const [mapMarkers, setMapMarkers] = useState([]);

  const addMarker = (text, cords) => {
    if (mapMarkers.indexOf(cords) == -1) {
      setMapMarkers([
        ...mapMarkers,
        {
          info: text,
          cords: cords,
        },
      ]);
    }
  };
  const connectMarks = (latitudeIn, longitudeIn) => {
    if (latitudeIn && longitudeIn) {
      console.log(latitudeIn, longitudeIn);
    }
    console.log("connect");
  };

  return (
    <ApplicationContext.Provider value={{ mapMarkers, addMarker }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export default ContextProvider;
