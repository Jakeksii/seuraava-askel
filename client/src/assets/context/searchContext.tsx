import { ReactNode, createContext, useContext, useState } from "react";
import { SEARCH_DEFAULT_QUERY } from "../constants";

interface Filters {
    "meta.size"?: string
    "meta.price"?: number,
    "meta.online"?: boolean,
    "meta.language"?: string,
    "meta.types"?: string,
    "address.coordinates"?: number
}
interface Values {
    query: string
    search?: string
    filters?: Filters
}
interface SearchContextType {
    values: Values
    setValues: (value: Values) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function useSearchContext() {
    const context = useContext(SearchContext)
    if(!context) {
        throw new Error('useSearchContext must be used within a SearchContextProvider');
    }
    return context
}

export function SearchContextProvider({ children }: { children: ReactNode }) {
    const [values, setValues] = useState({
        query: SEARCH_DEFAULT_QUERY
    })

    const contextValue: SearchContextType = {
        values,
        setValues
    }

    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    )
}