import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { BigCalendar } from './big-calendar';
// ----------------------------------------------------------------------


type Event = {
  _id: number
  title: string,
  start: Date,
  end: Date,
  allDay: boolean 
}

const now = new Date();

const events: Event[] = [
  {
    _id: 1,
    title: "Meeting with Team",
    start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0), // Today at 10:00 AM
    end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0),   // Today at 11:00 AM
    allDay: false
  },
  {
    _id: 2,
    title: "Lunch with Client",
    start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 30), // Today at 12:30 PM
    end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 30),   // Today at 1:30 PM
    allDay: true
  },
  {
    _id: 3,
    title: "Webinar on Technology Trends",
    start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 15, 0), // Tomorrow at 3:00 PM
    end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 17, 0),   // Tomorrow at 5:00 PM
    allDay: false
  },
  {
    _id: 4,
    title: "Project Deadline",
    start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 9, 0),  // Day after tomorrow at 9:00 AM
    end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 17, 0),  // Day after tomorrow at 5:00 PM
    allDay: true
  },
];

export default function EventsView() {

  return (
    <Container>
      <Typography variant="h4" pb={5}>Katsele ja muokkaa tapahtumia</Typography>
      <BigCalendar events={events} />
    </Container>
  );
}