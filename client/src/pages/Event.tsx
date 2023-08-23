import EventIcon from '@mui/icons-material/Event'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ScheduleIcon from '@mui/icons-material/Schedule'
import { CircularProgress } from "@mui/material"
import { Suspense } from "react"
import { Link, useParams } from "react-router-dom"
import Footer from "../assets/components/Footer"
import Header from "../assets/components/Header"
import { PageImage } from "../assets/components/PageImage"
import { useLocationContext } from "../assets/context/locationContext"
import useGetEventPage from "../assets/hooks/api-hooks/useGetEventPage"
import calculateDistance from "../assets/functions/calculateDistance"
import useFormatDate from "../assets/hooks/useFormatDate"
import NotFound from "./NotFound"
import { useAppContext } from '../assets/context/appContext'

const skeleton = (
    <>
        <Header />
        <main className="grid place-items-center text-white pt-3" aria-busy={true}>
            <CircularProgress color="inherit" size={50} />
        </main>
    </>

)
const notFound = (
    <Suspense><NotFound /></Suspense>
)

export default function EventPage() {
    const {user} = useAppContext()
    //window.scrollTo({ top: 0, behavior: "instant" })
    const { event_id } = useParams()
    const locationContext = useLocationContext()
    if (!event_id) return notFound
    const { data, isLoading, isError } = useGetEventPage({ _id: event_id })
    if (isLoading) return skeleton
    if (!data || isError) return notFound

    const organizationLink = "/" + encodeURI(data.organization.organization_name.replace(/\s/g, '-'))

    const distance = locationContext.locationOn
        ? Math.round(calculateDistance(locationContext.coords.longitude, locationContext.coords.latitude, data.address.coordinates[0], data.address.coordinates[1]))
        : null
    const kilometers = distance != null ?
        <div className="flex items-center justify-center rounded-full bg-[#1976d2] p-0 sm:p-1">
            <LocationOnIcon style={{ color: 'white' }} />
            <h6 className="p-1 text-white">{distance} km</h6>
        </div>
        : null

    const formattedDates = useFormatDate(data.start_date, data.end_date)
    const date =
        <div className="flex items-center justify-center rounded-full bg-[#1976d2] p-0 sm:p-1">
            <EventIcon style={{ color: 'white' }} />
            <h6 className="p-1 text-white">
                {formattedDates.startDate + " - " + formattedDates.endDate}
            </h6>
        </div>
    const time =
        <div className="flex items-center justify-center rounded-full bg-[#1976d2] p-0 sm:p-1">
            <ScheduleIcon style={{ color: 'white' }} />
            <h6 className="p-1 text-white">{formattedDates.startTime} - {formattedDates.endTime}</h6>
        </div>

    return (
        <>
            <Header />
            <main className="m-auto">
                {user && "Logged in user: "+user.user.first_name + " " + user.user.last_name}
                <section>
                    <PageImage image_id={data.image_id} width={(820 > window.innerWidth) ? window.innerWidth+100 : 820}/>
                </section>
                <section className="m-4">
                    <div className="text-center">
                        <Link className="text-slate-50 hover:text-slate-300 underline" to={organizationLink}>{data.organization.organization_name}</Link>
                        <h1>{data.title}</h1>
                    </div>
                    <div className="bg-white text-black p-4 pt-1 rounded-2xl" >
                        <div className="flex flex-col gap-2 pt-2 pb-2 justify-center grow sm:flex-row">
                            {kilometers}
                            {date}
                            {time}
                        </div>
                        <div className="w-fit m-auto" dangerouslySetInnerHTML={{ __html: data.extract }} />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}