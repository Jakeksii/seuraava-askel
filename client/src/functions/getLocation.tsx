export type Location = {
    isError: false;
    coordinates: {
        latitude: number;
        longitude: number;
    }
} | {
    isError: true
}

export default function getLocation(callback: (location: Location) => void): void {

    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                callback({
                    isError: false,
                    coordinates: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }
                })
            },
            () => { // Error callback
                callback({
                    isError: true,
                })
            }
        );
    } else {
        callback({
            isError: true,
        })
        console.error("Location error: Geolocation is not supported by this browser.")
    }
}