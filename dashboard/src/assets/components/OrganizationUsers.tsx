import { ERROR_DEFAULT } from "../constants";
import { useAppContext } from "../context/appContext";
import useDetailedOrganizations from "../hooks/api-hooks/useDetailedOrganisations"
import CircularProgress from '@mui/material/CircularProgress';


export default function OrganizationUsers() {

    const appState = useAppContext();

    const {data, isLoading, isError} = useDetailedOrganizations({organization_id: "64aac099139ebe515898923e", token:appState.user?.token?? ""});
        // ^ ota täältä isloading ja iserror hommia
        // booleaneja
    


    // kopsaa error handling

    if(isLoading) {
        return <CircularProgress color='info' />
    }

    if(isError) {
        return <p>{ERROR_DEFAULT}</p>
    }

    return (
        <section>
            {data?.organization_users.map((user, index) => ( 
                <li key={index}> {user.user_name} {user.user_email} {user.role}</li>
            ))}
        </section>
    )
}

