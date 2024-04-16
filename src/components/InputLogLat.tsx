import { ChangeEvent, useEffect, useState } from "react"
import { useApp } from "../context/AppContext";
import { haversineDistance } from "../utils/helper";

const InputLogLat = () => {

    const [visible, setvisible] = useState<boolean>(false)

    const { startLocation, pointDescription, addPoint, pointOnMap, setPointOnMap } = useApp();

    const [latitude, setLatitude] = useState<string>('');
    const [longitude, setLongtiude] = useState<string>('')
    const [locName, setLocName] = useState<string>('')


    const handleAddPoint = () => {
        if (latitude == "" && longitude == "" && locName == "") return;


        else {
      

            /*  
 
             let hight = 0;
             if (pointOnMap.length <= 0) {
 
                 hight = window.innerWidth - 90;
             } else {
                 const distNew = haversineDistance(11, 37.68, Number(latitude), Number(longitude));
                 pointOnMap.forEach((singleP, index, arr) => {
                     const dist = haversineDistance(singleP.startPoint.latitude, singleP.startPoint.longitude, singleP.endPoint.latitude, singleP.endPoint.longitude)
 
                     if (distNew > dist) {
                         setPointOnMap([...pointOnMap.filter((_, indexN) => indexN !== index), {
                             ...arr[index],
                             hight: arr[index].hight * (25 / 100)
                         }])
 
                         hight = window.innerWidth - 90
                     }
                 })
                 hight = pointOnMap[0].hight * (45 / 100)
             } */

            addPoint({
                latitude: 11,
                longitude: 37.68
            }, {
                latitude: Number(latitude),
                longitude: Number(longitude)
            },
                locName,
                window.innerWidth - 90

            )



            setLatitude("");
            setLongtiude("");
            setLocName("");
        }
    }

    return (
        <div className="fixed bottom-4 left-2 min-h-28">

            <button
                onClick={() => setvisible(!visible)}
                className={`${visible ? 'hidden' : 'z-50 flex'} p-3 rounded-full bg-black text-white`}>add</button>

            <div className={`${visible ? 'flex flex-col gap-2' : 'hidden'}`}>
                <input
                    type="text"
                    value={latitude}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setLatitude(e.target.value)}
                    placeholder="Longtiude"
                    className="border border-gray-600 p-1  rounded-lg placeholder:text-black"

                />

                <input
                    type="text"
                    value={longitude}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setLongtiude(e.target.value)}
                    placeholder="Latitude"
                    className="border border-gray-600 p-1 rounded-lg placeholder:text-black"
                />
                <input
                    type="text"
                    value={locName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setLocName(e.target.value)}
                    placeholder="Name"
                    className="border border-gray-600 p-1 rounded-lg placeholder:text-black"

                />
                <button className="w-full py-3 text-xs px-1 rounded-lg bg-black text-white" onClick={handleAddPoint}>Add Location</button>
                <button onClick={() => setvisible(!visible)} className="w-full py-3 text-xs px-1 rounded-lg bg-red-500 text-white">hidde</button>
            </div>
        </div>
    )
}

export default InputLogLat