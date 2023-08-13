import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
const Search = lazy(() => import("./Feed/Nav/Search"));
const EmblaCarousel = lazy(() => import("./HeaderBanner/EmblaCarousel"));

type Props = {
    home?: boolean
}

export default function Header(props: Props) {
    if (props.home) return (
        <header>
            <Suspense fallback={<div className="h-[420px]" />}>
                <EmblaCarousel />
            </Suspense>
            <Suspense>
                <Search />
            </Suspense>
        </header>
    )

    return (
        <header>
            <div className="bg-secondary-dark p-1">
                <h1 className="text-center pb-0">
                    <Link className="text-white" to="/">Seuraava Askel</Link>
                </h1>
            </div>
        </header>
    )
}