import axios from "axios";
import { useQuery } from "react-query";
import { useAppContext } from "src/context/appContext";

export default function useDetailedOrganizations() {
    // We fetch organization using details in appContext
    const { selectedOrganization: organization_id, session: {token} } = useAppContext()
    const enabled = Boolean((organization_id && token))

    return useQuery({
        enabled: enabled,
        queryKey: ['detailedorganization', organization_id, token],
        staleTime: 1000 * 60,
        queryFn: async () => {
            const { data } = await axios.get('/api/organizations', {headers:{"Authorization":token, 'Organization':organization_id}})
            return data
        },
        onError(error){
            console.error("Error when fetching detailed organization: ", error)
        },
        onSuccess(data) {
            console.log("Succesfully fetched detailed organization: ", data)
        },
    })
}


