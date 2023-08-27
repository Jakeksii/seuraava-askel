import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Link } from "react-router-dom";
import { CLOUDINARY_CLOUDNAME } from "../../constants";
import useFormatDate from "../../hooks/useFormatDate";

type Props = {
    imageID: string
    title: string
    extract: string
    organization: string
    distance: number | null
    startDate: Date
    endDate: Date
    _id: string
}

export default function Event(props: Props) {

    const image = new CloudinaryImage(props.imageID, { cloudName: CLOUDINARY_CLOUDNAME })
        .resize(
            fill()
                .gravity("auto")
                .width(450)
                .height(300)
        )

    const distance = props.distance != null ?       // väri
        <div className="flex w-fit items-center rounded-full bg-[#455e5d] shadow shadow-zinc-900/60 p-1">
            <LocationOnIcon style={{ color: 'white' }} />
            <h6 className="p-1 text-white">{props.distance} km</h6>
        </div>
        : null

    const formattedDates = useFormatDate(props.startDate, props.endDate)
    const date =
        <div className="flex items-center rounded-full bg-[#455e5d] shadow shadow-zinc-900/60 p-1">
            <EventIcon style={{ color: 'white' }} />
            <h6 className="p-1 text-white">
                {(formattedDates.startDate === formattedDates.endDate) ?
                    formattedDates.startDate :
                    formattedDates.startDate + "-" + formattedDates.endDate}
            </h6>
        </div>
    const time =
        <div className="flex items-center rounded-full bg-[#455e5d] shadow shadow-zinc-900/60 p-1">
            <ScheduleIcon style={{ color: 'white' }} />
            <h6 className="p-1 text-white">{formattedDates.startTime} - {formattedDates.endTime}</h6>
        </div>

    const organizationLink = encodeURI(props.organization.replace(/\s/g, '-'))
    const eventLink = organizationLink + "/" + props._id

    return (
        <div className="m-auto shadow-2xl shadow-zinc-900/60 max-w-[350px] md:max-w-[808px] md:w-auto rounded-2xl bg-white h-[100%] cursor-pointer mb-6">
            <Link to={eventLink}>
                <div className="md:grid grid-flow-col grid-cols-[350px,1fr] rounded-2xl items-center">
                    <AdvancedImage className="rounded-2xl" cldImg={image} />
                    <div className="m-4">
                        
                        {props.organization}
                        <h2 className="text-black p-0">{props.title}</h2>
                        <div className="flex gap-2 pt-2 pb-2">
                            {distance}
                            {date}
                            {time}
                            
                        </div>
                        <p className="text-black">{props.extract}</p>
                        <br />
                    </div>
                </div>

            </ Link>
        </div>
    )
}

