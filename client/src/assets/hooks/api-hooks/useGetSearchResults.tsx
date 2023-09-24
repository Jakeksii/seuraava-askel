import axios from "axios";
import { useQuery } from "react-query";
import { SearchResult } from "../../../types";

interface Props {
    query: string
    enabled: boolean
}

export default function useGetSearchResults(props: Props) {
    return useQuery({
        queryKey: ['search-results',props.query],
        enabled: props.enabled,
        staleTime: 1000 * 60,
        queryFn: async () => {
            const { data } = await axios.get('/api/events/search?s=' + props.query)
            return data as SearchResult[]
        },
        onError(error){
            console.error("Error when fetching search results: ", error)
        },
        onSuccess(data) {
            console.log("Succesfully fetched search results: ", data)
        },
    })
}
