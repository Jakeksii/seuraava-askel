import axios from "axios";
import { useQuery } from "react-query";
import { AvailableFilters, Filters, Location } from "../../../types";

interface Props {
    location?: Location
    currentFilters: Filters
}

export default function useGetAvailableFilters({currentFilters, location}: Props) {
    return useQuery({
        queryKey: ['available_filters', currentFilters, location],
        staleTime: 1000 * 60,
        queryFn: async () => {
            const { data } = await axios.post('/api/events/filters', {filters:currentFilters, location:location})
            return data as AvailableFilters
        },
        onError(error){
            console.error("Error when fetching available filters: ", error)
        },
        onSuccess(data) {
            console.log("Succesfully fetched available filters: ", data, "with filters: ", currentFilters)
        },
    })
}