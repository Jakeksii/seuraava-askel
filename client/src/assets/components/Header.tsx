import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav/Nav";
const EmblaCarousel = lazy(() => import("./EmblaCarousel"));

type Props = {
    home?: boolean
}

// TÄN PITÄÄ MUUTTUA

export default function Header(props: Props) {
    if (props.home) return (
        <header>
            <Suspense fallback={<div className="h-[420px]" />}>
                <EmblaCarousel />
            </Suspense>
            <Nav />
        </header>
    )

    return (
        <header>
            <div className="bg-secondary-main p-1">
                <h1 className="text-center pb-0">
                    <Link className="text-white" to="/">Seuraava Askel</Link>
                </h1>
            </div>
        </header>
    )
}