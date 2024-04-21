
import { Checkbox, Typography } from "@mui/material"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import { useEffect, useState } from "react"
import LoadingView from "src/components/loading/loading-view"
import useDetailedOrganizations from "src/hooks/api-hooks/useDetailedOrganisations"

const FORMDATA = {
    name: '',
    business_id: '',
    address: {
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
    },
    location: {
        type: 'Point',
        coordinates: [0, 0],
    },
    contact_info: {
        visible: true,
        email: '',
        phone: '',
    },
}

export default function OrganizationForm({ mode }: { mode: 'edit' | 'new' }) {
    // If edit mode, use fetched data. If new mode, use empty data
    const { data, isLoading } = useDetailedOrganizations({ disabled: mode === 'new' })
    const [formData, setFormData] = useState(FORMDATA)

    // if Edit mode, set fetched organization data to form data
    useEffect(() => {
        if (mode === 'edit' && !isLoading) {
            data && setFormData(data)
        }
    }, [isLoading, data, mode])


    // render load
    if (mode === 'edit' && isLoading) {
        return <Stack m={8}><LoadingView /></Stack>
    }

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleAddressChange = (e: any) => {
        setFormData({
            ...formData,
            address: {
                ...formData.address,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleContactChange = (e: any) => {
        setFormData({
            ...formData,
            contact_info: {
                ...formData.contact_info,
                [e.target.name]: e.target.value
            }
        })
    }

    // render new
    return (
        <form>
            <Stack spacing={4} m={4}>
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
                    <TextField
                        name={'street'}
                        label='Katuosoite'
                        required
                        fullWidth
                        value={formData.address.street}
                        onChange={handleAddressChange}
                    />
                    <TextField
                        name={'city'}
                        label='Kaupunki'
                        required
                        fullWidth
                        value={formData.address.city}
                        onChange={handleAddressChange}
                    />
                    <TextField
                        name={'state'}
                        label='Maakunta'
                        required
                        fullWidth
                        value={formData.address.state}
                        onChange={handleAddressChange}
                    />
                    <TextField
                        name={'zipcode'}
                        label='Postinumero'
                        required
                        fullWidth
                        value={formData.address.zipcode}
                        onChange={handleAddressChange}
                    />
                    <TextField
                        name={'country'}
                        label='Maa'
                        required
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
                            onChange={e => setFormData({...formData, contact_info: {...formData.contact_info, visible: e.target.checked}})}
                        />
                        <Typography variant="body2">Näytä yhteystiedot julkisena</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </form>
    )
}