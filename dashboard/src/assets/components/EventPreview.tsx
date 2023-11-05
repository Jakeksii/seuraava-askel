import { useState } from "react"
import { useAppContext } from "../context/appContext"
import { IEvent } from "../types"



export default function EventPreviw() {

    const { user } = useAppContext()

    const [orgList, setOrgList] = useState <IEvent[]>([])
        


    return (
        <div >
            <h4> Users organizations, components/EventPreview</h4>
        </div>
    )
}