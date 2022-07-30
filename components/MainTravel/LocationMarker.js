import React from "react";
import { OverlayView } from "@react-google-maps/api";
import Image from "next/image";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { forwardRef } from "react";

const LocationMarker = forwardRef(({ position, onClick, post }, ref) => {
    return (
        <OverlayView position={position} mapPaneName={OverlayView.FLOAT_PANE}>
            <div className="relative  transition-transform hover:scale-110">
                <div className="flex-cen cursor-pointer  absolute left-[-9px] top-[-8px]   h-5  w-6 shrink-0 animate-gps-pulse-red rounded-[50%] border-[3px] border-white bg-red-400">
                    <div className="h-[5px] w-[7px]  rounded-[50%] bg-white"></div>
                    <div className="absolute bottom-1/2 h-[40px] w-[4px] rounded-full bg-text"></div>
                    <div
                        onClick={() => onClick(post.title)}
                        ref={ref}
                        className="flex-col-cen absolute -top-20 z-10 h-[68px] w-[68px] overflow-hidden rounded-[50%] border-[3px] border-white bg-white shadow-lg"
                    >
                        <Image
                            layout="fill"
                            objectFit="cover"
                            alt={post.title}
                            quality="low"
                            blurDataURL="URL"
                            placeholder="blur"
                            src={post.imageURL[0].url}
                            className=""
                        />
                    </div>
                </div>
                {/* <div className="custom-text-shadow-black  absolute top-[14px] left-1/2 w-40 text-center -translate-x-1/2 font-sarabun text-xs text-white">
                        {post.title}
                    </div> */}
                <div className="custom-text-shadow-white absolute top-[14px] left-1/2 w-40 -translate-x-1/2 text-center font-sarabun text-xs text-black">
                    {post.title}
                </div>
            </div>
        </OverlayView>
    );
});

export default LocationMarker;
