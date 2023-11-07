import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Loading from "../../../assets/components/partials/Loading";
import useInitPage from "../../../assets/hooks/useInitPage";
import NotFound from "../../NotFound";

export default function Dasboard() {
    // Initialize
    const { useQueryResults: { data: organization, isLoading, isError } } = useInitPage()
    if (isLoading) return <main><Loading /></main>
    if (!organization || isError) return <NotFound />

    return (
        <main>
            <section className="pt-6">
                <p>Tähän vois laittaa joskus jonkun hienon lyhyen analytiikka previewin ja vaikka seurakunnan kuvan.</p>
            </section>
            <section className="pt-6 flex flex-col w-fit m-auto justify-center gap-2">
                <Button color='info' variant='contained' component={Link} to={"/" + organization._id + "/events"}><h3>Tapahtumat</h3></Button>
                <Button color='info' variant='contained' component={Link} to={"/" + organization._id + "/organization"}><h3>Kotisivut</h3></Button>
                <Button color='info' variant='contained' component={Link} to={"/" + organization._id + "/organization"}><h3>Organisaatio</h3></Button>
                <Button color='info' variant='contained' component={Link} to={"/" + organization._id + "/analytics"}><h3>Analytiikka</h3></Button>
                <Button color='info' variant='contained' component={Link} to={"/" + organization._id + "/subscription"}><h3>Tiimi & Tilaus</h3></Button>
                <br />
                <Button color='info' variant='outlined' component={Link} to="/"><h3>Vaihda seurakuntaasi</h3></Button>
            </section>
        </main>
    )
}