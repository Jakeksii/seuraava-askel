import Loading from "../../../assets/components/partials/Loading"
import useInitPage from "../../../assets/hooks/useInitPage"
import NotFound from "../../NotFound"

export default function Analytics() {
    // Initialize
    const { useQueryResults: { data: organization, isLoading, isError } } = useInitPage()
    if (isLoading) return <main><Loading /></main>
    if (!organization || isError) return <NotFound />

    return (
        <main>
            <h2 className="p-2">Analytiikka sivu</h2>
        </main>
    )
}