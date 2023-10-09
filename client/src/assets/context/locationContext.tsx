import { ReactNode, createContext, useContext, useState } from "react";
import useLocation, { Location } from "../hooks/useLocation";

interface Values {
    locationOn: boolean
    coords: {
        longitude: number
        latitude: number
    }
}

interface LocationContextType {
    values: Values
    getLocation: () => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function useLocationContext() {
    const context = useContext(LocationContext)
    if(!context) {
        throw new Error('useLocationContext must be used within a LocationContextProvider');
    }
    return context
}

export function LocationContextProvider({ children }: { children: ReactNode }) {

    const [values, setValues] = useState({
        locationOn: false,
        coords: {
            longitude: 50,
            latitude: 25,
        },
        filter: {

        }
    })

    const getLocation = () => {
        const useLocationCallback = (location: Location) => {
            if (!location.error) {
                setValues({
                    ...values,
                    locationOn: true,
                    coords: {
                        longitude: location.longitude,
                        latitude: location.latitude
                    }
                })
                
                console.log(location)
                return
            }
            console.error(location.error);
        };
        useLocation(useLocationCallback);
    }

    const contextValue: LocationContextType = {
        values,
        getLocation
    }


    return (
        <LocationContext.Provider
            value={contextValue}>
            {children}
        </LocationContext.Provider>
    )
}