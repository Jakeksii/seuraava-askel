import { Fragment } from "react";
import { SEARCH_TYPE_CITY, SEARCH_TYPE_ORGANIZATION, SEARCH_TYPE_TITLE } from "../constants";

export function getHighlightedText(text: string, higlight: string) {
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

export function getPrefix(type: string) {
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