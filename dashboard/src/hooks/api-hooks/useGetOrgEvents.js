import axios from "axios";
import { useQuery } from "react-query";
import { useAppContext } from 'src/context/appContext';

export default function useGetEvents() {
    // We fetch organization using details in appContext
    const { selectedOrganization: organization_id, session } = useAppContext()
    const enabled = Boolean((organization_id && session?.token))
    const token = session.token

    return useQuery({
        enabled: enabled,
        queryKey: ['events', organization_id, token],
        staleTime: 1000 * 60,
        queryFn: async () => {
            const { data } = await axios.get(`/api/events/organization-events`, {
                headers: {
                    "Authorization": token,
                    "Organization": organization_id,
                }
            });
            return data
        }
    })
}