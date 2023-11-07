import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CategoryIcon from '@mui/icons-material/Category';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TranslateIcon from '@mui/icons-material/Translate';
import { Link } from "react-router-dom";
import { PageImage } from "../../assets/components/PageImage";
import { SCREEN_WIDTH } from "../../assets/constants";
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
                    <br />
                    <Tag text={`${formattedDates.startDate} - ${formattedDates.endDate}`} icon={<ScheduleIcon />} />
                    <div className="flex flex-row gap-1 pt-1 justify-center">
                        <Tag text={`${formattedDates.startTime} - ${formattedDates.endTime}`} icon={<EventIcon />} />
                        <Tag text={`${distance} km`} icon={<LocationOnIcon />} />
                    </div>
                    <br />
                    <p>{data.extract}</p>
                    <br />
                    <Link to={mapLink} aria-label='hae reittiohjeet'>
                        <h5><u>{data.address.street}, {data.address.city}</u></h5>
                    </Link>
                    <section className='flex flex-wrap justify-center gap-2 pt-2'>
                        {data.meta['denomination'] && <MetaTag text={data.meta['denomination']} icon={<AccountBalanceIcon fontSize='small' />} />}
                        {data.meta['types'] && data.meta['types'].map((type, i) => <MetaTag Key={i} text={type} icon={<CategoryIcon fontSize='small' />} />)}
                        {data.meta['size'] && <MetaTag text={data.meta['size']} icon={<GroupsIcon fontSize='small' />} />}
                        {data.meta['language'] && <MetaTag text={data.meta['language']} icon={<TranslateIcon fontSize='small' />} />}
                    </section>
                </div>
            </section>
            {data.description &&
                <section className='bg-white p-4 rounded-2xl'>
                    <div className='text-justify' dangerouslySetInnerHTML={{ __html: data.description }}>
                    </div>
                </section>}
        </article>
    )
}