import { useEffect, useState } from "react";

const useGeolocation = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (e) => {
                    const { coords } = e;
                    setCurrentLocation({
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        lat: coords.latitude,
                        lng: coords.longitude,
                    });
                },
                (e) => {
                    setError(e.message);
                    setCurrentLocation({
                        latitude: 13.736717,
                        longitude: 100.523186,
                        lat: 13.736717,
                        lng: 100.523186,
                    });
                },
                { enableHighAccuracy: true }
            );
        }
    }, []);

    return { currentLocation, error };
};

export default useGeolocation;
