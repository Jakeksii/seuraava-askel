import axios from "axios";
import { useQuery } from "react-query";
import { EventPage } from "../../../types";

interface Props {
    _id: string
}

// This gets the event
export default function useGetEventPage(props: Props) {
    return useQuery({
        queryKey: ['event_page', props._id],
        staleTime: 1000 * 60,
        queryFn: async () => {
            const { data } = await axios.get('/api/events/single/' + props._id)
            return data as EventPage
        },
        onError(error){
            console.error("Error when fetching event: ", error)
        },
        onSuccess(data) {
            console.log("Succesfully fetched event: ", data)
        },
    })
}