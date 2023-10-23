import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

const OrganizationPreview = () => {

    const {organization} = useAppContext()
    const {user} = useAppContext()

    useEffect(() => {
        // chop the current organization info to pieces

    }, [])

    
    return ( 
        <div>
            <h1>This will be preview</h1>
            <p>Tällä hetkellä ei display koko infoja, koska käytetään userin organizaatiota</p>
            <h2>{user?.user.organizations?.[0].organization_name}</h2>
            <h2>{organization?.name}</h2>
        </div>
     );
}
 
export default OrganizationPreview;