export type Location = {
  latitude: number;
  longitude: number;
  error: string | null;
};

const useLocation = (callback: (location: Location) => void): void => {
  if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location: Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        };
        callback(location);
      },
      (error) => {
        const location: Location = {
          latitude: 0,
          longitude: 0,
          error: error.message,
        };
        console.log("Location error: " + error)
        callback(location);
      }
    );
  } else {
    const location: Location = {
      latitude: 0,
      longitude: 0,
      error: 'Geolocation is not supported by this browser.',
    };
    console.log("Location error: Geolocation is not supported by this browser.")
    callback(location);
  }
};

export default useLocation;
