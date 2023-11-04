import CategoryIcon from '@mui/icons-material/Category';
import EuroIcon from '@mui/icons-material/Euro';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Link } from "react-router-dom";
import { PageImage } from "../../assets/components/PageImage";
import { LOREM_P, LOREM_P_MULTIPLE, SCREEN_WIDTH } from "../../assets/constants";
import { MetaTag, Tag } from "../../assets/partials/Tags";
import { EventContentProps } from "../../types";

export default function EventMobileContent({ data, formattedDates, organizationLink, distance, mapLink }: EventContentProps) {
    return (
        <article className='grid gap-4'>
            <PageImage className="rounded-2xl" image_id={data.image_id} width={(SCREEN_WIDTH > window.innerWidth) ? window.innerWidth + 100 : SCREEN_WIDTH} />
            <section>
                <div className="bg-white p-4 pt-6 pb-6 rounded-2xl" >
                    <Link className="text-slate-600 hover:text-slate-800 underline" to={organizationLink}>{data.organization.organization_name}</Link>
                    <h2 className='p-1'>{data.title}</h2>
                    <br/>
                    <Tag text={`${formattedDates.startDate} - ${formattedDates.endDate}`} icon={<ScheduleIcon />} />
                    <div className="flex flex-row gap-1 pt-1 justify-center">
                        <Tag text={`${formattedDates.startTime} - ${formattedDates.endTime}`} icon={<EventIcon />} />
                        <Tag text={`${distance} km`} icon={<LocationOnIcon />} />
                    </div>
                    <br />
                    <p>{LOREM_P}</p>
                    <br />
                    <Link to={mapLink} aria-label='hae reittiohjeet'>
                        <h5><u>{data.address.street}, {data.address.city}</u></h5>
                    </Link>
                    <section className='flex flex-wrap justify-center gap-2 pt-2'>
                        <MetaTag text='20' icon={<EuroIcon fontSize='small' />} />
                        <MetaTag text='Seminaari' icon={<CategoryIcon fontSize='small' />} />
                        <MetaTag text='Seminaari' icon={<CategoryIcon fontSize='small' />} />
                        <MetaTag text='Seminaari' icon={<CategoryIcon fontSize='small' />} />
                        <MetaTag text='Seminaari' icon={<CategoryIcon fontSize='small' />} />
                    </section>
                </div>
            </section>
            <section className='bg-white p-4 rounded-2xl'>
                <div className='text-justify'>
                    {LOREM_P_MULTIPLE}
                </div>
            </section>
        </article>
    )
}