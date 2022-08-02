import React, { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar,
    faStarHalfStroke,
    faLock,
    faLink,
    faUpRightFromSquare,
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
import SvgUtensil from "../../../../icons/Utensil";
import SvgMountain from "../../../../icons/Mountain";

// import components
import ImageGroup from "./ImageGroup";
import ReviewSection from "./ReviewSection";

// import contexts
import { usePostContext } from "../../../../context/Travel/PostContext";

// import constants
import { TRAVEL_MODE } from "../../../../config/selectorConstant";

const TravelDetail = () => {
    const { post } = usePostContext();
    const { pathname } = useRouter();
    const type = useMemo(() => pathname.split("/")[1], [pathname]);

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
                {type === "travel" ? (
                    <Link passHref href={`/${type}`}>
                        <div className="flex items-center text-sm text-text sm:text-base">
                            <span className="mr-2 cursor-pointer whitespace-nowrap underline underline-offset-1">
                                สถานที่ท่องเที่ยว
                            </span>
                            <div className="w-4">
                                <SvgMountain stroke={"#d4d4d4"} />
                            </div>
                        </div>
                    </Link>
                ) : (
                    <Link passHref href={`/${type}`}>
                        <div className="flex items-center text-sm text-text sm:text-base">
                            <span className="mr-2 cursor-pointer whitespace-nowrap underline underline-offset-1">
                                ร้านอาหาร
                            </span>
                            <div className="w-4">
                                <SvgUtensil stroke={"#d4d4d4"} />
                            </div>
                        </div>
                    </Link>
                )}
            </div>
            <hr className="my-5" />
            <ImageGroup />
            <hr className="my-5" />
            <ShareTo title={post.title} />

            <HighLightDetail post={post} />

            <ReviewSection />

            <div className="h-20 w-full  shrink-0"></div>
        </div>
    );
};

const HighLightDetail = ({ post }) => {
    return (
        <div className="my-8 flex w-full max-w-[500px] flex-col  items-start self-start   rounded-xl border py-5 px-7">
            <div className="my-4  flex w-full items-center justify-between text-text">
                <div className="text-2xl font-bold ">ข้อมูล</div>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.google.co.th/maps/place/${post.title}`}
                    className="flex cursor-pointer items-center text-sm font-light"
                >
                    <div className="mr-2 underline underline-offset-1">
                        เปิดใน Google map
                    </div>
                    <FontAwesomeIcon
                        className="text-xs "
                        icon={faUpRightFromSquare}
                    />
                </a>
            </div>
            <div className="my-2 ml-7 flex items-center text-text">
                <div className="flex flex-col font-normal ">
                    <div className="font-bold text-text ">สถานที่ตั้ง</div>
                    <div className="flex flex-wrap items-center text-sm font-light text-text-lighter ">
                        <div className="mr-5">อ. {post.amphoe?.name}</div>
                        <div className="">ต. {post.tambon?.name} </div>
                    </div>
                </div>
            </div>
            <div className="my-2 ml-7 flex items-center text-text">
                <div className="flex flex-col font-normal ">
                    <div className="font-bold text-text ">
                        ตำแหน่งทางภูมิศาสตร์
                    </div>
                    <div className="flex flex-wrap items-center text-sm font-light text-text-lighter ">
                        <div className="mr-5">
                            ละติจูด: {post.coords.lat.toFixed(5)}
                        </div>
                        <div className="">
                            ลองจิจูด: {post.coords.lng.toFixed(5)}{" "}
                        </div>
                    </div>
                </div>
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
