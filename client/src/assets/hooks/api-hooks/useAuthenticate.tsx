import axios from "axios";
import { useMutation } from "react-query";

// This gets the event
export function useLogin() {
    return useMutation({
        mutationFn: async (variables: {email?: string, password?: string}) => {
            const { data } = await axios.post('/api/auth/login', {email: variables.email, password: variables.password})
            return data
        }
    })
}