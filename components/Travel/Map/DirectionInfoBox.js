import React from "react";

// import icons
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import contexts
import { usePostContext } from "../../../context/Travel/PostContext";


const DirectionInfoBox = () => {
    const { post } = usePostContext()
    return (
        <div className="absolute  top-[69px] flex w-full flex-col bg-[#ffffffdd] p-2 text-text gap-2 shadow-md">
            <div className="absolute left-[26px] top-10 flex flex-col items-center gap-1">
                <div className="w-[4px] h-[4px] bg-text-lighterr rounded-full"></div>
                <div className="w-[4px] h-[4px] bg-text-lighterr rounded-full"></div>
                <div className="w-[4px] h-[4px] bg-text-lighterr rounded-full"></div>
            </div>
            <div className="flex items-center">
                <div className="relative mx-3 h-4 w-4 rounded-full bg-primary">
                    <div className="absolute inset-[5px] rounded-full bg-white"></div>
                </div>
                <div className="flex flex-col">
                    <div className="font-semibold text-sm ">ตำแหน่งของคุณ</div>
                    <div className="text-xs text-text-lighter">ตำแหน่งของคุณ</div>
                </div>
            </div>
            <div className="flex items-center">
                <div className="relative mx-3 h-4 w-4  flex-cen">
                <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-red-500"
                />
                </div>
                
                <div className="flex flex-col">
                    <div className="font-semibold text-sm">{post.title}</div>
                    <div className="text-xs text-text-lighter">อ. {post.amphoe.name} ต. {post.tambon.name}</div>
                </div>
            </div>
        </div>
    );
};

export default DirectionInfoBox;
