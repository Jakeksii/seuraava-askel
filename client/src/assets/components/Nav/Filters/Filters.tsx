import { Checkbox, Slider } from "@mui/material";

import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from "react";
import { Filters as FiltersType } from "../../../../types";
import { useLocationContext } from '../../../context/locationContext';
import { useSearchContext } from "../../../context/searchContext";
import useGetAvailableFilters from "../../../hooks/api-hooks/useGetAvailableFilters";
import Select from "./Select";

type HandleFilterChangeProps = {
    filter: "meta.denomination" | "meta.language" | "meta.price.value" | "distance"
    value: number
} | {
    filter: "meta.types"
    value: [{label:string,id:number,key:number}]
} | {
    filter: "meta.size"
    toggled: boolean
    value: number
}


export default function Filters() {
    const { values: contextValues, setValues: setContextValues } = useSearchContext()
    const { values: location } = useLocationContext()

    const [filters, setFilters] = useState<FiltersType>({
        ...contextValues.filters
    })

    const { isLoading, data: availableFilters } = useGetAvailableFilters({
        currentFilters: filters,
        location: location.locationOn
            ? {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,

            }
            : undefined
    })

    function handleFilterChange(props: HandleFilterChangeProps) {
        switch (props.filter) {
            case "meta.types":
                const types = props.value.map((obj) => obj.key)
                setFilters({
                    ...filters,
                    meta: {
                        ...filters.meta,
                        // we need to set this value to undefined it we are trying to set empty array
                        // because our server returns no filters with empty array.
                        // if value is undefined our server does not care about it.
                        // but we still need to set the value because we are setting ...filters.meta on above. 
                        // so we need to kind of clear meta.types value by setting it to undefined if it is empty.
                        ["meta.types"]: types.length===0 ? undefined:types 
                    }
                })
                break;
            
            case "meta.size":
                const sizes = filters.meta?.["meta.size"] ?? []
                if (props.toggled) {
                    sizes?.push(props.value); // Add the value when toggled is true
                  } else {
                    const indexToRemove = sizes?.indexOf(props.value) ?? -1 // Find the index of the value
                    if (indexToRemove !== -1) {
                      sizes?.splice(indexToRemove, 1); // Remove the value when toggled is false
                    }
                  }
                setFilters({
                    ...filters,
                    meta: {
                        ...filters.meta,
                        ["meta.size"]: sizes.length===0 ? undefined : sizes
                    }
                })
                break;
            
            case "distance":
                setFilters({
                    ...filters,
                    min_distance: 0,
                    max_distance: props.value
                })
                break;
            
            default:
                throw new Error("You need to specify filter type");
        }
    }

    

    return (
        <section className="h-full flex flex-col justify-center gap-2 overflow-auto">
            <div>
                <section className="p-4">
                    <Select onChange={handleFilterChange} availableFilters={availableFilters}/>
                </section>

                {/*
                <section className="p-4">
                    <p>Maksimietäisyys</p>
                    <div className="pl-4 pr-4">
                        <Slider
                            min={10}
                            max={100}
                            step={5}
                            disabled={isLoading || !location.locationOn}
                            color="secondary"
                            valueLabelDisplay="auto"
                            valueLabelFormat={(x) => { return `${x} km` }} // Lyhyt functio joka uudelleen formattaa valuen
                            onChangeCommitted={(_, v) => handleFilterChange({ filter: "distance", value: v as number })}
                        />
                    </div>
                </section>
                */}

                <section className="p-4">
                    <div className="flex justify-center">
                        <FormControlLabel
                            disabled={isLoading || !(availableFilters?.size?.some(item => item.value === 0))}
                            value="top"
                            control={<Checkbox color="secondary" />}
                            label="Pieni"
                            labelPlacement="bottom"
                            onChange={(_, checked) => handleFilterChange({ filter:"meta.size", toggled:checked, value:0 })}
                        />
                        <FormControlLabel
                            disabled={isLoading || !(availableFilters?.size?.some(item => item.value === 1))}
                            value="top"
                            control={<Checkbox color="secondary" />}
                            label="Keskisuuri"
                            labelPlacement="bottom"
                            onChange={(_, checked) => handleFilterChange({ filter:"meta.size", toggled:checked, value:1 })}
                        />
                        <FormControlLabel
                            disabled={isLoading || !(availableFilters?.size?.some(item => item.value === 2))}
                            value="top"
                            control={<Checkbox color="secondary" />}
                            label="Suuri"
                            labelPlacement="bottom"
                            onChange={(_, checked) => handleFilterChange({ filter:"meta.size", toggled:checked, value:2 })}
                        />
                    </div>
                </section>

                {/*
                <section className="p-4">
                    <p>Hinta</p>
                    <div className="pl-4 pr-4">
                        <Slider
                            min={10}
                            max={100}
                            step={5}
                            disabled={isLoading}
                            color="secondary"
                            valueLabelDisplay="auto"
                            valueLabelFormat={(x) => { return `${x} €` }}
                        />
                    </div>
                </section>
                */}
            </div>
        </section>
    )
}