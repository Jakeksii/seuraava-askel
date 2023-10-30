import { Button } from "@mui/material";
import { Filters as FiltersType } from "../../../../types";
import { useLocationContext } from '../../../context/locationContext';
import useGetAvailableFilters from "../../../hooks/api-hooks/useGetAvailableFilters";
import Select from "./Select";

type HandleFilterChangeProps = {
    filter: "denomination" | "types" | "size" | "language"
    value: [{ label: string, id: number, key: string }]
}
interface Props {
    filters: FiltersType
    setFilters: (filters: FiltersType) => void
}

export default function Filters({ filters, setFilters }: Props) {
    const { values: location } = useLocationContext()

    const { isLoading, data: availableFilters } = useGetAvailableFilters({
        currentFilters: { meta: {} }, // put filters here to get active filters
        location: location.locationOn
            ? {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }
            : undefined
    })

    function handleFilterChange(props: HandleFilterChangeProps) {
        const selected = props.value.map((obj) => obj.key)
        setFilters({
            ...filters,
            meta: {
                ...filters.meta,
                // we need to set this value to undefined it we are trying to set empty array
                // because our server returns no filters with empty array.
                // if value is undefined our server does not care about it.
                // but we still need to set the value because we are setting ...filters.meta on above. 
                // so we need to kind of clear meta.types value by setting it to undefined if it is empty.
                [props.filter]: selected.length === 0 ? undefined : selected
            }
        })
    }
    function resetFilters() {
        setFilters({
            meta: {
                
            }
        })
    }



    return (
        <section className="h-full flex flex-col justify-center gap-2 overflow-auto">
            <div>
                <section className="p-4">
                    <Select isLoading={isLoading} onChange={handleFilterChange} filterType="denomination" availableFilters={availableFilters?.denomination} selectedFilters={filters.meta?.denomination} />
                </section>

                <section className="p-4">
                    <Select isLoading={isLoading} onChange={handleFilterChange} filterType="types" availableFilters={availableFilters?.types} selectedFilters={filters.meta?.types} />
                </section>

                <section className="p-4">
                    <Select isLoading={isLoading} onChange={handleFilterChange} filterType="language" availableFilters={availableFilters?.language} selectedFilters={filters.meta?.language} />
                </section>

                <section className="p-4">
                    <Select isLoading={isLoading} onChange={handleFilterChange} filterType="size" availableFilters={availableFilters?.size} selectedFilters={filters.meta?.size} />
                </section>

                <section className="p-4 text-center">
                    <Button onClick={resetFilters} color="secondary">Nollaa suodattimet</Button>
                </section>
            </div>
        </section>
    )
}