import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useAppContext } from 'src/context/appContext';
import { Event } from "src/types";

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
        },
        onSuccess(data) {
            console.log("Succesfully fetched events: ", data)
        }
    })
}

export function useGetEvent({_id, disable = false} : { _id: string, disable?: boolean }) {
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
        },
        onSuccess(data) {
            console.log("Succesfully fetched event: ", data)
        }
    })
}

export function usePublishEvent() {
    // We fetch organization using details in appContext
    const { selectedOrganization: organization_id, session: { token } } = useAppContext()

    return useMutation({
        mutationFn: async (event: Omit<Event, '_id' | 'createdAt' | 'updatedAt'>) => {
            const { data } = await axios.post(`/api/events/create`, event, {
                headers: {
                    "Authorization": token,
                    "Organization": organization_id,
                }
            });
            return data
        }
    })
}