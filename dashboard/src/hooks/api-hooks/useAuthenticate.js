import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAppContext } from "src/context/appContext";

export function useUser(retry = false) {
    const { session } = useAppContext()
    const token = session?.token

    return useQuery({
        queryKey: ['user', token],
        staleTime: 1000 * 60,
        enabled: Boolean(token),
        retry: retry,
        queryFn: async () => {
            const { data } = await axios.get('/api/users/', {headers:{ Authorization: token }})
            return data
        }
    })
}

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
    const { setSession } = useAppContext()

    const logout = () => {
        localStorage.clear()
        client.clear();
        setSession()
    }
    return { logout }
}

export function useRegister() {
    return useMutation({
        mutationFn: async ({ first_name, last_name, email, password }) => {
            const { data } = await axios.post('/api/auth/register', { first_name, last_name, email, password })
            return data
        },
    })
}

export function useForgotPassword() {
    return useMutation({
        mutationFn: async ({ email }) => {
            await axios.post('/api/auth/forgot-password', { email })
        },
    })
}

export function useResetPassword() {
    return useMutation({
        mutationFn: async ({ reset_token, password }) => {
            await axios.post('/api/auth/reset-password', { reset_token, password })
        },
    })
}

export function useVerifyEmail({ verification_token }) {
    return useQuery({
        retry: false,
        queryFn: async () => {
            await axios.post('/api/auth/verify-email', { verification_token })
        }
    })
}

export function useCreateVerifyEmail() {
    return useMutation({
        mutationFn: async ({ token }) => {
            await axios.get('/api/auth/create-verify-email', {headers: { Authorization: token }})
        },
    })
}