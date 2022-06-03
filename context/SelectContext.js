import { createContext , useContext, useState } from "react";

const SelectContext = createContext({
    select: "รายละเอียด",
    setSelect: () => {},
});
const SelectedPostContext = createContext({
    selectedPost: null,
    setSelectedPost: () => {},
});

export const SelectProvider = ({ children }) => {
    const [select, setSelect] = useState('รายละเอียด')
    const [selectedPost, setSelectedPost] = useState(null)
    return (
        <SelectContext.Provider value={{ select ,setSelect }}>
            <SelectedPostContext.Provider value={{ selectedPost ,setSelectedPost }}>
                {children}
            </SelectedPostContext.Provider>
        </SelectContext.Provider>
    );
};

export const useSelect = ()=> useContext(SelectContext)
export const useSelectedPost = ()=> useContext(SelectedPostContext)