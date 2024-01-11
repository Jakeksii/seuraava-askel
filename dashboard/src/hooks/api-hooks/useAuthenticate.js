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
    const { setSession } = useAppContext()

    const logout = () => {
        sessionStorage.removeItem('user_data')
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