import { ReactNode, createContext, useContext, useState } from "react";
import { Organization, User } from "../types";


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
    const userFromSession = sessionStorage.getItem('user_data')
    const userData: User = userFromSession ? JSON.parse(userFromSession) : undefined

    const organizationFromSession = sessionStorage.getItem('organization_data')
    const organizationData = organizationFromSession ? JSON.parse(organizationFromSession) : undefined
    
    const [user, setUser] = useState<User | undefined>(userData)
    const [organization, setOrganization] = useState<Organization | undefined>(organizationData)

    
    const logOut = () => {
        setUser(undefined)
        setOrganization(undefined)
        sessionStorage.removeItem('user_data')
        sessionStorage.removeItem('organization_data')
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