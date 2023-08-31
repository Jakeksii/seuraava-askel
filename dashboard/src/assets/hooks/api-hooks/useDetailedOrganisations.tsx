

import axios from "axios";
import { useQuery } from "react-query";
import { Organization } from "../../types";


interface Props {
    organization_id: string,
    token: string
}


export default function useDetailedOrganizations(props: Props) {
    return useQuery({
        queryKey: ['detailedorganization', props.organization_id],
        staleTime: 1000 * 60,
        queryFn: async () => {
            // await wait(2000)        //loading testausta varten
            const  { data}  = await axios.get('/api/organizations/' + props.organization_id + "/detailed", {headers:{"Authorization":props.token}})
            return data as Organization         // ^tähän api url
        },
        onError(error){
            console.error("Error when fetching search results: ", error)
        },
        onSuccess(data) {
            console.log("Succesfully fetched search results: ", data)
        },
    })
}


