import { ReactNode, createContext, useContext, useState } from "react";
import { SEARCH_DEFAULT_QUERY } from "../constants";

interface SearchContextType {
    query: string;
    setQuery: (value: string) => void;
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
    const [query, setQuery] = useState(SEARCH_DEFAULT_QUERY)

    const contextValue: SearchContextType = {
        query,
        setQuery
    }

    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    )
}