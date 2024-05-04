import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { selectPointOnMap, setConnectPoint } from "@/features/map/mapPointSlice"
import { useState } from "react"



const SelectConnect = ({ idNo }: { idNo: number }) => {

    const points = useAppSelector(selectPointOnMap)

    const dispatch = useAppDispatch()

    const [endPoint, setEndPoint] = useState<string>("")

    const handleConnect = () => {
        if (endPoint === "") return
        dispatch(setConnectPoint({
            startPoint: points.findIndex((point) => point.id === idNo),
            endPoint: Number(endPoint)
        }));
    }

    return (
        <div className="flex">
            <select
                value={endPoint}
                className="p-1 border"
                onChange={(e) => {
                    setEndPoint(e.target.value);
                }}  
                name="points"
                id="points"
                >
                {
                    points.map((point, index) => {
                        if (point.id !== idNo) {
                            return <option  key={point.id} value={index}>
                                {point.pointMataData.name}
                            </option>
                        }
                    })
                }
            </select>
            <button className="p-1 border " onClick={handleConnect}>Connect</button>
        </div>
    )
}

export default SelectConnect