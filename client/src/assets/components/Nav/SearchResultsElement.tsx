import { Fragment } from "react"
import { SearchResult } from "../../types"
import { SEARCH_TYPE_CITY, SEARCH_TYPE_ORGANIZATION, SEARCH_TYPE_TITLE } from "../../constants"
import { Button } from "@mui/material"

type Props = | {
    error?: undefined
    searchValue: string
    searchResults: SearchResult[]
    searchResultClick: (text: string, type: string) => void
} | {
    error: string
}

function getHighlightedText(text: string, higlight: string) {
    // Split text on higlight term, include term itself into parts, ignore case
    var parts = text.split(new RegExp(`(${higlight})`, "gi"));
    return parts.map((part, index) => (
        <Fragment key={index}>
            {part.toLowerCase() === higlight.toLowerCase() ? (
                <b className="bg-secondary-main text-white rounded-sm">{part}</b>
            ) : (
                part
            )}
        </Fragment>
    ));
}

function getPrefix(type: string) {
    switch (type) {
        case SEARCH_TYPE_CITY:
            return 'Kaupunki'
        case SEARCH_TYPE_ORGANIZATION:
            return 'Seurakunta'
        case SEARCH_TYPE_TITLE:
            return 'Tapahtuma'
        default:
            return ''
    }
}

const SearchResultsElement = (props: Props) => {

    if (props.error !== undefined) { // Return error element
        return <h5 key={0} className='pt-2 text-center text-info-main'> {props.error} </h5>
    }

    if (props.searchResults.length === 0) { // 0 Search results
        return <h5 key={0} className='pt-2 text-center text-info-main'> {getHighlightedText(props.searchValue, props.searchValue)} {" ei tuottanut tuloksia."} </h5>
    }

    const results = props.searchResults.map((result: SearchResult, index) => {
        return (
            <li key={index} className='pb-1'>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => props.searchResultClick(result.data, result.type)} >
                    <div className='flex flex-col md:flex-row'>
                        <p className="pl-1 pr-1 text-white">{getPrefix(result.type)}</p>
                        <p>{getHighlightedText(result.data, props.searchValue)}</p>
                    </div>
                </Button>
            </li>
        )
    })

    return (
        <ul>{results}</ul>

    )
}

export default SearchResultsElement