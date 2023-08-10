import axios from "axios";
import { useQuery } from "react-query";
import { OrganizationPage } from "../../types";

interface Props {
    query: string
}

export default function useGetOrganizationPage(props: Props) {
    return useQuery({
        queryKey: ['organization_page', props.query],
        staleTime: 1000 * 60,
        queryFn: async () => {
            const { data } = await axios.get('/api/organization-pages?name=' + props.query)
            return data as OrganizationPage
        },
        onError(error){
            console.error("Error when fetching search results: ", error)
        },
        onSuccess(data) {
            console.log("Succesfully fetched search results: ", data)
        },
    })
}