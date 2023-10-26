import { useContext, useEffect, useState } from "react";
import Header from "../assets/components/Header";
import { Organization } from "../assets/types";
import { Link } from "react-router-dom";
import { useAppContext } from "../assets/context/appContext";
import CheckBoxListSecondary from "../assets/components/OrgList"

export default function CreateOrganization() {

    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const {user} = useAppContext()

    const [currentOrg, setCurrentOrg] = useState(user?.user.organizations?.[0])
    
    const eventStr = currentOrg ? `/${currentOrg.organization_id}/events` : "/events";
    const subStr = currentOrg ? `/${currentOrg.organization_id}/subscription` : "/subscription";
    const anaStr = currentOrg ? `/${currentOrg.organization_id}/analytics` : "/analytics";
    const orgStr = currentOrg ? `/${currentOrg.organization_id}/organization` : "/organization";

    const [orgList, setOrgList] = useState(user?.user.organizations)

    const test = user?.user.organizations?.[0]

    useEffect(()=> {

      console.log("this is orglist", orgList)

    }, [])

    return (
        <>
        <Header />
        <main>
         
        <h2> Valitse Seurakunta</h2>
          <CheckBoxListSecondary />
        
        <p><br></br></p>
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