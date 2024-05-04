import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Box, Card, CardContent, Chip, Stack, Typography, styled } from "@mui/material";
import { format } from 'date-fns';
import fi from 'date-fns/locale/fi';
import parse from 'html-react-parser';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import CloudImage from 'src/components/images/image';
import useFormatDate from "src/functions/formatDate";
import { Event as EventType } from 'src/types';

type Props = {
    event: Omit<EventType, 'createdAt' | 'updatedAt' | '_id'>;
}

const Styled = styled('div')(({ theme }) => ({
    '*': {
        marginBlock: 0,
        padding: 0,
        boxSizing: 'border-box',
    },
    '& p': { ...theme.typography.body1 },
    '& h2': { ...theme.typography.h2 },
    '& h3': { ...theme.typography.h3 },
    '& ul, & ol': {
        paddingLeft: 50,
    },
}))

const Event = memo(({ event }: Props) => {

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
        <Card component={Link} to={'#'} sx={{ textDecoration: 'none', backgroundColor: 'white', color: 'black' }}>
            <Box>
                <Stack sx={{ flexDirection: { sm: 'column', md: 'row' } }}>
                    <Box sx={{ height: '100%', flexShrink: 0, flexGrow: 0 }}>
                        <CloudImage image_id={event.image_id} width={400} height={400} />
                    </Box>

                    <CardContent sx={{ pt: 0, alignSelf: 'center' }}>
                        <Typography variant="body2">
                            {event.organization.name}
                        </Typography>
                        <Typography variant="h2" component="h1">
                            {event.title}
                        </Typography>
                        <Stack direction={'row'} gap={1} sx={{ pb: 1, pt: 1, flexWrap: 'wrap' }}>
                            <Chip color='primary' icon={<EventIcon />} label={date} />
                            <Chip color='primary' icon={<ScheduleIcon />} label={time} />
                        </Stack>
                        <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                            {event.extract}
                        </Typography>
                    </CardContent>
                </Stack>

                {event.description &&
                    <Styled sx={{ p: 4 }}>
                        {parse(event.description)}
                    </Styled>}
            </Box>
        </Card>
    )
})

Event.displayName = 'Event'

export default Event