import axios from "axios";
import { useQuery } from "react-query";

export default function useCurrentUser({ token }) {
    return useQuery({
        queryKey: ['currentuser', token],
        staleTime: 1000 * 60,
        queryFn: async () => {
            const { data } = await axios.get('/api/users', {headers:{"Authorization":token}})
            return data
        },
        onError(error){
            console.error("Error when fetching current user: ", error)
        },
        onSuccess(data) {
            console.log("Succesfully fetched current user: ", data)
        },
    })
}