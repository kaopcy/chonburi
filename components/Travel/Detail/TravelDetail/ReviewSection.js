import React, { useMemo } from "react";
import Image from "next/image";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

// import constants
import * as reviewConst from "../../../../config/WebReviewConstants";

// import context
import { usePostContext } from "../../../../context/Travel/PostContext";

const ReviewSection = () => {
    const { post } = usePostContext();
    const nameArr = useMemo(() =>
        post.reviews ? Object.keys(post.reviews) : null
    );
    const linkArr = useMemo(() =>
        post.reviews ? Object.values(post.reviews) : null
    );

    return (
        <div className="flex w-full flex-col pt-4">
            <div className="mb-4 text-2xl font-bold text-text">
                รีวิวจากเว็บไซต์ชื่อดัง
            </div>
            <div className="grid grid-cols-2">
                {nameArr?.map((e, index) => (
                    <WebReview
                        key={linkArr[index]}
                        icon={e}
                        link={linkArr[index]}
                    />
                ))}
            </div>
        </div>
    );
};

const WebReview = ({ link, icon }) => {
    return (
        <div className="mb-3 flex w-[95%] rounded-2xl border p-2">
            <div className="relative mr-2 h-8  w-8 shrink-0  md:h-10 md:w-10 ">
                <Image
                    src={`/icons/review/${icon.toLowerCase()}.png`}
                    layout="fill"
                />
            </div>
            <div className="flex w-full flex-col text-text">
                <div className="text-xs text-text-lighterr">รีวิวโดย</div>
                <div className="whitespace break-all font-normal leading-3 ">
                    {icon.toUpperCase()}
                </div>
                <div className="group  mt-2 cursor-pointer self-end whitespace-nowrap rounded-lg border border-primary-lighter px-2  py-1 text-xs font-semibold  text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white">
                    <a
                        href={link}
                        className="whitespace-nowrap  text-[11px] font-light"
                    >
                        เข้าชม
                        <span className="hidden md:inline-block">เว็บไซต์</span>
                    </a>
                    <FontAwesomeIcon
                        className="ml-1 text-[9px]"
                        icon={faArrowUpRightFromSquare}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReviewSection;
