import { Button, Slider } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import { useState } from "react";


interface Filters {
    "meta.size"?: string
    "meta.price"?: number,
    "meta.online"?: boolean,
    "meta.language"?: string,
    "meta.types"?: string,
    "address.coordinates"?: number
}

export default function Filters() {

    //const {values, setValues} = useSearchContext()
    const [filters, setFilters] = useState<Filters>({})

    // submit function
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        // try {
        //     const response = await fetch("/", {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(data),
        //     });

        //     if (response.ok) {
        //         console.log("data sent")
        //     } else {
        //         console.log("Didnt send nothing")
        //     }
        // } catch (error) {
        //     console.log('Error:', error);
        // }

    }

    // Filter functions

    // Tapahtumatyyppi
    const handleEventTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {


        setFilters({
            ...filters, 
            "meta.types": e.target.value
            
        })
    }

    // Tapahtumakoko
    const sizeValue = (e:any) => {
        const value = e.target.value
        let size = "Pieni"
        switch(value){
            case 0:
                size = "Pieni"
                break
            case 1:
                size = "Keskisuuri"
                break
            case 2:
                size = "Suuri"
                break

        }
        setFilters({
            ...filters, 
            "meta.size": size
            
        })
        return `${value}`;
      }
    
    // Kielivalinta
    const handleLanguageChange = (event: SelectChangeEvent) => {
        
        setFilters({
            ...filters, 
            "meta.language": event.target.value
            
        })
      };

    // Maksullisuus
    const pricevalue = (_: any, value:number) => {
        
        setFilters({
            ...filters, 
            "meta.price": value
        })

        // TSEKKAA TOIMIIKO
        console.log(value)
      }

    // Online
    const handleOnlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        setFilters({
            ...filters,
            "meta.online": event.target.checked
        })
        
      };

    // Distance 

    const distanceValue = (value: number) => {
        setFilters({
            ...filters, 
            "address.coordinates": value
            
        })
    }

    return (
        <section className="h-full p-5 flex flex-col justify-center gap-2">
            <div className="shadow-2xl shadow-zinc-900/60 rounded-2xl" onSubmit={(e) => handleSubmit}>
                <Button sx={{
                    borderRadius: '10px'
                }} color='info' variant='contained' fullWidth><h4>Filtteri</h4></Button>

                <label>Tapahtumatyyppi</label>
                <input
                type="text"
                value={filters["meta.types"]}
                onChange={handleEventTypeChange}
                />



                <div className="bg-red-800">
                    <h5>{filters["meta.size"]}</h5>
                </div>

                <h1 className="bg-blue-800">{filters["meta.size"]}</h1>
                <Slider
                onChange={(e) => sizeValue}
                aria-label="Event-Size"
                defaultValue={0}
                
                valueLabelDisplay="off"

                step={1}
                marks={true}
                min={0}
                max={2}
                />
                
                
                <div className="bg-red-800">
                    <h5>this {filters["meta.language"]} this</h5>
                </div>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filters["meta.language"]}
                    label="language"
                    onChange={handleLanguageChange}
                    >
                    <MenuItem value={"Finnish"}>Finnish</MenuItem>
                    <MenuItem value={"English"}>English</MenuItem>
                    <MenuItem value={"Swedish"}>Swedish</MenuItem>
                </Select>


                <div className="bg-red-800">
                    <h5>Maksullinen</h5>
                </div>

                <Slider
                    aria-label="Price"
                    defaultValue={30}
                    onChange={(_, v) => pricevalue}
                    valueLabelDisplay="auto"
                    step={10}
                    marks={true}
                    min={0}
                    max={200}
                />
                

                <div className="bg-red-800">
                    <h5>Online</h5>
                </div>

                <Switch
                checked={filters["meta.online"]}
                onChange={handleOnlineChange}
                inputProps={{ 'aria-label': 'controlled' }}
                />

                <section className="m-2">
                    <p className="font-semibold">Maksimietäisyys</p>
                    <Slider aria-label='distance' color="secondary" value={filters["address.coordinates"]} onChange={(_, newValue: number | number[]) => { distanceValue(newValue as number) }} />
                </section>
                <br />
            </div>
        </section>
    )
}