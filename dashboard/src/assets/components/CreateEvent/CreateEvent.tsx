import axios from "axios"
import { BaseSyntheticEvent, useState } from "react"
import { geocodeByPlaceId, getLatLng } from "react-places-autocomplete"
import { useAppContext } from "../../context/appContext"
import getAddressObject from "../../functions/getAddressObject"
import { Address, IEvent, Organization, PlaceType } from "../../types"
import GooglePlacesAutocomplete from "../GooglePlacesAutocomplete"
import { FinalStepContent, Step1Content, Step2Content, Step3Content } from "./Steps"

import { StepContent } from "@mui/material"
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import EventPreview from "./Event/EventPreview"

type Props = {
    organization: Organization
}
// We use this Event type with event data that will be sended to server
// we omit (exclude) _id, 'organization'... fields because those are set in server so we dont send those values.
type Event = Omit<IEvent, '_id' | 'organization' | 'image_id' | 'createdAt' | 'updatedAt'>



export function CreateEvent({ organization }: Props) {
    // We need to instantiate event with empty data because changeEventValue() does not like undefined values
    const { user } = useAppContext()
    const [event, setEvent] = useState<Event>({
        start_date: '',
        end_date: '',
        title: '',
        description: '',
        extract: '',
        visible: true,
        address: organization.address, // we set the address to org adress
        event_meta: {},
    })


    // we save image as File to this state
    // we can then append this data to FormData witch we send to backend
    const [imageData, setImageData] = useState<File>()

    function changeEventValue(e: BaseSyntheticEvent) {
        if (e.target.files) {
            // if e.target has files this func. call came from onChange() of <input type=file /> tag
            // https://vscode.dev/github/Jakeksii/seuraava-askel/blob/create-event/dashboard/src/assets/components/CreateEvent/Steps.tsx#L21
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

        // We create formdata object
        const formData = new FormData()
        formData.append('event', JSON.stringify(event))
        formData.append('image', imageData!)

        // Send data to server
        console.warn('This request should be using useQuery mutate')
        axios.post("http://localhost:3001/api/events/create", formData, {
            headers: {
                // in Axios we dont need to specify content type because function does it for us based on payload type
                // 'Content-Type': 'multipart/form-data',
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

    // GOOGLE AUTOCOMPLETE
    function onPlaceSelected(place: PlaceType) {
        geocodeByPlaceId(place.place_id)
            .then(results => getLatLng(results[0])
                .then(latLng => {
                    console.log(results)

                    const address: Address = {
                        ...getAddressObject(results[0]),
                        coordinates: [latLng.lng, latLng.lat]
                    }

                    setEvent({
                        ...event,
                        address: address
                    })
                })
                .catch(error => console.error('Error', error)))
    }

    const steps = [
        {
            stepLabel: "Tapahtuma",
            stepContent: <>
                {imageData && <div className="aspect-[4/3] w-[50%]">
                    <img
                        src={URL.createObjectURL(imageData)}
                        alt="Image"
                        className="h-full w-full object-cover rounded-2xl" />
                </div>}
                <Step1Content
                    event={event}
                    onChange={changeEventValue}
                    onBack={stepBack}
                    onSubmit={nextStep} />
            </>

        },
        {
            stepLabel: "Sijainti",
            stepContent: <>
                <GooglePlacesAutocomplete onPlaceSelected={onPlaceSelected} />
                <Step2Content
                    event={event}
                    onChange={changeAddressValue}
                    onBack={stepBack}
                    onSubmit={nextStep} />
            </>
        },
        {
            stepLabel: "Lisätiedot",
            stepContent: <>
                <Step3Content
                    event={event}
                    onChange={changeEventValue}
                    onBack={stepBack}
                    onSubmit={nextStep} />
            </>
        },
        {
            stepLabel: "Esikatselu",
            stepContent: <>
                <EventPreview
                    event={event}
                    organization={organization}
                    imageData={imageData} />
                <FinalStepContent
                    event={event}
                    onChange={() => { }}
                    onBack={stepBack}
                    onSubmit={submitEvent} />
            </>
        },

    ];
    const [activeStep, setActiveStep] = useState(0)
    const [completedSteps] = useState<number[]>([]);
    function nextStep(e: BaseSyntheticEvent) {
        e.preventDefault()
        completedSteps.push(activeStep)
        setActiveStep(activeStep + 1)
    }
    function stepBack() {
        setActiveStep(activeStep + -1)
    }
    // From
    return (
        <div className="overflow-auto">
            <section className="bg-secondary-main p-2 rounded-md">
                <Stepper orientation="vertical" activeStep={activeStep}>
                    {
                        steps.map((step, i) => {
                            return (
                                <Step key={step.stepLabel}>
                                    <StepLabel onClick={() => {if(i in completedSteps) setActiveStep(i) }}>{step.stepLabel}</StepLabel>
                                    <StepContent TransitionProps={{ unmountOnExit: false }} sx={{ padding: 0, margin: 0, border: 0 }}>
                                        {step.stepContent}
                                    </StepContent>
                                </Step>
                            )
                        })
                    }
                </Stepper>
            </section>
        </div>
    )
}