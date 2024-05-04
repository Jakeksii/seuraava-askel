import axios from "axios";
import { useQuery } from "react-query";
import { useAppContext } from 'src/context/appContext';

export function useGetEvents() {
    // We fetch organization using details in appContext
    const { selectedOrganization: organization_id, session: { token } } = useAppContext()
    const enabled = Boolean((organization_id && token))

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

export function useGetEvent({_id, disable = false}) {
    // We fetch organization using details in appContext
    const { selectedOrganization: organization_id, session: { token } } = useAppContext()
    const enabled = Boolean((organization_id && token) && !disable)

    return useQuery({
        enabled: enabled,
        queryKey: ['event', _id, organization_id, token],
        staleTime: 1000 * 60,
        queryFn: async () => {
            const { data } = await axios.get(`/api/events/organization-events/${_id}`, {
                headers: {
                    "Authorization": token,
                    "Organization": organization_id,
                }
            });
            return data
        }
    })
}