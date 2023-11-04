import { FormattedDate } from "../../types";

export default function (startDate: Date, endDate: Date): FormattedDate {
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