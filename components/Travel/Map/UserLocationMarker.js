import React from "react";
import { OverlayView } from "@react-google-maps/api";

const UserLocationMarker = ({ ...props }) => {
    return (
        <OverlayView {...props} mapPaneName={OverlayView.MARKER_LAYER}>
            <div className="relative">
                <div className="absolute right-[-8px] top-[-8px]  h-4 w-4 shrink-0 animate-gps-pulse rounded-full bg-red-400 border border-white  shadow-[0_0_0_0_rgba(245,66,66,1)]"></div>
                <div className="absolute right-[-8px] top-[-8px]  h-4 w-4 shrink-0 animate-gps-pulse-2 rounded-full bg-red-400 border border-white  shadow-[0_0_0_0_rgba(245,66,66,1)]"></div>
                <div className="absolute right-[-8px] top-[-8px]  h-4 w-4 shrink-0 animate-gps-pulse-3 rounded-full bg-red-400 border border-white  shadow-[0_0_0_0_rgba(245,66,66,1)]"></div>
                <div className="absolute whitespace-nowrap -top-4 -translate-y-full translate-x-[-50%] text-xs font-sarabun font-bold text-text border-2 shadow-md bg-white px-2 py-1 rounded-lg">ตำแหน่งของคุณ</div>
            </div>
        </OverlayView>
    );
};

export default UserLocationMarker;
