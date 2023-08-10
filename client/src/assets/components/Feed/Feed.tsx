import Nav from "./Nav/Nav"
import Events from "./Events"

export default function Feed() {
    const onFilterClick = () => {
        // When filter button is clicked
        console.log("Open Filter menu")
    }

    return (
        <div>
            <Nav
                onFilterClick={onFilterClick}
            />
            <div className={"m-4"}>
                <Events />
            </div>
        </div>
    )
}