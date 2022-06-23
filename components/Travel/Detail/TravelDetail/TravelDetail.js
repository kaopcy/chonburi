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
import ReviewSection from "./ReviewSection";

// import contexts
import { usePostContext } from "../../../../context/Travel/PostContext";

// import constants
import { TRAVEL_MODE } from "../../../../config/selectorConstant";
import { useMemo } from "react";

const TravelDetail = () => {
    const { post } = usePostContext();
    return (
        <div
            className="flex h-full w-full shrink-0 flex-col overflow-y-auto py-3 px-3 md:px-0 lg:pr-8"
            id={`${TRAVEL_MODE}-detail`}
        >
            <div className="mt-2 text-text-lighterr">ร้านอาหาร</div>
            <div className="mb-2 text-2xl font-bold leading-4 text-text">
                {post.title}
            </div>
            <div className="my-5 h-[1px]  w-full shrink-0 bg-text-lightest"></div>
            <ImageGallery />
            <div className="my-5 h-[1px] w-full shrink-0 bg-text-lightest"></div>

            <div className="flex flex-col items-start  ">
                <HighLightDetail
                    color="#4DD430"
                    icon={faMuseum}
                    detail={post.locationType.split("#")[0]}
                    label="ประเภท"
                />
                <HighLightDetail
                    color="#5ABDFF"
                    icon={faEarthAsia}
                    detail={post.location}
                    label="สถานที่ตั้ง"
                />
                <HighLightDetail
                    color="#FF5656"
                    icon={faLocationDot}
                    label="ตำแหน่งทางภูมิศาสตร์"
                >
                    <div className="flex flex-wrap items-center font-normal text-text-lighter">
                        <div className="mr-2">ละติจูด: 100.131231</div>
                        <div className="">ลองจิจูด: 13.123123 </div>
                    </div>
                </HighLightDetail>
            </div>
            <div className="my-5 h-[1px] w-full shrink-0 bg-text-lightest"></div>
            <ReviewSection />
        </div>
    );
};

const HighLightDetail = ({ icon, label, detail, children, color }) => {
    return (
        <div className="my-2 flex items-center text-text">
            <div
                className="flex-cen mr-4 aspect-square w-10  shrink-0 rounded-xl shadow-icon"
                style={{ backgroundColor: color }}
            >
                <FontAwesomeIcon className="text-2xl text-white" icon={icon} />
            </div>
            <div className="flex flex-col font-normal leading-5">
                <div className="font-bold text-text">{label}</div>
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
