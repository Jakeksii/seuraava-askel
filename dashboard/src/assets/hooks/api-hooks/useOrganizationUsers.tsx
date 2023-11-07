import axios from "axios";
import { useMutation } from "react-query";

type Props = {
    organization_id: string
    user_email: string
    role: "user" | "admin" | "owner"
    token: string
}

export function useAddUpdateUser() {
    return useMutation({
        mutationFn: async ({ organization_id, token, user_email, role }: Props) => {
            // we dont need to destructure data from this function because api returns only status and no body
            await axios.post('/api/organizations/users', { user_email: user_email, role: role }, { headers: { "Authorization": token, "Organization": organization_id } })
        }
    })
}
