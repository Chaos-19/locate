import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Input as InputName } from "./ui/input"
import { useState } from "react"
import { setPointOnMapFromDMS } from "@/features/map/mapPointSlice"
import { useAppDispatch } from "@/app/hooks"
import { isKeyExist, REGEXP_ONLY_DIGITS_AND_CHARS } from "@/constants"



const Input = () => {
    const [coord, setCoord] = useState<string>("");
    const [name, setName] = useState<string>("")

    const dispatch = useAppDispatch()

    const handleClick = () => {
        if (coord.length === 6 && name !== "") {

            if (isKeyExist(coord[0]) &&
                isKeyExist(coord[1]) &&
                isKeyExist(coord[2]) &&
                isKeyExist(coord[3]) &&
                isKeyExist(coord[4]) &&
                isKeyExist(coord[5])) {
                dispatch(setPointOnMapFromDMS({ coord, name }))
                setName("")
                setCoord("")
            } else {
                alert("Invalid Input")
            }
        }
    }

    return (
        <div className="fixed top-2 translate-x-[-50%] left-[50%] z-[999] bg-secondary border-2 border-primary rounded-md px-0.5">
            <InputOTP pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                maxLength={6}
                onChange={(e) => {
                    setCoord(e)
                }}
                value={coord}
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                </InputOTPGroup>
                <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                </InputOTPGroup>
                <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
            <div className="flex items-center gap-2">
                <InputName
                    type="text"
                    placeholder="LOCATION NAME"
                    className="p-1 my-0.5 focus-visible:ring-0 focus-visible:border-black rounded-md w-[150px]"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <button className="p-2 px-4 text-white bg-blue-500 hover:bg-blue-700 border rounded-md" onClick={handleClick}>Add</button>
            </div>
        </div>
    )
}

export default Input