import { Button, Slider } from "@mui/material";
import { useState } from "react";

export default function Filters() {

    const [value, setValue] = useState(40)

    return (
        <section className="h-[100%] bg-primary-main p-5 flex flex-col justify-center gap-2">
            <div className="shadow-2xl shadow-zinc-900/60 rounded-2xl">
                <Button sx={{
                    borderRadius: '10px'
                }} color='info' variant='contained' fullWidth><h4>Filtteri</h4></Button>
                <section className="m-2">
                    <p className="font-semibold">Maksimietäisyys</p>
                    <Slider aria-label='distance' color="secondary" value={value} onChange={(_, newValue: number | number[]) => { setValue(newValue as number) }} />
                </section>
                <br />
            </div>
        </section>
    )
}