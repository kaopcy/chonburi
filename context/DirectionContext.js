import React, { createContext, useState, useContext, useMemo } from "react";

import { tempRoutes } from "../config/mapConstants/tempRoutes";

const DirectionContext = createContext({
    direction: null,
    setDirection: () => {},
});

const ActiveDirectionContext = createContext({
    activeDirectionNumber: null,
    activeDirection: null,
    setActiveDirectionNumber: () => {},
});

export const DirectionProvider = ({ children }) => {
    // const [direction, setDirection] = useState(
    //     /**@type google.maps.DirectionsResult */ (null)
    // );

    const [direction, setDirection] = useState(tempRoutes);
    const [activeDirectionNumber, setActiveDirectionNumber] = useState(0);

    const activeDirection = useMemo(() => {
        return direction
            ? direction.routes[0].legs[0].steps[activeDirectionNumber]
            : null;
    }, [direction, activeDirectionNumber]);

    return (
        <ActiveDirectionContext.Provider
            value={{
                activeDirectionNumber,
                activeDirection,
                setActiveDirectionNumber,
            }}
        >
            <DirectionContext.Provider value={{ direction, setDirection }}>
                {children}
            </DirectionContext.Provider>
        </ActiveDirectionContext.Provider>
    );
};

export const useDirectionContext = () => useContext(DirectionContext);
export const useActiveDirection = () => {
    const { activeDirection, ...rest } = useContext(ActiveDirectionContext);
    return {
        ...rest,
        activeDirectionCoord: activeDirection
            ? activeDirection.lat_lngs[0]
            : null,
    };
};
