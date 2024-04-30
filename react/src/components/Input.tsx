import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import { Input as InputName } from "@/components/ui/input"


type Props = {}

const Input = (props: Props) => {
    return (
        <div className="fixed top-2 translate-x-[-50%] left-[50%] z-[999] bg-secondary border-2 border-primary rounded-md">
            <InputOTP maxLength={6}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
            <InputName type="text" placeholder="LOCATION NAME" />
        </div>
    )
}

export default Input