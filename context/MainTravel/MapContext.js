import { useContext } from "react";
import { createContext, useState } from "react";

const MapContext = createContext({
    map: null,
    setMap: () => {},
    isOpen: null,
    setIsOpen: () => {},
});

export const MapContextProvider = ({ children }) => {
    const [map, setMap] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <MapContext.Provider value={{ map, setMap, isOpen, setIsOpen }}>
            {children}
        </MapContext.Provider>
    );
};

export const useMapContext = () => useContext(MapContext);
