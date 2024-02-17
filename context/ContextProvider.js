import { createContext, useState } from "react";

export const ApplicationContext = createContext()


const ContextProvider = ({ children }) => {

    const [mapMarkers, setMapMarkers] = useState([])


    const addMarker = (text, cords,) => {
        setMapMarkers([...mapMarkers,{
            info: text,
            cords: cords,}
        ])
    }


    return (
        <ApplicationContext.Provider value={{ mapMarkers, addMarker }}>
            {children}
        </ApplicationContext.Provider>
    )
}

export default ContextProvider