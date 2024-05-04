import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { useAppContext } from "src/context/appContext";

export type Organization = {
    _id: string;
    name: string;
    status: string;
    business_id: string;
    contact_info_visible: boolean;
    visible: boolean;
    address: {
        street: string;
        city: string;
        state: string;
        zipcode: string;
        country: string;
    };
    contact_info: {
        visible: boolean;
        email: string;
        phone: string;
    };
    organization_users: {
        user_id: string;
        user_name: string;
        user_email: string;
        role: string;
        _id: string;
    }[];
}
export default function useDetailedOrganizations(disabled = false) {
    // We fetch organization using details in appContext
    const { selectedOrganization: organization_id, session: { token } } = useAppContext()
    const enabled = Boolean((organization_id && token && !disabled))

    return useQuery({
        enabled: enabled,
        queryKey: ['detailedorganization', organization_id, token],
        staleTime: 1000 * 60,
        queryFn: async () => {
            const { data } = await axios.get('/api/organizations', { headers: { "Authorization": token, 'Organization': organization_id } })
            return data as Organization
        },
        onError(error) {
            console.error("Error when fetching detailed organization: ", error)
        },
        onSuccess(data) {
            console.log("Succesfully fetched detailed organization: ", data)
        },
    })
}

export function useCreateOrganization() {
    const { session: { token } } = useAppContext()

    return useMutation({
        mutationFn: async (organization) => {
            const { data } = await axios.post('/api/organizations', organization, { headers: { "Authorization": token } })
            return data
        }
    })
}

