import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { useAppContext } from "src/context/appContext";

export function useLogin() {
    return useMutation({
        mutationFn: async ({ email, password }) => {
            const { data } = await axios.post('/api/auth/login', {email, password})
            return data
        }
    })
}

export function useLogout() {
    const client = useQueryClient()
    const { setUser } = useAppContext()

    const logout = () => {
        sessionStorage.removeItem('user_data')
        client.clear();
        setUser()
    }
    return { logout }
}

export function useRegister() {
    return useMutation({
        mutationFn: async ({ first_name, last_name, email, password }) => {
            // we dont need to destructure data from this function because api returns only status and no body
            await axios.post('/api/auth/register', { first_name, last_name, email, password })
        },
    })
}