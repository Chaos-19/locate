import { MapPin } from "lucide-react"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { setPointOnMap, setUserLocation, updatePonitMap } from "../features/map/mapPointSlice"
import { useMap } from "react-leaflet"
import Input from "./Input"



const Tools = () => {

    const dispatch = useAppDispatch()
    const userLocation = useAppSelector((state) => state.map.userLocation)
    const pointOnMap = useAppSelector((state) => state.map.pointOnMap)
    const map = useMap()
    const [isLocationSet, setIsLocationSet] = useState<boolean>(false)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {

            if (!isLocationSet && userLocation?.lat === 0 && userLocation?.lng === 0) {
                dispatch(setUserLocation({
                    lat: position.coords.latitude, lng: position.coords.longitude
                }))

                dispatch(setPointOnMap({
                    coord: {
                        lat: position.coords.latitude, lng: position.coords.longitude
                    },
                    pointMataData: {
                        name: 'YOUR LOCATION'
                    }
                }))
                setIsLocationSet(true)
            }

            map.flyTo([position.coords.latitude, position.coords.longitude], 13)

        }, (error) => {
            alert(error.message)
        });
    }, [])


    return (
        <div className="z-[999] w-max flex flex-col justify-center fixed top-24 left-3.5 border-2 border-gray-400 bg-white rounded-md  divide-y-2">
            <Input />
            <div className="p-1">
                <MapPin size={18}
                    color={isLocationSet ? "green" : "gray"}
                    aria-disabled={isLocationSet}
                    onClick={() => {
                        map.flyTo([userLocation?.lat as number, userLocation?.lng as number], 13)
                        navigator.geolocation.getCurrentPosition((position) => {
                            dispatch(setUserLocation({
                                lat: position.coords.latitude, lng: position.coords.longitude
                            }))

                            if (pointOnMap.findIndex((point) => point.coord.lat === position.coords.latitude && point.coord.lng === position.coords.longitude) === -1) {

                                dispatch(setPointOnMap({
                                    coord: {
                                        lat: position.coords.latitude, lng: position.coords.longitude
                                    },
                                    pointMataData: {
                                        name: 'YOUR LOCATION'
                                    }
                                }))
                            } else {

                                dispatch(updatePonitMap({
                                    coord: {
                                        lat: position.coords.latitude,
                                        lng: position.coords.longitude
                                    },
                                    pointMataData: {
                                        name: 'YOUR LOCATION'
                                    }
                                }))
                            }

                        }, (error) => {
                            alert(error.message)
                        }, { enableHighAccuracy: true });
                    }}
                />
            </div>
        </div>
    )
}

export default Tools