import { Button } from "@mui/material";
import { IEvent } from "../../types";
import { BaseSyntheticEvent } from "react";

type Event = Omit<IEvent, '_id' | 'organization' | 'image_id' | 'createdAt' | 'updatedAt'>
type StepContentProps = {
    event: Event
    onChange: (e: BaseSyntheticEvent) => void
    onBack: () => void
    onSubmit: (e: BaseSyntheticEvent) => void
}

export function Step1Content(props: StepContentProps) {
    return (
        <form className="grid" onSubmit={props.onSubmit}>
            <label htmlFor="image">Lataa kuva</label>
            <input
                type="file"
                id="image"
                name="image"
                accept="image/png, image/jpeg"
                onChange={props.onChange}
                required />
            <label htmlFor="title">Otsikko</label>
            <input
                type="text"
                id="title"
                name="title"
                required
                value={props.event.title}
                onChange={props.onChange} />
            <label htmlFor="start_date">Aloitus aika</label>
            <input
                type="datetime-local"
                id="start_date"
                name="start_date"
                required
                value={props.event.start_date}
                onChange={props.onChange} />

            <label htmlFor="end_date">Lopetus aika</label>
            <input
                type="datetime-local"
                id="end_date"
                name="end_date"
                required
                value={props.event.end_date}
                onChange={props.onChange} />
            <label htmlFor="extract">Lyhyt ote</label>
            <textarea
                id="extract"
                name="extract"
                required
                value={props.event.extract}
                onChange={props.onChange} />

            <br />
            <div className="flex justify-self-end gap-2">
                <Button type="submit" variant="contained">Seuraava</Button>
            </div>
        </form>
    )
}

export function Step2Content(props: StepContentProps) {
    return (
        <form className="grid" onSubmit={props.onSubmit}>
            <br />
            <label htmlFor="street">Street</label>
            <input
                type="text"
                id="street"
                name="street"
                required
                value={props.event.address.street}
                onChange={props.onChange}
            />
            <label htmlFor="city">City</label>
            <input
                type="text"
                id="city"
                name="city"
                required
                value={props.event.address.city}
                onChange={props.onChange}
            />
            <label htmlFor="state">State</label>
            <input
                type="text"
                id="state"
                name="state"
                required
                value={props.event.address.state}
                onChange={props.onChange}
            />
            <label htmlFor="zipcode">Zipcode</label>
            <input
                type="text"
                id="zipcode"
                name="zipcode"
                required
                value={props.event.address.zipcode}
                onChange={props.onChange}
            />
            <label htmlFor="country">Country</label>
            <input
                type="text"
                id="country"
                name="country"
                required
                value={props.event.address.country}
                onChange={props.onChange}
            />
            <br />
            <div className="flex justify-self-end gap-2">
                <Button onClick={props.onBack}>Takaisin</Button>
                <Button type="submit" variant="contained">Seuraava</Button>
            </div>

        </form>
    )
}

export function Step3Content(props: StepContentProps) {
    return (
        <form className="grid" onSubmit={props.onSubmit}>

            <label htmlFor="description">Lisätietoja (valinnainen)</label>
            <textarea
                id="description"
                name="description"
                value={props.event.description}
                onChange={props.onChange} />
            <br />
            <div className="flex justify-self-end gap-2">
                <Button onClick={props.onBack}>Takaisin</Button>
                <Button type="submit" variant="contained">Seuraava</Button>
            </div>
        </form>
    )
}

export function FinalStepContent(props: StepContentProps) {
    return (
        <div className="grid">
            <div className="flex justify-self-end gap-2">
                <Button onClick={props.onBack}>Takaisin</Button>
                <Button onClick={props.onSubmit} variant="contained" className="w-fit justify-self-end">Julkaise</Button>
            </div>
        </div>
    )
}