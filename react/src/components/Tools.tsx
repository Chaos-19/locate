import { MapPin, Pencil, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectPointOnMap, setConnectPoint, setPointOnMap, setUserLocation } from "../features/map/mapPointSlice"
import { useMap } from "react-leaflet"
import Input from "./Input"


const Tools = () => {

    const [isOpen, setisOpen] = useState<boolean>(false);
    const [isOpenDraw, setIsOpenDraw] = useState<boolean>(false);


    const [longtiude, setLongtiude] = useState<string>("")
    const [latitude, setLatitude] = useState<string>("")
    const [name, setName] = useState<string>("")

    const dispatch = useAppDispatch()

    const points = useAppSelector(selectPointOnMap)
    const userLocation = useAppSelector((state) => state.map.userLocation)

    const handleClick = () => {
        dispatch(setPointOnMap({
            coord: {
                lat: Number(latitude),
                lng: Number(longtiude)
            },
            pointMataData: {
                name: name
            }
        }))

        setLongtiude("")
        setLatitude("")
        setName("")
        setisOpen(false)
    }

    const [start, setStart] = useState<string>("")
    const [destination, setDestination] = useState<string>("")



    const handleConnect = () => {

        if (start !== "" && destination !== "") {
            dispatch(setConnectPoint({
                startPoint: Number(start),
                endPoint: Number(destination)
            }))
        }
        setStart("")
        setDestination("")
    }

    const map = useMap()

    const [isLocationSet, setIsLocationSet] = useState<boolean>(false)


    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {

            if (!isLocationSet && userLocation?.lat === 0 && userLocation?.lng === 0) {

                map.flyTo([position.coords.latitude, position.coords.longitude], 13)

                dispatch(setUserLocation({
                    lat: position.coords.latitude, lng: position.coords.longitude
                }))
                alert(`${position.coords.latitude + "  ::  " + position.coords.longitude}`);

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
        }, (error) => {
            alert(error.message)
        });

    }, [])


    return (
        <div className="z-[999] w-max flex flex-col justify-center fixed top-24 left-3.5 border-2 border-gray-400 bg-white rounded-md  divide-y-2">
            <Input />
            <div className="p-1 relative  divide-y-2 divide-red-700" >
                <Plus size={20} onClick={() => setisOpen(!isOpen)} />
                {isOpen &&
                    (<div className="absolute top-full left-full p-2 border bg-black z-50 rounded-md">
                        <div className="p-1 flex flex-col gap-1">
                            <input
                                type="text"
                                className="p-1 border rounded-md"
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                                placeholder="latitude"
                            />
                            <input type="text"
                                className="p-1 border rounded-md"
                                value={longtiude}
                                onChange={(e) => setLongtiude(e.target.value)}
                                placeholder="longtiude"
                            />
                            <input type="text"
                                className="p-1 border rounded-md"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="mark name"
                            />
                            <button className="p-1 border rounded-md text-white mt-5" onClick={handleClick}>Add</button>
                        </div>
                    </div>)}
            </div>
            <div className="p-1">
                <Pencil
                    size={18}
                    color={isOpenDraw ? "red" : "black"}
                    onClick={() => setIsOpenDraw(!isOpenDraw)}
                />
                {
                    isOpenDraw &&
                    <div className="absolute top-full left-full p-2 border bg-black z-50 rounded-md w-max">
                        <div className="p-1 flex flex-col gap-1">
                            <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={start}
                                onChange={(e) => setStart((e.target.value))}
                            >
                                <option selected>Start point</option>
                                {points.length > 0 && points.map((point, index) => (
                                    <option value={index}>{point.pointMataData.name}</option>
                                ))}
                            </select>
                            <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={destination}
                                onChange={(e) => setDestination((e.target.value))}
                            >
                                <option selected> End point</option>
                                {points.length > 0 && points.map((point, index) => (
                                    <option value={index}>{point.pointMataData.name}</option>
                                ))}
                            </select>
                            <button className="p-1 border rounded-md text-white mt-5" onClick={handleConnect}>connect</button>
                        </div>
                    </div>
                }
            </div>
            <div className="p-1">
                <MapPin size={18}
                    color={isOpenDraw ? "red" : "black"}
                    aria-disabled={isLocationSet}
                    onClick={() => {
                        navigator.geolocation.getCurrentPosition((position) => {
                            if (userLocation?.lat == 0 && userLocation?.lng == 0) {
                                setIsLocationSet(true)
                                dispatch(setUserLocation({
                                    lat: position.coords.latitude, lng: position.coords.longitude
                                }))
                                alert(`${position.coords.latitude + "  ::  " + position.coords.longitude}`);

                                map.flyTo([position.coords.latitude, position.coords.longitude], map.getZoom())
                                dispatch(setPointOnMap({
                                    coord: {
                                        lat: position.coords.latitude, lng: position.coords.longitude
                                    },
                                    pointMataData: {
                                        name: 'YOU LOCATIOON'
                                    }
                                }))
                            }
                            map.flyTo([11.49, 38.08], map.getZoom())

                        }, (error) => {
                            alert(error.message)
                        });
                    }}
                />
            </div>
            <div>

            </div>
        </div>
    )
}

export default Tools