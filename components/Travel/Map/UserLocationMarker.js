import React from "react";
import { OverlayView } from "@react-google-maps/api";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";

const UserLocationMarker = ({ position }) => {
    return (
        <OverlayView position={position} mapPaneName={OverlayView.FLOAT_PANE}>
            <div className="relative transition-transform hover:scale-110 ">
                <div className="flex-cen absolute left-[-9px] top-[-8px]   h-5  w-6 shrink-0 animate-gps-pulse-3 rounded-[50%] border-[3px] border-white bg-[#00aa6c]">
                    <div className="h-[5px] w-[7px]  rounded-[50%] bg-white"></div>
                    <div className="absolute bottom-1/2 h-[40px] w-[4px] rounded-full bg-text"></div>
                    <div className="flex-col-cen absolute -top-20 h-16 w-16 rounded-[50%] border-2 border-white bg-white shadow-lg">
                        <FontAwesomeIcon
                            icon={faPerson}
                            className="text-lg text-[#00aa6c]"
                        />
                        <div className="mt-1 font-sarabun text-xs font-bold text-text">
                            คุณ
                        </div>
                    </div>
                </div>
            </div>
        </OverlayView>
    );
};

export default UserLocationMarker;
