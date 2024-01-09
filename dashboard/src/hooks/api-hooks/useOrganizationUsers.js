import axios from "axios";
import { useMutation } from "react-query";

export function useAddUpdateUser() {
    return useMutation({
        mutationFn: async ({ organization_id, token, user_email, role }) => {
            // we dont need to destructure data from this function because api returns only status and no body
            await axios.post('/api/organizations/users', { user_email, role }, { headers: { "Authorization": token, "Organization": organization_id } })
        }
    })
}
