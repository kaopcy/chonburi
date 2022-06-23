import React from "react";
import { OverlayView } from "@react-google-maps/api";

const UserLocationMarker = ({ ...props }) => {
    return (
        <OverlayView {...props} mapPaneName={OverlayView.MARKER_LAYER}>
            <div className="relative">
                <div className="absolute right-[-8px] top-[-8px]  h-4 w-4 shrink-0 animate-gps-pulse rounded-full bg-red-400 border-2 border-white shadow-[0_0_0_0_rgba(245,66,66,1)]"></div>
            </div>
        </OverlayView>
    );
};

export default UserLocationMarker;
