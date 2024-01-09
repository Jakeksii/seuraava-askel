import axios from "axios";
import { useQuery } from "react-query";

export default function useDetailedOrganizations({ organization_id, token }) {
    return useQuery({
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


