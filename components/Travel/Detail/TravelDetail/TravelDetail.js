import React, { useMemo } from "react";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMuseum,
    faEarthAsia,
    faLocationDot,
    faStar,
    faStarHalfStroke,
    faLock,
    faLink,
} from "@fortawesome/free-solid-svg-icons";
import {
    FacebookShareButton,
    LineShareButton,
    TwitterShareButton,
} from "react-share";
import {
    faFacebook,
    faLine,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";

// import components
import ImageGroup from "./ImageGroup";
import ReviewSection from "./ReviewSection";

// import contexts
import { usePostContext } from "../../../../context/Travel/PostContext";

// import constants
import { TRAVEL_MODE } from "../../../../config/selectorConstant";

const TravelDetail = () => {
    const { post } = usePostContext();
    return (
        <div
            className="flex h-full w-full shrink-0 flex-col overflow-y-auto  overflow-x-hidden py-3 px-3 xl:px-5"
            id={`${TRAVEL_MODE}-detail`}
        >
            <div className="my-4 self-center  text-[25px] font-bold leading-6 text-text">
                {post.title}
            </div>
            <div className="flex items-center justify-between">
                <div className="flex flex-col items-start">
                    <div className="text-xs font-light text-text-lighterr">
                        คะแนนรีวิวจาก Google map
                    </div>
                    <Star star={post.star} />
                </div>
                <div className="font-light text-text-lighter">อาหารคาว</div>
            </div>
            <hr className="my-5" />
            <ImageGroup />
            <hr className="my-5" />
            <ShareTo title={post.title} />
            <div className="flex flex-col my-5 items-start border  rounded-xl self-start   p-4">
                <HighLightDetail
                    icon={faEarthAsia}
                    detail={`อ.${post.amphoe?.name} ต.${post.tambon?.name}`}
                    label="สถานที่ตั้ง"
                />
                <HighLightDetail
                    icon={faLocationDot}
                    label="ตำแหน่งทางภูมิศาสตร์"
                >
                    <div className="flex text-sm flex-wrap items-center font-light text-text-lighter ">
                        <div className="mr-2">ละติจูด: {post.coords.lat}</div>
                        <div className="">ลองจิจูด: {post.coords.lng} </div>
                    </div>
                </HighLightDetail>
            </div>

            <ReviewSection />

            <div className="h-20 w-full  shrink-0"></div>
        </div>
    );
};

const HighLightDetail = ({ icon, label, detail, children, color }) => {
    return (
        <div className="my-2 flex items-center text-text">
            <div className="flex-cen mr-4 aspect-square w-8  shrink-0 rounded-xl ">
                <FontAwesomeIcon
                    className="text-base text-text "
                    icon={icon}
                />
            </div>
            <div className="flex flex-col font-normal ">
                <div className="font-bold text-text ">{label}</div>
                {children ? (
                    children
                ) : (
                    <div className="text-text-lighter text-sm font-light">{detail}</div>
                )}
            </div>
        </div>
    );
};

const Star = ({ star }) => {
    const fullStar = useMemo(() => Math.floor(star));
    const isHalf = useMemo(
        () => ((star - Math.floor(star)) * 10).toFixed() > 4
    );

    return (
        <div className="flex items-center justify-end self-start overflow-hidden rounded-md py-0">
            <div className="mr-2 text-base font-semibold text-text">{star}</div>
            {[...Array(fullStar)].map((_, index) => (
                <FontAwesomeIcon
                    className="mr-[2px] text-base text-[#FFD43B]"
                    icon={faStar}
                    key={index + "-star"}
                />
            ))}
            {isHalf ? (
                <FontAwesomeIcon
                    className="mr-[2px] text-base text-[#FFD43B]"
                    icon={faStarHalfStroke}
                />
            ) : (
                <FontAwesomeIcon
                    className="mr-[2px] text-base text-blue-100"
                    icon={faStar}
                />
            )}
        </div>
    );
};

const ShareTo = ({ title }) => {
    return (
        <div className="text-xl text-text ">
            <div className="mb-1  text-xl font-bold ">แชร์</div>
            <div className="flex justify-between">
                <div className="flex shrink-0 items-center">
                    <FacebookShareButton
                        url={`https://chonburi.vercel.app/restaurant/${title}`}
                    >
                        <FontAwesomeIcon
                            className="mr-3 shrink-0 text-3xl   text-[#4267B2]"
                            icon={faFacebook}
                        />
                    </FacebookShareButton>
                    <TwitterShareButton
                        url={`https://chonburi.vercel.app/restaurant/${title}`}
                    >
                        <FontAwesomeIcon
                            className="mr-3 shrink-0 text-3xl   text-[#00ACEE]"
                            icon={faTwitter}
                        />
                    </TwitterShareButton>
                    <LineShareButton
                        url={`https://chonburi.vercel.app/restaurant/${title}`}
                    >
                        <FontAwesomeIcon
                            className="mr-3 shrink-0 text-3xl   text-[#00B900]"
                            icon={faLine}
                        />
                    </LineShareButton>
                </div>
                <div className="mr-2 flex w-full min-w-0 cursor-pointer items-center rounded-md border bg-[#f5f7fb] px-3 py-2 text-base hover:border-primary hover:shadow-blue">
                    <FontAwesomeIcon
                        className="mr-3 text-[#0cb571]"
                        icon={faLock}
                    />
                    <span className="ellipsis font-light">{`https://chonburi.vercel.app/restaurant/${title}`}</span>
                    <div className="flex-cen ml-2 aspect-square h-full shrink-0 rounded-full bg-[#e5e8f0]">
                        <FontAwesomeIcon
                            className="cursor-pointer text-xs text-text-lighter"
                            icon={faLink}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TravelDetail;
