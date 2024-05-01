import React from 'react'
import { Input } from './ui/input'

type Props = {}

const UpdateLocation = (props: Props) => {
    return (
        <div className="absolute -top-full left-2/4 z-[999]">
            <Input type='text' placeholder="LOCATION NAME" />
        </div>
    )
}

export default UpdateLocation