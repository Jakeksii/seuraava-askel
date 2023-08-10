import { Fragment } from "react"
import { SearchResult } from "../../../types"
import { SEARCH_TYPE_CITY, SEARCH_TYPE_ORGANIZATION, SEARCH_TYPE_TITLE } from "../../../constants"

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
                <b style={{ backgroundColor: "#5398dd", borderRadius: '5px', color: 'whitesmoke' }}>{part}</b>
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
        return (
            <div className='absolute w-[100%] bg-white text-black grid grid-cols-1 rounded-b-md shadow-lg'>
                <h5 key={0} className='mb-2'> {props.error} </h5>
            </div>
        )
    }

    if (props.searchResults.length === 0) { // 0 Search results
        return (
            <div className='absolute w-[100%] bg-white text-black grid grid-cols-1 rounded-b-md shadow-lg'>
                <h5 key={0} className='m-2'> {getHighlightedText(props.searchValue, props.searchValue)} {" ei tuottanut tuloksia."} </h5>
            </div>
        )
    }

    const results = props.searchResults.map((result: SearchResult, index) => {
        const classlist = index === 0 ? "hover:font-bold border-b-2 selected" : "hover:font-bold"
        return (
            <li key={index} className={classlist}>
                <button onClick={() => props.searchResultClick(result.data, result.type)} className='m-1 text-left flex flex-col box-border md:flex-row'>
                    <p className="pl-1 pr-1 text-slate-600">{getPrefix(result.type)}</p>
                    <p>{getHighlightedText(result.data, props.searchValue)}</p>
                </button>
            </li>
        )
    })

    return (
        <ul>{results}</ul>

    )
}

export default SearchResultsElement