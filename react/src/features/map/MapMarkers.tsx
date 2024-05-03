import { Marker, Popup } from "react-leaflet"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { deletePointOnMap, pointOnMapType, selectPointOnMap, updataPointOnMapFromDMS } from "./mapPointSlice"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { encryptDMS, encryptDMSInput } from "@/utils"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { X } from "lucide-react"
import { isKeyExist } from "@/constants"



const MapMarkers = () => {
    const points = useAppSelector(selectPointOnMap)

    return points.map((point) => {
        return (
            <Marker
                key={point.id}
                position={point.coord as L.LatLng}>
                <CustomPopup {...{ point }} />
            </Marker>)
    })
}

const CustomPopup = ({
    point
}: {
    point: pointOnMapType
}) => {



    const [setEditeMode, setsetEditeMode] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [inputVal, setInputVal] = useState<string>("")

    useEffect(() => {
        setName(point.pointMataData.name)
        setInputVal(encryptDMSInput(point.coord.lat, point.coord.lng))
    }, [])

    const dispatch = useAppDispatch()

    const userLocation = useAppSelector((state) => state.map.userLocation)

    const isUserLocation = () => point.coord.lat === userLocation?.lat && point.coord.lng === userLocation?.lng

    function handleUpdate() {
        if (name !== "" && inputVal.length === 4) {
            if (isKeyExist(inputVal[0]) &&
                isKeyExist(inputVal[1]) &&
                isKeyExist(inputVal[2]) &&
                isKeyExist(inputVal[3])) {
                dispatch(updataPointOnMapFromDMS({ coord: inputVal, name, id: point.id }))
                setsetEditeMode(false)
            } else {
                alert("Invalid Input")
            }
        }
    }

    function handleDelete() {
        try {
            dispatch(deletePointOnMap(point.id))
        } catch (error) {
            alert("error")
        }
    }


    return (
        <Popup
            position={point.coord as L.LatLng}
            closeButton={false}
            autoClose={false}
            closeOnClick={false}
            maxWidth={250}  >
            {setEditeMode ? (
                <div className="flex flex-col justify-center w-max">
                    <InputOTP
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                        maxLength={4}
                        value={inputVal}
                        onChange={(e) => setInputVal(e)}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                        </InputOTPGroup>
                    </InputOTP>
                    <Input
                        type="text"
                        placeholder="LOCATION NAME"
                        value={name}
                        className="p-1 my-0.5 focus-visible:ring-0 focus-visible:border-black rounded-md w-[150px]"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="flex items-center gap-1">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2.5 rounded" onClick={handleUpdate}>Update</button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2.5 rounded" onClick={() => { setsetEditeMode(!setEditeMode) }}>
                            cancle
                        </button>
                    </div>
                </div>

            ) :
                (<div className="flex flex-col justify-center -space-y-1 relative">
                    {!isUserLocation() && <X color="red" className="mb-1" onClick={handleDelete} />}
                    <p>{point.pointMataData.name}</p>
                    <div className="flex items-center gap-1">
                        <p className="text-sm px-2 p-1 bg-slate-500 text-white">{encryptDMS(point.coord.lat) + " "}{encryptDMS(point.coord.lng)}</p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2.5 rounded" onClick={() => {
                            setsetEditeMode(!setEditeMode)
                        }}>Update</button>
                    </div>
                </div>)
            }
        </Popup>)
}



export default MapMarkers