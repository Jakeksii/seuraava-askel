import Loading from "../../../assets/components/partials/Loading";
import useInitPage from "../../../assets/hooks/useInitPage";
import NotFound from "../../NotFound";

export default function Subscription() {
    // Initialize
    const { useQueryResults: { data: organization, isLoading, isError } } = useInitPage()
    if(isLoading) return <main><Loading /></main>
    if(!organization || isError) return <NotFound />
    
    return (
        <main className="m-auto mb-6 text-center">
            <h2 className="p-2">Tilauksen ja tiimin hallinnointi sivu</h2>
        </main>
    )
}