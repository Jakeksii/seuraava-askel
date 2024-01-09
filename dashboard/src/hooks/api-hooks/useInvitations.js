import axios from "axios";
import { useQuery, useMutation } from "react-query";

export function useGetInvitations({ token }) {
    return useQuery({
        queryKey: ['invitations'],
        staleTime: 1000 * 60,
        queryFn: async () => {
            const { data } = await axios.get('/api/invitations/', { headers: { "Authorization": token } })
            return data
        },
        onError(error) {
            console.error("Error when fetching invitations: ", error)
        },
        onSuccess(data) {
            console.log("Succesfully fetched invitations: ", data)
        },
    })
}

export function useAcceptInvitation() {
    return useMutation({
        mutationFn: async ({ _id, token }) => {
            // we dont need to destructure data from this function because api returns only status and no body
            const { data } = await axios.patch(`/api/invitations/${_id}`, {}, { headers: { "Authorization": token } })
            return data
        }
    })
}


