import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { memo } from 'react';
import { Link } from 'react-router-dom';
import CloudImage from 'src/components/images/image';

import useFormatDate from "src/functions/formatDate";
import { useIsMobile } from 'src/hooks/useResponsive';
import { Event as EventType } from 'src/types';
import { format } from 'date-fns';
import fi from 'date-fns/locale/fi';

type Props = {
    event: EventType
}

const Event = memo(({ event }: Props) => {
    const mobile = useIsMobile()

    const startDate = format(new Date(event.start_date), 'dd.MM.', { locale: fi })
    const endDate = format(new Date(event.start_date), 'dd.MM.', { locale: fi })

    

    const formattedDates = useFormatDate(event.start_date, event.end_date)
    const date = (
        <Typography variant="body2" fontWeight={'bold'}>
            {
                (startDate === endDate)
                    ? startDate
                    : startDate + " - " + endDate
            }
        </Typography>
    )

    const time = (
        <Typography variant="body2" fontWeight={'bold'}>
            {formattedDates.startTime} - {formattedDates.endTime}
        </Typography>
    )

    return (
        <Card component={Link} to={`/events/${event._id}`} sx={{ textDecoration: 'none' }}>
            <Box>
                <Stack direction={mobile ? 'column' : 'row'}>
                    <Box sx={{ width: 200, height: 200 }}>
                        <CloudImage image_id={event.image_id} width={200} height={200} />
                    </Box>

                    <CardContent sx={{ pt: 0, alignSelf: 'center' }}>
                        <Typography variant="h5">
                            {event.title}
                        </Typography>
                        <Stack direction={'row'} gap={1} sx={{ pb: 1, pt: 1, flexWrap: 'wrap' }}>
                            <Chip icon={<EventIcon />} label={date} />
                            <Chip icon={<ScheduleIcon />} label={time} />
                        </Stack>
                        <Typography variant="body2">
                            {event.extract}
                        </Typography>
                    </CardContent>

                </Stack>
            </Box>
        </Card>
    )
})

Event.displayName = 'Event'

export default Event