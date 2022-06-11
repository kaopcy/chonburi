import { createContext, useContext , useState , useEffect } from "react";

const UserLocationContext = createContext({ userLocation: null, userLocationError: null });

export const UserLocationProvider = ({ children }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (e) => {
                    const { coords } = e;
                    setUserLocation({
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        lat: coords.latitude,
                        lng: coords.longitude,
                    });
                },
                (e) => {
                    setError(e.message);
                    setUserLocation({
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
    return (
        <UserLocationContext.Provider
            value={{ userLocation, userLocationError: error }}
        >
            {children}
        </UserLocationContext.Provider>
    );
};

export const useUserLocation = () => useContext(UserLocationContext);
