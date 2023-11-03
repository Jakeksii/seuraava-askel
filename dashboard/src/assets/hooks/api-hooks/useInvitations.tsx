import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { Invitation } from "../../types";

interface Props {
    token: string
}

export function useGetInvitations(props: Props) {
    return useQuery({
        queryKey: ['invitations'],
        staleTime: 1000 * 60,
        queryFn: async () => {
            const { data } = await axios.get('/api/invitations/', { headers: { "Authorization": props.token } })
            return data as Invitation[]
        },
        onError(error) {
            console.error("Error when fetching invitations: ", error)
        },
        onSuccess(data) {
            console.log("Succesfully fetched invitations: ", data)
        },
    })
}

type AcceptResponse = {
    organization_id: string,
    organization_name: string,
    role: 'user' | 'admin' | 'owner'
}

export function useAcceptInvitation() {
    return useMutation({
        mutationFn: async ({ _id, token }: { _id: string, token: string }) => {
            // we dont need to destructure data from this function because api returns only status and no body
            const { data } = await axios.patch('/api/invitations/' + _id, {}, { headers: { "Authorization": token } })
            return data as AcceptResponse
        }
    })
}


