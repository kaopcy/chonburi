import React from "react";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMuseum,
    faEarthAsia,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

// import components
import ImageGallery from "./ImageGallery";

const TravelDetail = () => {
    return (
        <div
            className="flex h-full w-full shrink-0 flex-col overflow-y-auto lg:pr-8"
            id="รายละเอียด-detail"
        >
            <div className="my-5 flex flex-col items-start  ">
                <HighLightDetail
                    color="#F6EF00"
                    icon={faMuseum}
                    detail="ร้านอาหาร"
                    label="ประเภทแหล่งท่องเที่ยว"
                />
                <HighLightDetail
                    color="#AEE6E6"
                    icon={faEarthAsia}
                    detail="รายละเอียด"
                    label="ประเภทแหล่งท่องเที่ยว"
                />
                <HighLightDetail
                    color="#FF754B"
                    icon={faLocationDot}
                    label="ประเภทแหล่งท่องเที่ยว"
                >
                    <div className="flex flex-wrap items-center text-text-lighter">
                        <div className="mr-2">ละติจูด: 100.131231</div>
                        <div className="">ลองจิจูด: 13.123123 </div>
                    </div>
                </HighLightDetail>
                <div className="my-5 h-[1px] w-full bg-text-lightest"></div>

                <ImageGallery />
                <div className="h-10"></div>
            </div>
        </div>
    );
};

const HighLightDetail = ({ icon, label, detail, children , color }) => {
    return (
        <div className="my-2 flex items-center text-text">
            <div className="flex-cen mx-4 w-10 shrink-0">
                <FontAwesomeIcon className="text-2xl" icon={icon} style={{ color: color }}/>
            </div>
            <div className="flex flex-col font-medium leading-5">
                <div className="">{label}</div>
                {children ? (
                    children
                ) : (
                    <div className="text-text-lighter">{detail}</div>
                )}
            </div>
        </div>
    );
};

export default TravelDetail;
