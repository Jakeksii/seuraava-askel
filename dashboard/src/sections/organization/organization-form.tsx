import { Checkbox, Typography } from "@mui/material"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react"
import { geocodeByPlaceId, getLatLng } from "react-places-autocomplete"
import GooglePlacesAutocomplete, { PlaceType } from "src/components/GooglePlacesAutocomplete"
import LoadingView from "src/components/loading/loading-view"
import getAddressObject from "src/functions/getAddressObject"
import useDetailedOrganizations from "src/hooks/api-hooks/useOrganisations"

type FormData = {
    name: string;
    business_id: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipcode: string;
        country: string;
    };
    location: {
        type: string;
        coordinates: number[];
    };
    contact_info: {
        visible: boolean;
        email: string;
        phone: string;
    };
}

type Props = {
    mode: 'edit' | 'new'
    formData: FormData
    setFormData: (data: FormData) => void
    onSubmit: FormEventHandler<HTMLFormElement>
}

export default function OrganizationForm({ mode, formData, setFormData, onSubmit }: Props) {
    // If edit mode, use fetched data. If new mode, use empty data
    const { data, isLoading } = useDetailedOrganizations(mode === 'new')

    // we keep track if address was selected from Google Autocomplete
    const [placeSelected, setPlaceSelected] = useState(false)

    console.log(formData)
    // if Edit mode, set fetched organization data to form data
    useEffect(() => {
        if (mode === 'edit' && !isLoading) {
            data && setFormData(data)
        }
    }, [isLoading, data, mode, setFormData])


    // render load
    if (mode === 'edit' && isLoading) {
        return <Stack m={8}><LoadingView /></Stack>
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            address: {
                ...formData.address,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleContactChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            contact_info: {
                ...formData.contact_info,
                [e.target.name]: e.target.value
            }
        })
    }

    // GOOGLE AUTOCOMPLETE
    function onPlaceSelected(place: PlaceType) {
        geocodeByPlaceId(place.place_id)
            .then(results => getLatLng(results[0])
                .then(latLng => {
                    console.log(results)

                    const address = {
                        ...getAddressObject(results[0])
                    }

                    setFormData({
                        ...formData,
                        address: address,
                        location: {
                            ...formData.location,
                            coordinates: [latLng.lng, latLng.lat]
                        }
                    })
                    setPlaceSelected(true)
                })
                .catch(error => console.error('Error', error)))
    }

    // render new
    return (
        <form id="organization-form" onSubmit={onSubmit}>
            <Stack spacing={4}>
                <Stack direction={'row'} spacing={2}>
                    <TextField
                        name={'name'}
                        label='Nimi'
                        required
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        name={'business_id'}
                        label='Y-tunnus'
                        required
                        value={formData.business_id}
                        onChange={handleChange}
                    />
                </Stack>
                <Stack spacing={2}>
                    <Typography variant="h6">Osoite</Typography>
                    <GooglePlacesAutocomplete onPlaceSelected={onPlaceSelected} />
                    <TextField
                        name={'street'}
                        label='Katuosoite'
                        required
                        fullWidth
                        disabled={!placeSelected}
                        value={formData.address.street}
                        onChange={handleAddressChange}
                    />
                    <TextField
                        name={'city'}
                        label='Kaupunki'
                        required
                        disabled
                        fullWidth
                        value={formData.address.city}
                        onChange={handleAddressChange}
                    />
                    <TextField
                        name={'state'}
                        label='Maakunta'
                        required
                        disabled
                        fullWidth
                        value={formData.address.state}
                        onChange={handleAddressChange}
                    />
                    <TextField
                        name={'zipcode'}
                        label='Postinumero'
                        required
                        disabled
                        fullWidth
                        value={formData.address.zipcode}
                        onChange={handleAddressChange}
                    />
                    <TextField
                        name={'country'}
                        label='Maa'
                        required
                        disabled
                        fullWidth
                        value={formData.address.country}
                        onChange={handleAddressChange}
                    />
                </Stack>
                <Stack spacing={2}>
                    <Typography variant="h6">Yhteystiedot</Typography>
                    <TextField
                        name={'email'}
                        label='Sähköposti'
                        required
                        fullWidth
                        value={formData.contact_info.email}
                        onChange={handleContactChange}
                    />
                    <TextField
                        name={'phone'}
                        label='Puhelin'
                        required
                        fullWidth
                        value={formData.contact_info.phone}
                        onChange={handleContactChange}
                    />
                    <Stack direction={'row'} alignItems={'center'}>
                        <Checkbox
                            value={formData.contact_info.visible}
                            onChange={e => setFormData({ ...formData, contact_info: { ...formData.contact_info, visible: e.target.checked } })}
                        />
                        <Typography variant="body2">Näytä yhteystiedot julkisena</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </form>
    )
}