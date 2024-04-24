import { Button, Switch, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import { useEffect, useState } from "react"
import { geocodeByPlaceId, getLatLng } from "react-places-autocomplete"
import GooglePlacesAutocomplete, { PlaceType } from "src/components/GooglePlacesAutocomplete"
import LoadingView from "src/components/loading/loading-view"
import StaticDateTimePicker from "src/components/pickers/static-date-time-picker"
import getAddressObject from "src/functions/getAddressObject"
import { useGetEvent } from "src/hooks/api-hooks/useEvents"

import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Tab from '@mui/material/Tab'
import SelectImage from "./select-image"
import TextEditor from "src/components/text-editor/text-editor"
import Event from "./Event"



type Props = {
    mode: 'new' | 'edit'
    formData: any
    setFormData: (data: any) => void
    onSubmit: (e: any) => void
    event_id?: undefined

    useOrganizationAddress: boolean
    setUseOrganizationAddress: (value: boolean) => void
    organization: any
}

const EXTRACT_MAX_LENGTH = 200

export default function EventForm({ mode, formData, setFormData, onSubmit, event_id, useOrganizationAddress, setUseOrganizationAddress, organization }: Props) {
    // If edit mode, use fetched data. If new mode, use empty data
    const { data, isLoading } = useGetEvent({ _id: event_id, disable: mode === 'new' })

    // we keep track if address was selected from Google Autocomplete
    const [placeSelected, setPlaceSelected] = useState(false)

    // Tabs
    const [tabValue, setTabValue] = useState("1");

    // if Edit mode, set fetched event data to form data
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
    const handleDateChange = (name: string, value: Date | null) => {
        setFormData({
            ...formData,
            [name]: value?.toISOString()
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

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default behavior (line break)
        }
    };

    // render new
    return (
        <TabContext value={tabValue}>
            <Box>
                <TabList onChange={(_, v) => setTabValue(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tab label="Tapahtuma" value="1" />
                    <Tab label="Aika" value="2" />
                    <Tab label="Osoite" value="3" />
                    <Tab label="Lisätiedot" value="4" />
                    <Tab label="Esikatselu" value="5" />
                </TabList>
            </Box>
            <TabPanel value={'1'}>
                <form onSubmit={(e) => { e.preventDefault(); setTabValue('2') }}>
                    <Stack spacing={4}>
                        <Stack spacing={2}>
                            <TextField
                                name={'title'}
                                label='Otsikko'
                                required
                                fullWidth
                                value={formData.title}
                                onChange={handleChange}
                            />
                            <Stack direction={{ sm: 'column', md: 'row' }} spacing={4}>
                                <SelectImage
                                    image_id={formData.image_id}
                                    setImage_id={(value) => setFormData({ ...formData, image_id: value })}
                                    organization_id={organization?._id}
                                />

                                <Box sx={{ flexGrow: 1 }}>
                                    <TextField
                                        name={'extract'}
                                        label='Lyhyt ote'
                                        multiline
                                        rows={6}
                                        required
                                        fullWidth
                                        value={formData.extract}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                        inputProps={{ maxLength: EXTRACT_MAX_LENGTH }}
                                    />
                                    <Typography sx={{ color: 'text.secondary', textAlign: 'right', mt: '1px !important' }}>{formData.extract.length} / {EXTRACT_MAX_LENGTH}</Typography>
                                </Box>
                            </Stack>
                        </Stack>
                        <Button variant="contained" type="submit" fullWidth>
                            Seuraava
                        </Button>
                    </Stack>

                </form>
            </TabPanel>

            <TabPanel value={'2'}>
                <Stack spacing={4}>
                    <Stack spacing={2} justifyContent={'space-between'} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
                        <StaticDateTimePicker
                            name={'start_date'}
                            toolbarTitle="Aloitusaika"
                            onChange={handleDateChange}
                        />
                        <StaticDateTimePicker
                            name={'title'}
                            toolbarTitle="Lopetusaika"
                            onChange={handleDateChange}
                            minDateTime={formData.start_date}
                        />
                    </Stack>
                </Stack>
                <Button variant="contained" fullWidth onClick={() => setTabValue('3')}>
                    Seuraava
                </Button>
            </TabPanel>

            <TabPanel value={'3'}>
                <Stack mb={2} direction={'row'} gap={1} alignItems={'center'}>
                    <Switch checked={useOrganizationAddress} onChange={() => setUseOrganizationAddress(!useOrganizationAddress)} />
                    <Typography>Käytä organisaation osoitetta</Typography>
                </Stack>
                {!useOrganizationAddress && (
                    <form onSubmit={(e) => { e.preventDefault(); setTabValue('4') }}>
                        <Stack spacing={2}>
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
                            <Button variant="contained" type="submit" fullWidth>
                                Seuraava
                            </Button>
                        </Stack>
                    </form>
                )}

                {useOrganizationAddress && (
                    <Stack spacing={4}>
                        <Typography sx={{ p: 2 }}>
                            <b>{organization?.name}</b> <br />
                            {organization?.address.street} <br />
                            {organization?.address.zipcode} {organization?.address.city} <br />
                            {organization?.address.state} {organization?.address.country}
                        </Typography>
                        <Button variant="contained" fullWidth onClick={() => setTabValue('4')}>
                            Seuraava
                        </Button>
                    </Stack>
                )}
            </TabPanel>

            <TabPanel value={'4'}>
                <Stack spacing={4}>
                    <TextEditor value={formData.description} onChange={(value) => setFormData({ ...formData, description: value })} />
                    <Button variant="contained" fullWidth onClick={() => setTabValue('4')}>
                        Seuraava
                    </Button>
                </Stack>
            </TabPanel>

            <TabPanel value={'5'}>
                <Stack spacing={4}>


                    <Event event={formData}/>


                    <Stack direction={'row'} gap={1} justifyContent={'center'} alignItems={'center'}>
                        <Button variant="contained" fullWidth color="success">
                            Julkaise
                        </Button>
                        <Button variant="contained" fullWidth>
                            Tallenna
                        </Button>
                    </Stack>
                </Stack>
            </TabPanel>

        </TabContext>
    )
}