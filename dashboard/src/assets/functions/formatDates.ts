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