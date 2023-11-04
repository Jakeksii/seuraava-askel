import axios from "axios";
import { useQuery } from "react-query";
import { Organization } from "../../types";

interface Props {
    organization_id: string,
    token: string
}

export default function useDetailedOrganizations(props: Props) {
    return useQuery({
        queryKey: ['detailedorganization', props.organization_id, props.token],
        staleTime: 1000 * 60,
        queryFn: async () => {
            const { data } = await axios.get('/api/organizations', {headers:{"Authorization":props.token, 'Organization':props.organization_id}})
            return data as Organization
        },
        onError(error){
            console.error("Error when fetching detailed organization: ", error)
        },
        onSuccess(data) {
            console.log("Succesfully fetched detailed organization: ", data)
        },
    })
}


