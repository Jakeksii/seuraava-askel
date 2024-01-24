import { Helmet } from "react-helmet-async";
import FeedView from "src/views/feed/FeedView";

export default function IndexPage() {

    return (
        <>
            <Helmet>
                <title> Seuraava Askel </title>
            </Helmet>
            
            <FeedView />
        </>
    )
}