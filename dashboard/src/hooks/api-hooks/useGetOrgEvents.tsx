import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { Event } from "src/types";
import { useAppContext } from 'src/context/appContext';
import { useGetUser } from 'src/hooks/api-hooks/useAuthenticate';

type Props = {
    orgId: string;
};

export default function useGetEvents(props: Props) {

    const { session } = useAppContext()
    const { data: user } = useGetUser(session!.token)


    return useQuery(['events', props.orgId], async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/events/banjo/${props.orgId}`, {
                headers: {
                    "Authorization": user!.token,
                    "Organization": props.orgId,
                },
                params: {
                    // Add other parameters as needed
                },
            });

            return response.data as Event[];
        } catch (error) {
            // Handle errors
            const axiosError = error as AxiosError;
            console.error("Error fetching events:", axiosError);

            // Handle error appropriately, e.g., set state to show an error message
            throw axiosError; // Rethrow the error to let react-query handle it
        }
    });
}