import React, { useMemo } from "react";
import Image from "next/image";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

// import constants
import * as reviewConst from "../../../../config/WebReviewConstants";

const ReviewSection = () => {
    const mock = useMemo(
        () => [
            {
                icon: reviewConst.OPENRICE,
                url: "awdawdaw",
            },
            {
                icon: reviewConst.WONGNAI,
                url: "awdawdawdw",
            },
            {
                icon: reviewConst.FOURSQUARE,
                url: "awdawdawa",
            },
            {
                icon: reviewConst.RETTY,
                url: "awdawdawadwa",
            },
        ],
        []
    );
    return (
        <div className="flex w-full flex-col pt-4">
            <div className="mb-4 text-2xl font-bold text-text">
                รีวิวจากเว็บไซต์ชื่อดัง
            </div>
            <div className="grid grid-cols-2">
                {mock.map((e) => (
                    <WebReview key={e.url} icon={e.icon} />
                ))}
            </div>
        </div>
    );
};

const WebReview = ({ link, icon }) => {
    return (
        <div className="mb-3 flex w-[95%] rounded-2xl border-2 p-2">
            <div className="relative mr-2 w-10  md:h-14 h-10  md:w-14 shrink-0 ">
                <Image
                    src={`/icons/review/${icon.toLowerCase()}.png`}
                    layout="fill"
                />
            </div>
            <div className="flex w-full flex-col text-text">
                <div className="text-xs font-light text-text-lighterr">
                    รีวิวโดย
                </div>
                <div className="whitespace font-bold leading-3 break-all">{icon}</div>
                <div className="whitespace-nowrap  group mt-2 cursor-pointer self-end rounded-xl border-2 border-primary-lighter px-2  py-1 text-xs font-semibold  text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white">
                    <span className="whitespace-nowrap  text-[11px]">เข้าชม<span className="hidden md:inline-block" >เว็บไซต์</span></span>
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
