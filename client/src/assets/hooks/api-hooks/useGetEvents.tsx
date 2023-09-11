import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { Event } from "../../../types";

type Props = {
    query: string
    page: number
}

export default function useGetEvents(props: Props) {

    return useInfiniteQuery({
        queryKey: ['events', props.query],
        staleTime: 1000 * 60 * 5,
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await axios.get("api/events" + props.query + "&page=" + pageParam)
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