import { BaseSyntheticEvent, useState } from "react"
import { IEvent, Organization } from "../../types"
import { FinalStepContent, Step1Content, Step2Content, Step3Content } from "./Steps"
import axios from "axios"
import { useAppContext } from "../../context/appContext"
import fs from 'fs'


type Props = {
    organization: Organization
}
// We use this Event type with event data that will be sended to server
// we omit (exclude) _id, 'organization'... fields because those are set in server so we dont send those values.
type Event = Omit<IEvent, '_id' | 'organization' | 'image_id' | 'createdAt' | 'updatedAt'>

// FOR TESTING
const eventTemplate: Event = {
    "start_date": "2023-07-19T13:30",
    "end_date": "2023-07-19T16:00",
    "title": "Digital Marketing Conference",
    "extract": "Stay ahead of the digital marketing trends at the Digital Marketing Conference.",
    "visible": true,
    "description": '',
    "address": {
        "street": "Puistokatu 2",
        "city": "Oulu",
        "state": "Pohjois-Pohjanmaa",
        "zipcode": "90100",
        "country": "Finland",
        "coordinates": [
            25.474613,
            65.013217
        ]
    },
    "event_meta": {}
}

export function CreateEvent({ organization }: Props) {
    // We need to instantiate event with empty data because changeEventValue() does not like undefined values

    const { user } = useAppContext()


    const [event, setEvent] = useState<Event>(eventTemplate)
    /*const [event, setEvent] = useState<Event>({
        start_date: '',
        end_date: '',
        title: '',
        description: '',
        extract: '',
        visible: true,
        address: organization.address, // we set the address to org adress
        event_meta: {},
    })*/

    const [imageData, setImageData] = useState<File>()

    function changeEventValue(e: BaseSyntheticEvent) {
        if (e.target.files[0]) {
            setImageData(e.target.files[0])
        } else {
            setEvent({
                ...event,
                // e.target.name takes input name prop and use it as key for new value
                // ex. if input name="title" fired this func. e.target.name = title
                //"title": e.target.value 
                [e.target.name]: e.target.value
            })
        }
    }
    function changeAddressValue(e: BaseSyntheticEvent) {
        setEvent({
            ...event,
            address: {
                ...event.address,
                [e.target.name]: e.target.value
            }
        })
    }

    function submitEvent() {
        console.log('Submitting event', event)

        // lets send this 
        // http://localhost:3001/api/events/create

        const formData = new FormData()
        formData.append('event', JSON.stringify(event))
        formData.append('image', imageData!)
        axios.post("http://localhost:3001/api/events/create", formData, {
            headers: {
                //'Content-Type': 'multipart/form-data', in Axios we dont need to specify content type because function does it for us based on payload type
                'Authorization': `${user?.token}`,
                'Organization': organization._id
            }
        })
            .then(response => {
                console.log("File uploaded, all good", response.data)
            })
            .catch(error => {
                console.error("File didnt go through", error)
            })

    }
    function nextStep(e: BaseSyntheticEvent) {
        e.preventDefault()
        console.log("Going to next step. Event object now", event)


    }

    // From
    return (
        <div className="overflow-auto">
            <section className="bg-secondary-main p-4 rounded-md">
                <p>Käytetään mui stepperiä <a href="https://mui.com/material-ui/react-stepper/" target="_blank"><u>Mui Stepper</u></a>
                    <br /> Ennenku alat tekemään stepperiä
                    <br /> tee toiminnallisuus valmiiks.
                    <br /> mutta koska tullaan käyttää stepperiä ni pilkotaan formi valmiiks
                    <br /> saat päättää mihin steppiin mikäki data tulee
                    <br /> Event preview voidaan laittaa viimeseks.
                </p>
                <br />

                <h3>Step 1</h3>
                {imageData && <div className="aspect-[4/3]">
                    <img
                        src={URL.createObjectURL(imageData)}
                        alt="Image"
                        className="h-full w-full object-cover rounded-2xl" />
                </div>}
                <Step1Content
                    event={event}
                    onChange={changeEventValue}
                    onSubmit={nextStep} />

                <h3>Step 2 Paikka</h3>
                <Step2Content
                    event={event}
                    onChange={changeAddressValue}
                    onSubmit={nextStep} />

                <h3>Step 3 Lisätiedot</h3>
                <Step3Content
                    event={event}
                    onChange={changeEventValue}
                    onSubmit={nextStep} />

                <h3>Final step</h3>
                <FinalStepContent
                    event={event}
                    onChange={() => { }}
                    onSubmit={submitEvent} />

            </section>
        </div>
    )
}