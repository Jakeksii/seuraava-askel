import LocationOffIcon from '@mui/icons-material/LocationOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import { Button, CircularProgress } from "@mui/material";
import { useSearchContext } from 'src/context/searchContext';

export default function LocationButton() {
    const searchContext = useSearchContext()

    const locationClick = () => {
        if(searchContext.values.location.on){
            return searchContext.setValues({
                ...searchContext.values,
                location: {
                    isError: false,
                    isLoading: false,
                    on: false
                }
            })
        }
        searchContext.updateLocation()
    }

    const locationIcon = () => {
        if(searchContext.values.location.isLoading) return <CircularProgress size={20} thickness={5} color='secondary'/>
        if(searchContext.values.location.on) return <LocationOnIcon color='success'/>
        if(searchContext.values.location.isError) return <LocationOffIcon color='error'/>
        return <NotListedLocationIcon />
    }

    return (
        <Button onClick={locationClick} variant='contained'>
            {locationIcon()}
        </Button>
    )
}