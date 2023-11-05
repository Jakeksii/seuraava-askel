import { BaseSyntheticEvent, useState } from "react"
import { IEvent, Organization } from "../../types"
import { FinalStepContent, Step1Content, Step2Content, Step3Content } from "./Steps"

type Props = {
    organization: Organization
}
// We use this Event type with event data that will be sended to server
// we omit (exclude) _id, 'organization'... fields because those are set in server so we dont send those values.
type Event = Omit<IEvent, '_id' | 'organization' | 'image_id' | 'createdAt' | 'updatedAt'>

export function CreateEvent({ organization }: Props) {
    // We need to instantiate event with empty data because changeEventValue() does not like undefined values
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

    function changeEventValue(e: BaseSyntheticEvent) {
        setEvent({
            ...event,
            // e.target.name takes input name prop and use it as key for new value
            // ex. if input name="title" fired this func. e.target.name = title
            //"title": e.target.value 
            [e.target.name]: e.target.value
        })
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
                    onChange={()=>{}}
                    onSubmit={submitEvent} />

            </section>
        </div>
    )
}