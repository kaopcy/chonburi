import { useContext, useState } from "react";
import { createContext } from "react";

const MapContext = createContext({
    map: /**@type google.maps.Map */ (null),
    setMap: () => {},
    isPanning: null,
    setIsPanning: () => {},
});

export const MapContextProvider = ({ children }) => {
    const [map, setMap] = useState(/**@type google.maps.Map */ (null));
    const [isPanning, setIsPanning] = useState(false);
    return (
        <MapContext.Provider value={{ map, setMap , isPanning , setIsPanning }}>
            {children}
        </MapContext.Provider>
    );
};

export const useMapContext = () => useContext(MapContext);
