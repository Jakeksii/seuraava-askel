import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { geocodeByPlaceId, getLatLng } from "react-places-autocomplete";
import GooglePlacesAutocomplete, { PlaceType } from "src/components/GooglePlacesAutocomplete";
import getAddressObject from "src/functions/getAddressObject";
import { Schema3, schema3 } from "./schemas";
import { Organization } from "src/hooks/api-hooks/useOrganisations";

type Props = {
    setData: (data: Schema3) => void
    defaultValues: Schema3
    organization: Organization
}

export function Form3({ setData, defaultValues, organization }: Props) {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Schema3>({
        defaultValues,
        resolver: zodResolver(schema3)
    })
    const useOrganizationAddress = watch('useOrganizationAddress')
    const address = watch('address')

    // GOOGLE AUTOCOMPLETE
    // we keep track if address was selected from Google Autocomplete
    function onPlaceSelected(place: PlaceType) {
        geocodeByPlaceId(place.place_id)
            .then(results => getLatLng(results[0])
                .then(latLng => {
                    console.log(results)

                    const address = {
                        ...getAddressObject(results[0])
                    }
                    setValue('address', address)
                    setValue('location', { coordinates: [latLng.lng, latLng.lat] })
                })
                .catch(error => console.error('Error', error)))
    }
    
    return (
        <form onSubmit={handleSubmit(setData)}>
            <Stack mb={2} direction={'row'} gap={1} alignItems={'center'}>
                <Switch {...register('useOrganizationAddress')} />
                <Typography>Käytä organisaation osoitetta</Typography>
            </Stack>
            {!useOrganizationAddress && (
                <Stack spacing={4}>
                    <GooglePlacesAutocomplete onPlaceSelected={onPlaceSelected} />

                    {address.city && (
                        <Box sx={{ pl: 1 }}>
                            <Typography variant="h6" gutterBottom>Osoite</Typography>
                            <Typography>
                                {address.street}, {address.zipcode} {address.city}<br />
                                {address.state} {address.country}
                            </Typography>
                        </Box>
                    )}

                    { /* eslint-disable-next-line */ }
                    {(errors as any).address! && <Typography color="error">{(errors as any).address.street.message}</Typography>}
                    <Button variant="contained" type="submit" fullWidth>
                        Seuraava
                    </Button>
                </Stack>
            )}

            {useOrganizationAddress && (
                <Stack spacing={4}>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>{organization?.name}</Typography>
                        <Typography >
                            {organization?.address.street}, {organization?.address.zipcode} {organization?.address.city} <br />
                            {organization?.address.state} {organization?.address.country}
                        </Typography>
                    </Box>

                    <Button variant="contained" fullWidth type="submit">
                        Seuraava
                    </Button>
                </Stack>
            )}
        </form>
    )
}