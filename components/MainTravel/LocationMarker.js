import React from "react";
import { OverlayView } from "@react-google-maps/api";
import Image from "next/image";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { forwardRef } from "react";

const LocationMarker = forwardRef(
    ({ position, onMouseLeave, onMouseOver, post }, ref) => {
        return (
            <OverlayView
                position={position}
                mapPaneName={OverlayView.FLOAT_PANE}
            >
                <div className="relative  transition-transform hover:scale-110">
                    <div className="flex-cen  absolute left-[-9px] top-[-8px]   h-5  w-6 shrink-0 animate-gps-pulse-3 rounded-[50%] border-[3px] border-white bg-[#00aa6c]">
                        <div className="h-[5px] w-[7px]  rounded-[50%] bg-white"></div>
                        <div className="absolute bottom-1/2 h-[40px] w-[4px] rounded-full bg-text"></div>
                        <div
                            ref={ref}
                            className="flex-col-cen absolute -top-20 z-10 h-[68px] w-[68px] overflow-hidden rounded-[50%] border-[3px] border-white bg-white shadow-lg"
                        >
                            <Image
                                layout="fill"
                                objectFit="cover"
                                alt={post.title}
                                quality="low"
                                blurDataURL="data:image/webp;base64,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"
                                placeholder="blur"
                                src={post.imageURL[0].url}
                                className=""
                            />
                        </div>
                    </div>
                    {/* <div className="custom-text-shadow-black  absolute top-[14px] left-1/2 w-40 text-center -translate-x-1/2 font-sarabun text-xs text-white">
                        {post.title}
                    </div> */}
                    <div className="custom-text-shadow-white absolute top-[14px] left-1/2 w-40 text-center -translate-x-1/2 font-sarabun text-xs text-black">
                        {post.title}
                    </div>
                </div>
            </OverlayView>
        );
    }
);

export default LocationMarker;
