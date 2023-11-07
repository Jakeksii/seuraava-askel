import { Link } from "react-router-dom";
import EmblaCarousel from "./EmblaCarousel";
import Nav from "./Nav/Nav";

type Props = {
    home?: boolean
}

export default function Header(props: Props) {
    if (props.home) return (
        <header>
            <EmblaCarousel />
            <Nav />
        </header>
    )

    return (
        <header>
            <div className="bg-primary-light p-2 m-[6px] rounded-md shadow-md">
                <h1 className="text-center pb-0 ">
                    <Link className="text-white drop-shadow-md" to="/">SEURAAVA ASKEL</Link>
                </h1>
            </div>
        </header>
    )
}