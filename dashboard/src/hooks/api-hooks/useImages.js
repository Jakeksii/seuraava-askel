import axios from "axios";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { useAppContext } from "src/context/appContext";

export function useGetImages() {
    // We fetch using details in appContext
    const { selectedOrganization: organization_id, session: {token} } = useAppContext()
    const enabled = Boolean((organization_id && token));

    return useQuery({
        enabled: enabled,
        queryKey: ['images', organization_id, token],
        staleTime: 1000 * 60,
        queryFn: async () => {
            const { data } = await axios.get('/api/image', {headers:{"Authorization":token, 'Organization':organization_id}})
            return data
        },
        onError(error){
            console.error("Error when fetching images: ", error)
        },
        onSuccess(data) {
            console.log("Succesfully fetched images: ", data)
        },
    })
}

export function useUploadImage() {
    const { selectedOrganization: organization_id, session: { token } } = useAppContext();
    const enabled = Boolean((organization_id && token));

    const queryClient = useQueryClient();

    return useMutation({
        enabled: enabled,
        mutationFn: async (formData) => {
            await axios.post('/api/image', formData, {
                headers: {
                    "Authorization": token,
                    'Organization': organization_id,
                    'Content-Type': 'multipart/form-data'
                }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['images'] });
        },
        onError: (error) => {
            console.error(error);
        }
    });
}

export function useDeleteImages() {
    const { selectedOrganization: organization_id, session: {token} } = useAppContext()
    const enabled = Boolean((organization_id && token))

    const queryClient = useQueryClient()

    return useMutation({
        enabled: enabled,
        mutationFn: async (image_ids) => {
            await axios.delete('/api/image', {headers:{"Authorization":token, 'Organization':organization_id, 'Images':JSON.stringify(image_ids)}})
            return
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['images'] })
        },
        onError: (error) => {
            console.error(error)
        }
    })
}


