import { useEffect, useState } from "react";
import Header from "../assets/components/Header";
import { useAppContext } from "../assets/context/appContext";
import { Organization } from "../assets/types";


const JoinOrganization = () => {

    const {organization} = useAppContext()

    const [orgList, setOrgList] = useState([{}])

    // fetchaa kaikki organisaatio nimet, jotta voi tietää mihin
    // liittyä?

    useEffect(() => {

        
        const fetchOrgNames = async() => {

            const response = await fetch("api/organizations/organizations/all")
            console.log(JSON.stringify(response))
            if(response.ok)
            {
            sessionStorage.setItem('organization_names', JSON.stringify(response))

            }
            
            

        }

        fetchOrgNames()


    }, [])

    return ( 
        <div>
        <Header />

            <h1> Choose organization to join ?</h1>
            <p> Owner will add you</p>
        </div>
     );
}
 
export default JoinOrganization;