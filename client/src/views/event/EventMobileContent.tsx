import DirectionsIcon from '@mui/icons-material/Directions';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { Image } from 'src/components/Image';
import { EventPage, FormattedDate } from "src/types";
import { Chips } from './Chips';
import { alpha } from '@mui/material/styles';
import { secondary } from 'src/theme/palette';

type Props = {
    data: EventPage
    formattedDates: FormattedDate
    distance?: number
    mapLink: string
}

export default function EventMobileContent({ data, formattedDates, distance, mapLink }: Props) {

    const distanceTag = (
        <Box position={'absolute'} top={10} right={10} height={0}>
            <Chip color='secondary' sx={{backgroundColor: alpha(secondary.main, 0.8)}} icon={<LocationOnIcon />}
                label={
                    <Typography variant="body1" fontWeight={'bold'}>
                        {distance} km
                    </Typography>
                } />
        </Box>

    )
    const date = (
        <Typography variant="body1" fontWeight={'bold'}>
            {(formattedDates.startDate === formattedDates.endDate) ?
                formattedDates.startDate :
                formattedDates.startDate + " - " + formattedDates.endDate}
        </Typography>
    )
    const time = (
        <Typography variant="body1" fontWeight={'bold'}>
            {formattedDates.startTime} - {formattedDates.endTime}
        </Typography>
    )
    const chips = {
        denomination: data.meta['denomination'],
        language: data.meta['language'],
        size: data.meta['size'],
        types: data.meta['types']
    }


    return (
        <>
            <Box sx={{ aspectRatio: '1/1', flexShrink: 0 }}>
                <Image image_id={data.image_id} aspectRatio={1 / 1} sx={{ width: '100%' }} />
            </Box>
            {distance && distanceTag}
            <Box padding={2}>
                <Typography variant='h5' >{data.organization.organization_name}</Typography>
                <Typography variant='h2' gutterBottom>{data.title}</Typography>
                <Stack direction={'row'} gap={1} flexWrap={'wrap'} paddingBottom={2}>
                    <Chip color='secondary' icon={<EventIcon />} label={date} />
                    <Chip color='secondary' icon={<ScheduleIcon />} label={time} />

                </Stack>
                <Button variant='contained' fullWidth component={Link} to={mapLink} target='blank'><DirectionsIcon /> {data.address.street}, {data.address.city}</Button>

                <Typography variant='body1' sx={{ pt: 2 }}>{data.extract}</Typography>
                <Stack direction={'row'} gap={1} sx={{ pt: 4 }} flexWrap={'wrap'}>
                    <Chips data={chips} />
                </Stack>
            </Box>
            {data.description &&
                <Box p={2} sx={{ pt: 3 }}>
                    <Typography variant='h3' gutterBottom>Kuvaus</Typography>
                    <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
                </Box>}
        </>
    )
}