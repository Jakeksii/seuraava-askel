/* eslint-disable @typescript-eslint/no-explicit-any */

import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Button } from "@mui/material"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Tab from '@mui/material/Tab'
import { useEffect, useState } from "react"
import LoadingView from "src/components/loading/loading-view"
import { useGetEvent } from "src/hooks/api-hooks/useEvents"
import Event from "./Event"
import { Organization } from 'src/hooks/api-hooks/useOrganisations'
import { FormData } from './view/new-event-view'

import { Form1 } from "./event-form/form1"
import { Form2 } from "./event-form/form2"
import { Form3 } from "./event-form/form3"
import { Form4 } from "./event-form/form4"
import { PreviousButton } from 'src/components/buttons/previous-button'



type Props = {
    mode: 'new' | 'edit'
    formData: FormData
    setFormData: (data: FormData) => void
    event_id?: string
    organization: Organization
}

export default function EventForm({ mode, formData, setFormData, event_id, organization }: Props) {

    // If edit mode, use fetched data. If new mode, use empty data
    const { data, isLoading } = useGetEvent({ _id: event_id, disable: mode === 'new' })

    // if Edit mode, set fetched event data to form data
    useEffect(() => {
        if (mode === 'edit' && !isLoading) {
            data && setFormData(data)
        }
    }, [isLoading, data, mode, setFormData])

    // Tabs
    const [tabValue, setTabValue] = useState('1');
    const [disabledTabs, setDisabledTabs] = useState({
        '1': false,
        '2': true,
        '3': true,
        '4': true,
        '5': true
    })

    // render load
    if (mode === 'edit' && isLoading) {
        return <Stack m={8}><LoadingView /></Stack>
    }

    // render new
    return (
        <TabContext value={tabValue}>
            <Box>
                <TabList onChange={(_, v) => setTabValue(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tab label="Tapahtuma" value="1" />
                    <Tab label="Aika" value="2" disabled={disabledTabs['2']} />
                    <Tab label="Osoite" value="3" disabled={disabledTabs['3']} />
                    <Tab label="Lisätiedot" value="4" disabled={disabledTabs['4']} />
                    <Tab label="Esikatselu" value="5" disabled={disabledTabs['5']} />
                </TabList>
            </Box>
            <TabPanel value={'1'} sx={{ p: 0, pt: 2 }}>
                <PreviousButton onClick={() => {}} sx={{ mb: 3 }} disabled/>
                <Form1
                    defaultValues={formData}
                    setData={(data) => {
                        setFormData({
                            ...formData,
                            ...data,
                            image_id: `${organization._id}/${data.image_id}`
                        })
                        setDisabledTabs({
                            ...disabledTabs,
                            '2': false
                        })
                        setTabValue('2')
                    }} />
            </TabPanel>

            <TabPanel value={'2'} sx={{ p: 0, pt: 2 }}>
                <PreviousButton onClick={() => setTabValue('1')} sx={{ mb: 3 }}/>
                <Form2
                    defaultValues={formData}
                    setData={(data) => {
                        setFormData({
                            ...formData,
                            ...data
                        })
                        setDisabledTabs({
                            ...disabledTabs,
                            '3': false
                        })
                        setTabValue('3')
                    }} />
            </TabPanel>

            <TabPanel value={'3'} sx={{ p: 0, pt: 2 }}>
                <PreviousButton onClick={() => setTabValue('2')} sx={{ mb: 3 }}/>
                <Form3      
                    defaultValues={formData as any}
                    setData={(data) => {
                        setFormData({
                            ...formData,
                            ...data as any
                        })
                        setDisabledTabs({
                            ...disabledTabs,
                            '4': false
                        })
                        setTabValue('4')
                    }} organization={organization} />
            </TabPanel>

            <TabPanel value={'4'} sx={{ p: 0, pt: 2 }}>
                <PreviousButton onClick={() => setTabValue('3')} sx={{ mb: 3 }}/>
                <Form4
                    defaultValues={formData}
                    setData={(data) => {
                        setFormData({
                            ...formData,
                            ...data 
                        })
                        setDisabledTabs({
                            ...disabledTabs,
                            '5': false
                        })
                        setTabValue('5')
                    }} />
            </TabPanel>

            <TabPanel value={'5'} sx={{ p: 0, pt: 2 }}>
                <PreviousButton onClick={() => setTabValue('4')} sx={{ mb: 3 }}/>
                <Stack spacing={4}>
                    <Event
                        event={{
                            ...formData,
                            organization: {
                                _id: organization._id,
                                name: organization.name
                            }
                        }} />
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