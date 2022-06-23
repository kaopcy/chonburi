import { createContext, useState, useContext } from "react";

import { TRAVEL_MODE } from "../../config/selectorConstant";

const SelectedContext = createContext({
    selectedMode: null,
    setSelectedMode: () => {},
});

export const SelectorContextProvider = ({ children }) => {
    const [selectedMode, setSelectedMode] = useState(TRAVEL_MODE);
    return (
        <SelectedContext.Provider value={{ selectedMode, setSelectedMode }}>
            {children}
        </SelectedContext.Provider>
    );
};

export const useSelectorContext = () => useContext(SelectedContext);
