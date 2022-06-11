import { createContext, useState, useContext } from "react";

const SelectedContext = createContext({
    selectedMode: null,
    setSelectedMode: () => {},
});

export const SelectorContextProvider = ({ children }) => {
    const [selectedMode, setSelectedMode] = useState("รายละเอียด");
    return (
        <SelectedContext.Provider value={{ selectedMode, setSelectedMode }}>
            {children}
        </SelectedContext.Provider>
    );
};

export const useSelectorContext = () => useContext(SelectedContext);
