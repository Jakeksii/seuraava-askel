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

export default function EventContent({ data, formattedDates, organizationLink, distance, mapLink }: EventContentProps) {
    return (
        <article className='grid gap-3'>
            <div className='bg-white rounded-2xl'>
                <section className='grid grid-cols-2 items-center'>
                    <PageImage className='rounded-2xl' image_id={data.image_id} width={((SCREEN_WIDTH / 2) > window.innerWidth) ? window.innerWidth : SCREEN_WIDTH} />
                    <section >
                        <div className='bg-white p-4 rounded-2xl'>
                            <Link className="text-slate-600 hover:text-slate-800 underline" to={organizationLink}>{data.organization.organization_name}</Link>
                            <h2 className='pt-2'>{data.title}</h2>
                            <div className='flex justify-center'>
                                <Tag text={`${formattedDates.startDate} - ${formattedDates.endDate}`} icon={<ScheduleIcon />} />
                            </div>
                            <div className="flex flex-row gap-2 pt-2">
                                <Tag text={`${formattedDates.startTime} - ${formattedDates.endTime}`} icon={<EventIcon />} />
                                <Tag text={`${distance} km`} icon={<LocationOnIcon />} />
                            </div>
                            <div className='pt-4'>
                                <Link to={mapLink} aria-label='hae reittiohjeet'>
                                    <h5><u>{data.address.street}, {data.address.city}</u></h5>
                                </Link>
                            </div>
                        </div>
                    </section>
                </section>
                <div className='p-4 pt-4'>
                    <p className='text-justify'>{data.extract}</p>
                </div>
                <section className='flex justify-center gap-2 pb-4'>
                    {data.meta['denomination'] && <MetaTag text={data.meta['denomination']} icon={<AccountBalanceIcon fontSize='small' />} />}
                    {data.meta['types'] && data.meta['types'].map((type) => <MetaTag text={type} icon={<CategoryIcon fontSize='small' />} />)}
                    {data.meta['size'] && <MetaTag text={data.meta['size']} icon={<GroupsIcon fontSize='small' />} />}
                    {data.meta['language'] && <MetaTag text={data.meta['language']} icon={<TranslateIcon fontSize='small' />} />}
                </section>
            </div>
            {data.description &&
                <section className='bg-white mt-2 p-4 rounded-2xl'>
                    <div className='text-justify' dangerouslySetInnerHTML={{ __html: data.description }}>
                    </div>
                </section>
            }
        </article>
    )
}