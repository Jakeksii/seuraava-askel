import DirectionsIcon from '@mui/icons-material/Directions';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { Image } from 'src/components/Image';
import { EventPage, FormattedDate } from "src/types";
import { Chips } from './Chips';

type Props = {
    data: EventPage
    formattedDates: FormattedDate
    distance?: number
    mapLink: string
}

export default function EventContent({ data, formattedDates, distance, mapLink }: Props) {

    const distanceTag = (
        <Typography variant="body1" fontWeight={'bold'}>
            {distance} km
        </Typography>
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
            <Stack direction={'row'} alignItems={'center'} >
                <Box sx={{ aspectRatio: '1/1', alignSelf: 'start', width: '50%', flexShrink: 0 }}>
                    <Image image_id={data.image_id} aspectRatio={1 / 1} sx={{ borderBottomRightRadius: 10 }} />
                </Box>
                <Stack padding={2} gap={2} alignContent={'center'}>
                    <Box>
                        <Typography variant='h5'>{data.organization.organization_name}</Typography>
                        <Typography variant='h2' sx={{overflowWrap: 'anywhere'}} gutterBottom>{data.title}</Typography>
                        <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
                            <Chip color='secondary' icon={<EventIcon />} label={date} />
                            <Chip color='secondary' icon={<ScheduleIcon />} label={time} />
                            {distance ? <Chip color='secondary' icon={<LocationOnIcon />} label={distanceTag} /> : null}
                        </Stack>
                    </Box>

                    <Button variant='contained' component={Link} to={mapLink} target='blank'><DirectionsIcon /> {data.address.street}, {data.address.city}</Button>

                    <Typography variant='body1'>{data.extract}</Typography>
                    <Box height={'100%'}>
                        <Stack direction={'row'} gap={1} sx={{ pt: 2 }} flexWrap={'wrap'}>
                            <Chips data={chips} />
                        </Stack>
                    </Box>
                </Stack>
            </Stack>
            {data.description && <Box p={2} sx={{ pt: 3 }}>
                <Typography variant='h3' gutterBottom>Lisätietoja</Typography>
                <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
            </Box>}
        </>
    )
}