import { createContext, useState, useContext } from "react";

const ActiveOtherPlaceContext = createContext({
    activeOtherPlace: null,
    setActiveOtherPlace: () => {},
});

export const ActiveOtherPlaceProvider = ({ children }) => {
    const [activeOtherPlace, setActiveOtherPlace] = useState([]);
    return (
        <ActiveOtherPlaceContext.Provider
            value={{ activeOtherPlace, setActiveOtherPlace }}
        >
            {children}
        </ActiveOtherPlaceContext.Provider>
    );
};

export const useActiveOtherPlace = () => useContext(ActiveOtherPlaceContext);
