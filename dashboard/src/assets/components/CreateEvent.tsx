import { BaseSyntheticEvent, useState } from "react"
import { IEvent, Organization } from "../types"
import { Button } from "@mui/material"

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
    function changeAdressValue(e: BaseSyntheticEvent) {
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
                <form className="grid" onSubmit={nextStep}>
                    <label htmlFor="image">Lataa kuva</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/png, image/jpeg"
                        required />
                    <label htmlFor="title">Otsikko</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={event.title}
                        onChange={changeEventValue} />
                    <label htmlFor="description">Lyhyt ote</label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        value={event.description}
                        onChange={changeEventValue} />

                    <Button type="submit" variant="contained" className="w-fit justify-self-end">Seuraava steppi {'>>'}</Button>
                </form>

                <h3>Step 2 aika ja paikka</h3>
                <form className="grid" onSubmit={nextStep}>
                    <label htmlFor="start_date">Aloitus aika</label>
                    <input
                        type="datetime-local"
                        id="start_date"
                        name="start_date"
                        required
                        value={event.start_date}
                        onChange={changeEventValue} />

                    <label htmlFor="end_date">Lopetus aika</label>
                    <input
                        type="datetime-local"
                        id="end_date"
                        name="end_date"
                        required
                        value={event.end_date}
                        onChange={changeEventValue} />

                    <label htmlFor="street">Street</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        required
                        value={event.address.street}
                        onChange={changeAdressValue}
                    />

                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={event.address.city}
                        onChange={changeAdressValue}
                    />

                    <label htmlFor="state">State</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        required
                        value={event.address.state}
                        onChange={changeAdressValue}
                    />

                    <label htmlFor="zipcode">Zipcode</label>
                    <input
                        type="text"
                        id="zipcode"
                        name="zipcode"
                        required
                        value={event.address.zipcode}
                        onChange={changeAdressValue}
                    />

                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        required
                        value={event.address.country}
                        onChange={changeAdressValue}
                    />

                    <Button type="submit" variant="contained" className="w-fit justify-self-end">
                        Seuraava steppi {'>>'}
                    </Button>
                </form>

                <h3>Step 3 Lisätiedot</h3>
                <form className="grid" onSubmit={nextStep}>

                    <label htmlFor="description">Lisätietoja (valinnainen)</label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        value={event.description}
                        onChange={changeEventValue} />
                        <br/>
                    <h4>event meta</h4>
                    <p>Ei kannata viel kauheesti miettii kun työn alla on koko meta homma</p>

                    <Button type="submit" variant="contained" className="w-fit justify-self-end">Seuraava steppi {'>>'}</Button>
                </form>

                <div className="grid">
                    <h3>Final step</h3>
                    <h4>Event Preview</h4>
                    <Button onClick={submitEvent} variant="contained" className="w-fit justify-self-end">Julkaise tapahtuma</Button>
                </div>
            </section>
        </div>
    )
}