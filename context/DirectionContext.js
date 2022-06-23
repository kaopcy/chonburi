import React, { createContext, useState, useContext, useMemo } from "react";

// import constants
import { tempRoutes } from "../config/mapConstants/tempRoutes";
import { maneuverMap } from "../utils/ManeuverMap";

const DirectionContext = createContext({
    direction: null,
    setDirection: () => {},
});

const ActiveDirectionContext = createContext({
    activeDirectionNumber: null,
    activeDirection: null,
    setActiveDirectionNumber: () => {},
    increaseActiveDirectionNumber: () => {},
    decreaseActiveDirectionNumber: () => {},
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

    const length = useMemo(() => {
        return direction ? direction.routes[0].legs[0].steps.length : null;
    }, []);

    const increaseActiveDirectionNumber = () => {
        if (!length || activeDirectionNumber === length-1) return;
        setActiveDirectionNumber((e) => e + 1);
    };

    const decreaseActiveDirectionNumber = () => {
        if (!length || activeDirectionNumber === 0) return;
        setActiveDirectionNumber((e) => e - 1);
    };

    return (
        <ActiveDirectionContext.Provider
            value={{
                activeDirectionNumber,
                activeDirection,
                setActiveDirectionNumber,
                decreaseActiveDirectionNumber,
                increaseActiveDirectionNumber,
            }}
        >
            <DirectionContext.Provider value={{ direction, setDirection }}>
                {children}
            </DirectionContext.Provider>
        </ActiveDirectionContext.Provider>
    );
};

export const useDirectionContext = () => {
    const { direction, setDirection } = useContext(DirectionContext);
    const currentRoutes = useMemo(
        () => direction?.routes[0].legs[0],
        [direction]
    );
    const shapedRoutes = useMemo(() => {
        const getSplitRoute = (s) => {
            const regex = /(<([^>]+)>)/gi;
            let splitIndex = null;
            splitIndex = s.indexOf("<div");
            if (splitIndex === -1) return { text: s.replace(regex, "") };
            return {
                text: s.slice(0, splitIndex).replace(regex, ""),
                extra: s.slice(splitIndex).replace(regex, ""),
            };
        };

        return currentRoutes
            ? currentRoutes.steps.map((e) => ({
                  key: e.encoded_lat_lngs,
                  distance: e.distance?.text,
                  icon: maneuverMap(e.maneuver),
                  ...getSplitRoute(e.instructions),
              }))
            : null;
    }, [currentRoutes]);
    return {
        direction,
        setDirection,
        shapedRoutes,
        currentRoutes
    };
};
export const useActiveDirection = () => {
    const { activeDirection, ...rest } = useContext(ActiveDirectionContext);
    return {
        ...rest,
        activeDirectionCoord: activeDirection
            ? {
                  lat:
                      typeof activeDirection.lat_lngs[0].lat === "function"
                          ? activeDirection.lat_lngs[0].lat()
                          : activeDirection.lat_lngs[0].lat,
                  lng:
                      typeof activeDirection.lat_lngs[0].lng === "function"
                          ? activeDirection.lat_lngs[0].lng()
                          : activeDirection.lat_lngs[0].lng,
              }
            : null,
    };
};
