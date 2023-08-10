import { ReactNode, createContext, useContext, useState } from "react";
import useLocation, { Location } from "../hooks/useLocation";

interface LocationState {
    locationOn: boolean
    coords: {
        longitude: number
        latitude: number
    }
    error: string | null
    updateLocation: (longitude: number, latitude: number) => void;
    clearLocation: () => void;
    locationError: (error: string) => void
    getLocation: () => void
}

const LocationContext = createContext<LocationState>({
    locationOn: false,
    coords: {
        longitude: 0,
        latitude: 0,
    },
    error: null,
    updateLocation: () => { },
    clearLocation: () => { },
    locationError: () => { },
    getLocation: () => { }
});

export function useLocationContext() {
    const context = useContext(LocationContext)
    if(!context) {
        throw new Error('useLocationContext must be used within a LocationContextProvider');
    }
    return context
}

export function LocationContextProvider({ children }: { children: ReactNode }) {

    const [state, setState] = useState<LocationState>({
        locationOn: false,
        coords: {
            longitude: 0,
            latitude: 0,
        },
        error: null,
        updateLocation: () => { },
        clearLocation: () => { },
        locationError: () => { },
        getLocation: () => { }
    })


    const getLocation = () => {
        const useLocationCallback = (location: Location) => {
            if (!location.error) {
                setState({
                    ...state,
                    locationOn: true,
                    coords: {
                        longitude: location.longitude,
                        latitude: location.latitude
                    }
                })
                return
            }
            console.log(location.error);
            setState({
                ...state,
                locationOn: false,
                coords: {
                    longitude: 0,
                    latitude: 0,
                },
                error: location.error
            })
            
        };
        useLocation(useLocationCallback);
    }

    const updateLocation = (longitude: number, latitude: number) => {
        setState({
            ...state,
            locationOn: true,
            coords: {
                longitude,
                latitude
            }
        })
    }

    const clearLocation = () => {
        setState({
            ...state,
            locationOn: false,
            error: null
        })
    }

    return (
        <LocationContext.Provider
            value={{
                ...state, updateLocation, clearLocation, getLocation
            }}>
            {children}
        </LocationContext.Provider>
    )
}