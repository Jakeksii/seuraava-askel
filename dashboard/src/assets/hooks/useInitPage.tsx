import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppContext } from "../context/appContext"
import useDetailedOrganizations from "./api-hooks/useDetailedOrganisations"

// This hook is made to reduce written code
// This is called on every page
export default function () {
    // We take org_id from URL so that you can always come back to organization from link
    const organization_id = useParams().organization_id!
    const appContext = useAppContext()
    const useQueryResults = useDetailedOrganizations({ organization_id: organization_id, token: appContext.user!.token })
    useEffect(() => {
        if (!appContext.organization) appContext.setOrganization(useQueryResults.data)
    }, [useQueryResults.data])
    return {
        appContext,
        useQueryResults
    }
}