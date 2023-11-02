import { useState } from "react"
import { useAppContext } from "../context/appContext"
import { IEvent } from "../types"



export default function EventPreviw() {

    const { user } = useAppContext()

    const [orgList, setOrgList] = useState <IEvent[]>([])
        


    return (
        <div >
            <h1> Users organizations, components/EventPreview</h1>
        </div>
    )
}