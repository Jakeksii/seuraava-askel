import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { Event, SearchQuery } from "../../../types";

type Props = {
    search: string
    page: number
    coords?: {
        longitude: number
        latitude: number
    }
}

export default function useGetEvents(props: Props) {

    return useInfiniteQuery({
        queryKey: ['events', props.search],
        staleTime: 1000 * 60 * 5,
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await axios.post(`api/events?s=${props.search}&p=${pageParam}`, {location: props.coords})
            return data as Event[]
        },
        onError(error) {
            console.error("Error when fetching events: ", error)
        },
        onSuccess(data) {
            console.log("Succesfully fetched events: ", data)
        },
        getNextPageParam(_, pages) {
            // Check if there are events in the last page
            if (pages.length === 0 || pages[pages.length - 1].length === 0) {
                return undefined; // No more pages to fetch
            }
            return pages.length + 1;
        }
    })
}