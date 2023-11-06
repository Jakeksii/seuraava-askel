import { ReactNode, createContext, useContext, useState } from "react";
import { User } from "../types";
import { useQueryClient } from "react-query";

type Organization = {
    _id: string
    name: string
}

interface AppContextType {
    user?: User
    setUser: (user: User | undefined) => void
    organization?: Organization
    setOrganization: (organization: Organization | undefined) => void
    logOut: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function useAppContext() {
    const context = useContext(AppContext)
    if(!context) {
        throw new Error('AppContext must be used within a AppContextProvider');
    }
    return context
}

export function AppContextProvider({ children }: { children: ReactNode }) {
    const userFromSession = localStorage.getItem('user_data')
    const userData: User = userFromSession ? JSON.parse(userFromSession) : undefined
    
    const [user, setUser] = useState<User | undefined>(userData)
    const [organization, setOrganization] = useState<Organization | undefined>(undefined)

    
    const logOut = () => {
        setUser(undefined)
        setOrganization(undefined)
        localStorage.removeItem('user_data')
        useQueryClient().clear();
    }
    const contextValue: AppContextType = {
        user,
        setUser,
        organization,
        setOrganization,
        logOut
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}