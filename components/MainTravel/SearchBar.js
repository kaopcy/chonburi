import React, { useState, useRef, useEffect } from "react";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

// import contexts
import { useMapContext } from "../../context/MainTravel/MapContext";
import { usePostsContext } from "../../context/MainTravel/PostContext";

const SearchBar = () => {
    const { isOpen } = useMapContext();
    const { filter, setFilter } = usePostsContext();

    useEffect(() => {
        inputRef.current.value = filter;
    }, [filter]);

    const inputRef = useRef(null);
    const timerRef = useRef(null);
    const onSearchQueryChange = (e) => {
        if (!timerRef.current) {
            timerRef.current = setTimeout(() => {
                timerRef.current = null;
                setFilter(e.target.value);
            }, 600);
        }
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    return (
        <div
            className={`group z-10 flex h-[47px] max-w-[250px] items-center  rounded-lg  border-2 border-text-lighterr bg-white py-1 px-2 group-focus-within:!border-primary group-focus-within:!shadow-blue md:rounded-xl   
                        ${
                            isOpen
                                ? "w-full text-sm xl:text-base"
                                : "w-full text-base"
                        }`}
        >
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="mr-2 text-text-lightest "
            />
            <input
                ref={inputRef}
                onChange={onSearchQueryChange}
                type="text"
                className="w-full bg-transparent px-1 placeholder:text-text-lighterr focus:outline-none focus:placeholder:text-opacity-0"
                placeholder="ค้นหาสถานที่..."
            />
            <FontAwesomeIcon
                onClick={() => {
                    setFilter("");
                    inputRef.current.value = "";
                }}
                icon={faXmark}
                className={`cursor-pointer text-red-500 transition-opacity  ${
                    filter?.length > 0 ? "opacity-100" : "opacity-0"
                }`}
            />
        </div>
    );
};

export default SearchBar;
