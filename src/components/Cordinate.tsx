
import { MapPin } from "lucide-react";
import { cn } from "../utils"
import { useApp } from "../context/AppContext";
import { Point } from "../context/types";
import { getDirectionAndAngle, getMatchValue } from "../utils/helper";



const Line = ({ length, end }: {
    length: number | string;
    //angle: number | string;
    end: Point;

}) => {

    const { pointOnMap } = useApp();

    console.log("Length : ", length);

    const value = getMatchValue(end, pointOnMap);

    const { angle: angle2, distance } = getDirectionAndAngle(value.startPoint.latitude, value.startPoint.longitude, value.endPoint.latitude, value.endPoint.longitude);


    return (
        <div className="absolute w-1 h-1 rounded-full top-2/4 left-2/4">
            <div className={cn(
                'absolute w-[2px] bg-red-800 origin-top',
            )
            } style={{
                height: `${length}px`,
                transform: `rotate(${angle2}deg)`
            }}>
                <p className="origin-center absolute -left-7 top-2/4 z-50 rotate-90 w-max text-red-500 bg-black">{Math.round(distance)} km</p>
                <div className={`absolute rotate-180 -bottom-4 -left-[550%] z-40`} >
                    <MapPin size={24} />
                    <p className="w-max text-red-500 absolute -top-5 border border-gray-900 rounded-md rotate-180">{value.name}</p>
                </div>
            </div>
        </div>
    )
}


const Cordinate = () => {

    const { pointOnMap, newL } = useApp();

    console.table(newL);


    return (
        <div className="w-[100vw] h-[100vh] relative border-4 border-green-700">
            <div className="fixed top-1 left-0 ps-2 pt-1">
                <h1 className="text-3xl">Cordinate</h1>
                <p>latitude : 11.5</p>
                <p>Longtiude : 37.5</p>
            </div>
            <div className="absolute w-[1px] top-0 left-2/4 bottom-0  bg-black" />
            <div className="absolute h-[1px] top-2/4 left-0 right-0  bg-black" />
            {pointOnMap.map((singleP, index) => {
                const pos = newL.findIndex((value) => {
                    if (value.index === index) return true
                });

                console.log(`Pos : ${index}  `, pos);

                return <Line key={index} length={Boolean(newL[pos]) ? newL[pos]?.lengthOnScreen : ((window.innerWidth - 90) * (1 - (index * 10 / 100)))} end={singleP.endPoint} />
            })}

        </div>
    )
}

export default Cordinate