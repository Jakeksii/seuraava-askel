import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { alpha } from '@mui/material/styles';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Image } from "src/components/Image";
import { useSearchContext } from 'src/context/searchContext';
import calculateDistance from 'src/functions/calculateDistance';
import useFormatDate from "src/functions/formatDate";
import { useIsMobile } from 'src/hooks/useResponsive';
import { secondary } from 'src/theme/palette';
import { Event as EventType } from 'src/types';

type Props = {
    event: EventType
}

const Event = memo(({ event }: Props) => {
    const isMobile = useIsMobile()
    const { values: { location } } = useSearchContext()

    const dist = location.on ? Math.round(calculateDistance(

        location.coordinates.latitude,
        location.coordinates.longitude,
        event.location.coordinates[1],
        event.location.coordinates[0],
    )) : null

    const distanceTag = dist ? (
        <Chip
            color='secondary'
            icon={<LocationOnIcon />}
            label={
                <Typography variant="body2" fontWeight={'bold'}>
                    {dist} km
                </Typography>
            }
            sx={isMobile ? { backgroundColor: alpha(secondary.main, 0.8) } : {}} />
    ) : null

    const formattedDates = useFormatDate(event.start_date, event.end_date)
    const date = (
        <Typography variant="body2" fontWeight={'bold'}>
            {(formattedDates.startDate === formattedDates.endDate) ?
                formattedDates.startDate :
                formattedDates.startDate + " - " + formattedDates.endDate}
        </Typography>
    )

    const time = (
        <Typography variant="body2" fontWeight={'bold'}>
            {formattedDates.startTime} - {formattedDates.endTime}
        </Typography>
    )

    const eventLink = "/event/" + event._id

    if (isMobile) {
        return (
            <Card>
                <Link to={eventLink}>
                    <Box sx={{ aspectRatio: '1/1', width: '100%', backgroundImage: "linear-gradient(to top, rgba(255, 255, 255, 1.0) 0%, rgba(255, 255, 255, 0.5) 1%, transparent 30%)" }}>
                        <Image image_id={event.image_id} aspectRatio={1 / 1} sx={{ position: 'relative', zIndex: -1 }} />
                    </Box>
                    <Box position={'absolute'} top={10} right={10} height={0}>
                        {distanceTag}
                    </Box>

                    <CardContent sx={{ pt: 0 }}>
                        <Typography variant="body2">
                            {event.organization.organization_name}
                        </Typography>
                        <Typography variant="h3">
                            {event.title}
                        </Typography>
                        <Stack direction={'row'} gap={1} sx={{ pb: 1, pt: 1, flexWrap: 'wrap' }}>
                            <Chip color='secondary' icon={<EventIcon />} label={date} />
                            <Chip color='secondary' icon={<ScheduleIcon />} label={time} />
                        </Stack>
                        <Typography variant="body2">
                            {event.extract.length > 250 ? event.extract.slice(0, 250) + '...' : event.extract}
                        </Typography>
                    </CardContent>
                </Link>
            </Card>
        )
    } else {
        return (
            <Card>
                <Link to={eventLink}>
                    <Box position={'absolute'} top={10} right={10} height={0}>
                        {distanceTag}
                    </Box>
                    <Stack direction={'row'}>
                        <Box sx={{ aspectRatio: '1/1', width: '40%', flexShrink: 0, backgroundImage: "linear-gradient(to left, rgba(255, 255, 255, 1.0) 0%, rgba(255, 255, 255, 0.5) 1%, transparent 30%)" }}>
                            <Image image_id={event.image_id} aspectRatio={1 / 1} sx={{ position: 'relative', zIndex: -1 }} />
                        </Box>
                        <CardContent sx={{ pt: 0, alignSelf: 'center' }}>
                            <Typography variant="body2">
                                {event.organization.organization_name}
                            </Typography>
                            <Typography variant="h3">
                                {event.title}
                            </Typography>
                            <Stack direction={'row'} gap={1} sx={{ pb: 1, pt: 1, flexWrap: 'wrap' }}>
                                <Chip color='secondary' icon={<EventIcon />} label={date} />
                                <Chip color='secondary' icon={<ScheduleIcon />} label={time} />
                            </Stack>
                            <Typography variant="body2">
                                {event.extract}
                            </Typography>
                        </CardContent>
                    </Stack>
                </Link>
            </Card>

        )
    }
})

Event.displayName = 'Event'

export default Event