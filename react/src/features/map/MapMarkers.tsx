import { Marker, Popup, Tooltip } from "react-leaflet"
import { useAppSelector } from "../../app/hooks"
import { pointOnMapType, selectPointOnMap } from "./mapPointSlice"
import UpdateLocation from "@/components/UpdateLocation"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { convertToDMS } from "@/utils"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"



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

    const [latitude, setLatitude] = useState<string>("")
    const [longitude, setLongitude] = useState<string>("")

    const [name, setName] = useState<string>("")

    useEffect(() => {
        setLatitude(point.coord.lat.toString())
        setLongitude(point.coord.lng.toString())
        setName(point.pointMataData.name)

    }, [])


    return (<Popup position={point.coord as L.LatLng} /* offset={[0, 20]} */ closeButton={false} autoClose={false} closeOnClick={false} maxWidth={250}  >
        {setEditeMode ? (
            <div className="flex flex-col justify-center w-max">
                {/*  <Input
                    type="text"
                    placeholder="lat"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)} />
                <Input
                    type="text"
                    placeholder="lng"
                    value={longitude}
                    onChange={(e) => {
                        setLongitude(e.target.value)
                        console.log(e.target.value);

                    }} /> */}
                <InputOTP maxLength={3}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    </InputOTPGroup>
                </InputOTP>
                <InputOTP maxLength={3}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    </InputOTPGroup>
                </InputOTP>
                <Input type="text" placeholder="LOCATION NAME" />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2.5 rounded" onClick={() => {
                    setsetEditeMode(!setEditeMode)
                    console.log(setEditeMode)
                }}>Edit</button>
            </div>

        ) :
            (<div className="flex flex-col justify-center">
                <p>{point.pointMataData.name}</p>
                <p className="text-sm">{convertToDMS(point.coord.lat)}</p>
                <p className="text-sm">{convertToDMS(point.coord.lng)}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2.5 rounded" onClick={() => {
                    setsetEditeMode(!setEditeMode)
                    console.log(setEditeMode)
                }}>Edit</button>
            </div>)
        }
    </Popup>)
}



export default MapMarkers