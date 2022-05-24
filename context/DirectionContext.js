import React, { createContext, useState, useContext } from "react";

import { tempRoutes } from "../config/mapConstants/tempRoutes";

const DirectionContext = createContext({
    direction: null,
    setDirection: () => {},
});

const ActiveDirectionContext = createContext({
    activeDirection: null,
    setActiveDirection: () => {},
});

export const DirectionProvider = ({ children }) => {
    // const [direction, setDirection] = useState(
    //     /**@type google.maps.DirectionsResult */ (null)
    // );

    const [direction, setDirection] = useState(tempRoutes);
    const [activeDirection, setActiveDirection] = useState(0);

    return (
        <ActiveDirectionContext.Provider
            value={{ activeDirection, setActiveDirection }}
        >
            <DirectionContext.Provider value={{ direction, setDirection }}>
                {children}
            </DirectionContext.Provider>
        </ActiveDirectionContext.Provider>
    );
};

export const useDirectionContext = ()=> useContext(DirectionContext);
export const useActiveDirection = () => useContext(ActiveDirectionContext);
