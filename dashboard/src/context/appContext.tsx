import { useMemo, useState, useContext, createContext } from "react";

interface Session {
    token: string,
    user: {
        _id: string,
        first_name: string,
        last_name: string,
        email: string,
        verified: boolean,
        organizations?: [
            {
                organization_id: string,
                organization_name: string,
                role: "user" | "admin" | "owner",
                _id: string
            }
        ]
    }
    organization?: { // This is selected organization
        _id: string,
        name: string
    }
}

type AppContextType = {
    session?: Session
    setSession: (session: Session | undefined) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function useAppContext() {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('AppContext must be used within a AppContextProvider');
    }
    return context
}

export function AppContextProvider({ children }: { children: React.ReactNode }) {
    const dataFromSessionStorage = sessionStorage.getItem('session_data')
    const sessionData: Session | undefined = dataFromSessionStorage ? JSON.parse(dataFromSessionStorage) : undefined

    const [session, setSession] = useState<Session | undefined>(sessionData)

    const contextValue = useMemo(() => ({
        session: session,
        setSession: setSession
    }), [session, setSession]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}