import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Image } from "src/components/Image";

import useFormatDate from "src/functions/formatDate";
import { useIsMobile } from 'src/hooks/useResponsive';
// import { secondary } from 'src/theme/palette'; // Lisää tää myöhemmin 
import { Event as EventType } from 'src/types';

type Props = {
    event: EventType
}

const Event = memo(({ event }: Props) => {
    const isMobile = useIsMobile()


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