import { FormattedDate } from "../types";

export function getDateTimeFromUTC(dateTime: string | Date) {
    const dt = new Date(dateTime)

    const date = dt.toLocaleDateString('fi', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        timeZone: 'Europe/Helsinki'
    });

    const time = dt.toLocaleTimeString('fi', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Helsinki'
        
    }).replace('.', ':');;

    return {
        date: date,
        time: time
    };
}

export default function (startDate: string | Date, endDate: string | Date): FormattedDate {
    const startDateTime = new Date(startDate)
    const endDateTime = new Date(endDate)

    const startDatePart = startDateTime.toLocaleDateString('fi', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        timeZone: 'Europe/Helsinki'
    });

    const endDatePart = endDateTime.toLocaleDateString('fi', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        timeZone: 'Europe/Helsinki'
    });

    const startTimePart = startDateTime.toLocaleTimeString('fi', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Helsinki'
    });

    const endTimePart = endDateTime.toLocaleTimeString('fi', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Helsinki'
    })

    return {
        startDate: startDatePart,
        endDate: endDatePart,
        startTime: startTimePart,
        endTime: endTimePart
    };
}