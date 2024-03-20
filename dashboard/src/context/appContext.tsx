import { useMemo, useState, useContext, createContext } from "react";

interface Session {
    token: string
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
    const token = localStorage.getItem('token')
    const sessionData: Session | undefined = token ? { token: token } : undefined
    const [session, setSession] = useState<Session | undefined>(sessionData)

    const [selectedOrganization, setSelectedOrganization] = useState(localStorage.getItem('selected_organization'))

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