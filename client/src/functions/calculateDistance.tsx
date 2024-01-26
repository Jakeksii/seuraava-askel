export default function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
    // Radius of the Earth in kilometers
    const R = 6378.0;

    // Convert latitude and longitude from degrees to radians
    const lat1_rad = (lat1 * Math.PI) / 180;
    const lon1_rad = (lon1 * Math.PI) / 180;
    const lat2_rad = (lat2 * Math.PI) / 180;
    const lon2_rad = (lon2 * Math.PI) / 180;

    // Calculate the differences between latitudes and longitudes
    const dlat = lat2_rad - lat1_rad;
    const dlon = lon2_rad - lon1_rad;

    // Haversine formula to calculate the distance
    const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate the distance in meters
    const distance = R * c;

    return distance;
}