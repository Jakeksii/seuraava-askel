import LocationOffIcon from '@mui/icons-material/LocationOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocationContext } from "../../context/locationContext";
import { useSearchContext } from '../../context/searchContext';
import getSearchQuery from '../../functions/getSearchQuery';
import { WarningAlert } from "../Alerts";
import { LocationAccessDeniedDialog } from "../Dialogs";

type LocationiIcon = "notlisted" | "locationon" | "locationoff"

export default function LocationButton() {
    const searchContext = useSearchContext()
    const locationContext = useLocationContext()
    const [locationWarningOpen, setLocationWarning] = useState(false);
    const [locationAccessDialogOpen, setLocationAccessDialogOpen] = useState(false)
    const [icon, setIcon] = useState<LocationiIcon>(locationContext.values.locationOn ? "locationon" : "notlisted")
    const [mounted, setMounted] = useState(false)
    const locationWarningAction = (
        <Button color="inherit" size="small"
            onClick={() => { setLocationAccessDialogOpen(true); setLocationWarning(false) }} >
            Enable access
        </Button >
    )
    const locationClick = () => {
        locationContext.getLocation()
    }
    useEffect(() => {
        if (!mounted) return setMounted(true)

        if (locationContext.values.locationOn) {
            const query = getSearchQuery({ type: "location", location: { latitude: locationContext.values.coords.latitude, longitude: locationContext.values.coords.longitude } })
            searchContext.setValues({
                ...searchContext.values,
                query: query,
                search: undefined
            })
            setIcon("locationon")
        } else {
            setIcon("locationoff")
        }
    }, [locationContext])

    return (
        <>
            <Button // LOCATION BUTTON
                onClick={locationClick}
                aria-label="toggle location"
                variant='contained'
                size='large'
                color='primary'>
                {
                    icon === "notlisted" ? <NotListedLocationIcon color="info" /> : (icon === "locationon") ? <LocationOnIcon color="info" /> : <LocationOffIcon color="info" />
                }
            </Button>

            <WarningAlert
                open={locationWarningOpen}
                message='Location Access Denied'
                onClose={() => setLocationWarning(false)}
                action={locationWarningAction} />
            <LocationAccessDeniedDialog
                open={locationAccessDialogOpen}
                onClose={() => setLocationAccessDialogOpen(false)} />
        </>
    )
}