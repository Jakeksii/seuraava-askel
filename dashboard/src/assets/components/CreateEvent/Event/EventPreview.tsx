import { Link } from "react-router-dom";
import formatDates from "../../../functions/formatDates";
import { IEvent, Organization } from "../../../types";
import { Tag } from "../../partials/Tags";

import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';

// We use this Event type with event data that will be sended to server
// we omit (exclude) _id, 'organization'... fields because those are set in server
type Event = Omit<IEvent, '_id' | 'organization' | 'image_id' | 'createdAt' | 'updatedAt'>
type Props = {
    event: Event
    organization: Organization
    imageData?: File
}

export default function EventPreview({ event, organization, imageData }: Props) {

    const formattedDates = formatDates(event.start_date, event.end_date)
    const organizationLink = "/" + encodeURI(organization.name.replace(/\s/g, '-'))
    //const distance = Math.round(calculateDistance(coords.longitude, coords.latitude, data.address.coordinates[0], data.address.coordinates[1]))
    const mapLink = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURI(`${event.address.street} ${event.address.zipcode} ${event.address.city} ${event.address.state} ${event.address.country}`)

    // Render page
    return (

        <article className='grid gap-4 h-[30rem] scale-half'>
            {imageData && <div className="aspect-[4/3]">
                <img
                    src={URL.createObjectURL(imageData)}
                    alt="Image"
                    className="h-full w-full object-cover rounded-2xl" />
            </div>}
            <section>
                <div className="bg-white p-4 pt-6 pb-6 rounded-2xl" >
                    <Link target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-800 underline" to={'https://seuraava-askel.cyclic.app'+organizationLink}>{organization.name}</Link>
                    <h2 className='p-1'>{event.title}</h2>
                    <br />
                    <Tag text={`${formattedDates.startDate} - ${formattedDates.endDate}`} icon={<ScheduleIcon />} />
                    <div className="flex flex-row gap-1 pt-1 justify-center">
                        <Tag text={`${formattedDates.startTime} - ${formattedDates.endTime}`} icon={<EventIcon />} />
                        <Tag text={`35 km`} icon={<LocationOnIcon />} />
                    </div>
                    <br />
                    <p>{event.extract}</p>
                    <br />
                    <Link target="_blank" rel="noopener noreferrer" to={mapLink} aria-label='hae reittiohjeet'>
                        <h5><u>{event.address.street}, {event.address.city}</u></h5>
                    </Link>
                </div>
            </section>
            {event.description &&
                <section className='bg-white p-4 rounded-2xl'>
                    <div className='text-justify'>
                        {event.description}
                    </div>
                </section>}

        </article>
    )
}
