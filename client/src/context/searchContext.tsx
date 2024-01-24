import { ReactNode, createContext, useContext, useState } from "react";
import getLocation from "src/functions/getLocation";

type Location = {
    isError: false;
    coordinates: {
        latitude: number;
        longitude: number;
    }
} | {
    isError: true
}

type Values = {
    search: string | undefined
    location: {
        isLoading: boolean
        isError: boolean
        on: true
        coordinates: {
            longitude: number
            latitude: number
        }
    } | {
        isLoading: boolean
        isError: boolean
        on: false
    }
}
interface SearchContextType {
    values: Values
    setValues: (value: Values) => void;
    updateLocation: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function useSearchContext() {
    const context = useContext(SearchContext)
    if (!context) {
        throw new Error('useSearchContext must be used within a SearchContextProvider');
    }
    return context
}

export function SearchContextProvider({ children }: { children: ReactNode }) {
    const [values, setValues] = useState<Values>({
        search: undefined,
        location: {
            isLoading: false,
            isError: false,
            on: false,
        }
    })

    const locationCallback = (location: Location) => {
        if(location.isError){
            setValues({
                ...values,
                location: {
                    isLoading: false,
                    isError: true,
                    on: false,
                }
            })
        } else {
            setValues({
                ...values,
                location: {
                    isLoading: false,
                    isError: false,
                    on: true,
                    coordinates: location.coordinates
                }
            })
        }
    }

    const updateLocation = () => {
        setValues({
            ...values,
            location: {
                ...values.location,
                isLoading: true
            }
        })
        getLocation(locationCallback)
    }


    const contextValue: SearchContextType = {
        values,
        setValues,
        updateLocation
    }

    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    )
}