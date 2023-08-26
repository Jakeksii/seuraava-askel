import { Button, Slider } from "@mui/material";
import { useState } from "react";

export default function Filters() {

    const [value, setValue] = useState(40)

    return (
        <section className="h-[100%] bg-secondary-main p-5 flex flex-col justify-center gap-2">
            <Button color='info' variant='contained' fullWidth><p>Filtteri</p></Button>
            <section className="m-2">
                <p>Maksimietäisyys</p>
                <Slider color="primary" aria-label='distance' value={value} onChange={(_, newValue: number | number[]) => { setValue(newValue as number) }} />
            </section>
            <br />
        </section>
    )
}