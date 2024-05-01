import React from 'react'
import { Input } from './ui/input'

type Props = {}

const UpdateLocation = (props: Props) => {
    return (
        <div className="z-[999]">
            <Input type='text' placeholder="LOCATION NAME" />
        </div>
    )
}

export default UpdateLocation