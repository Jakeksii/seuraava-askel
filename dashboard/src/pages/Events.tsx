import { useContext, useEffect, useState } from "react";
import Header from "../assets/components/Header";
import { Link } from "react-router-dom";
import { useAppContext } from "../assets/context/appContext";



export default function Events() {


    const {user} = useAppContext()
    
    const [currentOrg, setCurrentOrg] = useState(user?.user.organizations?.[0])
    const eventStr = currentOrg ? `/${currentOrg.organization_id}/events/create-event` : "/events";


    useEffect(() => {

    }, [])

    return (
        <>
        <Header />
        <main>
        <h2 className="text-center p-2">Tapahtumat listattuna tähän</h2>
        <Link to={eventStr} className="btn-primary"> Tee tapahtuma </Link>
        </main>
        </>
    )
}