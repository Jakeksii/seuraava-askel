import { Helmet } from "react-helmet-async";
import Events from "../assets/components/Feed/Events";

export default function IndexPage() {
    return (
        <>
            <Helmet>
                <title> Seuraava Askel </title>
            </Helmet>
            
            <Events />
        </>
    )
}