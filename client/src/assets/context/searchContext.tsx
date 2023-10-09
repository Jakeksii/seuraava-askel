import { ReactNode, createContext, useContext, useState } from "react";
import { Filters, SearchQuery } from "../../types";
import getSearchQuery from "../functions/getSearchQuery";

interface Values {
    query: SearchQuery
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
        query: getSearchQuery({type:"city", search:"Helsinki"})
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