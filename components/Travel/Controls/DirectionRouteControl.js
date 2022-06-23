import React from "react";
import { useActiveDirection } from "../../../context/DirectionContext";
import { useSelectorContext } from "../../../context/Travel/SelectorContext";

// import configs
import { DIRECTION_MODE } from "../../../config/selectorConstant";

const DirectionRouteControl = () => {
    const { decreaseActiveDirectionNumber, increaseActiveDirectionNumber } =
        useActiveDirection();
    const { selectedMode } = useSelectorContext();

    return (
        selectedMode === DIRECTION_MODE && (
            <div className="absolute bottom-2  left-0 z-10 flex h-10 w-full items-center justify-around bg-white">
                <div
                    className="h-5 w-5 rounded-full shadow-md"
                    onClick={() => {
                        decreaseActiveDirectionNumber();
                    }}
                ></div>
                <div
                    className="h-5 w-5 rounded-full shadow-md"
                    onClick={() => {
                        increaseActiveDirectionNumber();
                    }}
                ></div>
            </div>
        )
    );
};

export default DirectionRouteControl;
