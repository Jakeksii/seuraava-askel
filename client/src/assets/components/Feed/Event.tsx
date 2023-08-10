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
                .width(768)
                .height(549)
        )

    const distance = props.distance != null ?
        <div className="flex w-fit items-center rounded-full bg-[#1976d2] p-1">
            <LocationOnIcon style={{ color: 'white' }} />
            <h6 className="p-1 text-white">{props.distance} km</h6>
        </div>
        : null

    const formattedDates = useFormatDate(props.startDate, props.endDate)
    const date =
        <div className="flex items-center rounded-full bg-[#1976d2] p-1">
            <EventIcon style={{ color: 'white' }} />
            <h6 className="p-1 text-white">
                {(formattedDates.startDate === formattedDates.endDate) ?
                    formattedDates.startDate :
                    formattedDates.startDate + "-" + formattedDates.endDate}
            </h6>
        </div>
    const time =
        <div className="flex items-center rounded-full bg-[#1976d2] p-1">
            <ScheduleIcon style={{ color: 'white' }} />
            <h6 className="p-1 text-white">{formattedDates.startTime} - {formattedDates.endTime}</h6>
        </div>

    const organizationLink = encodeURI(props.organization.replace(/\s/g, '-'))
    const eventLink = organizationLink + "/" + props._id

    return (
        <div className="shadow-lg rounded-2xl bg-white h-[100%] cursor-pointer">
            <Link to={eventLink}>
                <div className="relative">
                    <div className="h-0 w-fit absolute float-right top-[10px] right-[10px]">
                        {distance}
                    </div>
                </div>

                <AdvancedImage className="rounded-t-2xl" cldImg={image} />
            <div className="m-2">
                {props.organization}
                <h2 className="text-black p-0">{props.title}</h2>
                <div className="flex gap-2 pt-2 pb-2">
                    {date}
                    {time}
                </div>
                <p className="text-black">{props.extract}</p>
            </div>
            </ Link>
        </div>

    )
}

