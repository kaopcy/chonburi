import React from "react";
import { OverlayView } from "@react-google-maps/api";

const DestinationMarker = ({ ...props }) => {
    return (
        <OverlayView {...props} mapPaneName={OverlayView.MARKER_LAYER}>
            <div className="relative">
                <div className="absolute right-[-8px] top-[-8px]  h-4 w-4 shrink-0 animate-gps-pulse-blue rounded-full border border-white bg-blue-400  shadow-[0_0_0_0_rgba(0,154,255,1)]"></div>
                <div className="absolute right-[-8px] top-[-8px]  h-4 w-4 shrink-0 animate-gps-pulse-2-blue rounded-full border border-white bg-blue-400  shadow-[0_0_0_0_rgba(0,154,255,1)]"></div>
                <div className="absolute right-[-8px] top-[-8px]  h-4 w-4 shrink-0 animate-gps-pulse-3-blue rounded-full border border-white bg-blue-400  shadow-[0_0_0_0_rgba(0,154,255,1)]"></div>
            </div>
        </OverlayView>
    );
};

export default DestinationMarker;
