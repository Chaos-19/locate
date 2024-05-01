import { Marker, Tooltip } from "react-leaflet"
import { useAppSelector } from "../../app/hooks"
import { selectPointOnMap } from "./mapPointSlice"
import UpdateLocation from "@/components/UpdateLocation"
import Input from "@/components/Input"


const MapMarkers = () => {

    const points = useAppSelector(selectPointOnMap)
    /*  
    onst dispatch = useAppDispatch()
    const draw = useAppSelector((state) => state.ui.drawLine)
    */
    return (
        <>{
            points.map((point) => (
                <Marker
                    key={point.id}
                    position={point.coord as L.LatLng}
                >
                    <Tooltip direction="auto" offset={[0, 20]} opacity={1} permanent>
                        <p>{point.pointMataData.name}</p>
                        <p>lat : {point.coord.lat}</p>
                        <p>long : {point.coord.lng}</p>
                        <div className="relative">
                            <div className="hidden">
                                <Input />
                            </div>
                        </div>
                    </Tooltip>

                </Marker>
            ))
        }</>
    )
}

export default MapMarkers