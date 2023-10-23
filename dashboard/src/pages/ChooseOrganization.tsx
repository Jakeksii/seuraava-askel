import { useContext, useEffect, useState } from "react";
import Header from "../assets/components/Header";
import { Organization } from "../assets/types";
import { Link } from "react-router-dom";
import { userInfo } from "os";
import { useAppContext } from "../assets/context/appContext";

export default function CreateOrganization() {

    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const {user} = useAppContext()

    const [currentOrg, setCurrentOrg] = useState(user?.user.organizations?.[0])
    
    const eventStr = currentOrg ? `/${currentOrg.organization_id}/events` : "/events";
    const subStr = currentOrg ? `/${currentOrg.organization_id}/subscription` : "/subscription";
    const anaStr = currentOrg ? `/${currentOrg.organization_id}/analytics` : "/analytics";
    const orgStr = currentOrg ? `/${currentOrg.organization_id}/organization` : "/organization";


    useEffect(()=> {


    }, [])

    return (
        <>
        <Header />
        <main>
        <ul>
        {organizations.map((org) => (
          <li key={org._id}>
            {org.name} (ID: {org._id})
            {/* Render additional organization fields as needed */}
          </li>
        ))}
      </ul>
        <Link to="/chooseorganization" className="btn-primary"> Valitse seurakunta </Link>
        <p>^Tää näytetään vaan navissa</p>
        <Link to="/join-organization" className="btn-primary"> Liity seurakuntaan </Link>
        <p><br></br></p>
        <Link to="/Create" className="btn-primary"> Uusi seurakunta </Link>
        <p><br></br></p>
        <Link to={anaStr} className="btn-primary"> Analytiikka </Link>
        <p><br></br></p>
        <Link to={subStr} className="btn-primary"> Tiimi ja tilaus </Link>
        <p><br></br></p>
        <Link to={eventStr} className="btn-primary"> Tapahtumat </Link>
        <p><br></br></p>
        <Link to={orgStr} className="btn-primary"> Muokkaa Seurakuntaa  (tätä ei oo vielä tehty)</Link>
        
        </main>

        </>
    )
}