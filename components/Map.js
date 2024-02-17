import { useState, useEffect, useContext } from 'react'
import MapView,
{
    Marker,
    Polyline,
    Callout
} from "react-native-maps";

import { View, Text, StyleSheet } from 'react-native'
import { ApplicationContext } from '../context/ContextProvider';


const Map = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);



    const { mapMarkers, addMarker } = useContext(ApplicationContext);

    // const addMarker = (event) => {
    //     console.log("add marker", event.nativeEvent.coordinate);
    //     setMarkers([...markers, event.nativeEvent.coordinate]);


    // };

    const handleAddMarker = (event) => {
        const latitudeIn = event.nativeEvent.coordinate.latitude;
        const longitudeIn = event.nativeEvent.coordinate.longitude;
        if (latitudeIn && longitudeIn) {
            addMarker("default marker",
                {
                    latitude: Number(latitudeIn),
                    longitude: Number(longitudeIn),
                })
        }
    }


    const [linePoint, setLinePoint] = useState([]);

    const [polylines, setPolylines] = useState([]);

    const handleLongPress = (event) => {
        setLinePoint([...linePoint, event.nativeEvent.coordinate]);
        console.log("long press");
        if (linePoint.length == 2) {
            console.log("add line", linePoint);
            setPolylines([...polylines, linePoint]);
            setLinePoint([]);
        }
    };

    const [longitudeIn, onChangeLongitudeIn] = useState(null);
    const [latitudeIn, onChangeLatitudeIn] = useState(null);

    useEffect(() => {
        console.log("Refrash.........", mapMarkers);
    }, [])



    return (
        <View>
            <MapView
                showsUserLocation
                followsUserLocation
                style={styles.map}
                initialRegion={
                    location && {
                        latitude: location.coords?.latitude,
                        longitude: location.coords?.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }
                }
                onDoublePress={handleAddMarker}
            >
                {[...mapMarkers].map((coordinate, index) => {
                 
                })}

                {/* {linePoint.length == 2 && (
                    <Polyline
                        coordinates={linePoint}
                        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeColors={["#7F0000"]}
                        strokeWidth={6}
                    ></Polyline>
                )} */}

                {polylines.map((line, index) => {
                    return (
                        <Polyline
                            key={index + "hdaghsdijfi"}
                            coordinates={line}
                            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                            strokeColors={["#7F0000"]}
                            strokeWidth={6}
                        ></Polyline>
                    );
                })}
            </MapView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});


export default Map