import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { Preferences } from "src/context/searchContext";
import { Event } from "src/types";

type Props = {
    search?: string
    page: number
    location?: {
        longitude: number
        latitude: number
    }
    preferences: Preferences
}

export default function useGetEvents(props: Props) {
    return useInfiniteQuery(['events', props.search, props.location, props.preferences], {
        staleTime: 1000 * 60 * 5,
        queryFn: async ({ pageParam = 1 }) => {
            let query = 'api/events?'
            query += props.search ? `s=${props.search}&` : ''
            query += `p=${pageParam}&`
            query += props.location ? `lon=${props.location.longitude}&lat=${props.location.latitude}` : ''

            const { data } = await axios.post(query, { preferences: props.preferences })
            return data as Event[]
        },
        onSuccess() {
            console.log('Fetched events')
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