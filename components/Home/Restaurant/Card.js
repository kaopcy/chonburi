import React, { useState, useMemo, useEffect, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuid } from "uuid";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faStar,
    faChevronRight,
    faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

const PostCard = forwardRef(({ post }, ref) => {
    const imageCount = useMemo(
        () => (post.imageURL ? post.imageURL.length : 0),
        [post.imageURL]
    );
    const imageContainerRef = useRef(null);
    const [curIndex, setCurIndex] = useState(0);

    const increase = () => {
        setCurIndex((old) => (old >= imageCount - 1 ? old : old + 1));
    };
    const decrease = () => {
        setCurIndex((old) => (old <= 0 ? old : old - 1));
    };

    useEffect(() => {
        imageContainerRef.current.style.left = `${
            curIndex * -imageContainerRef.current.clientWidth
        }px`;
    }, [curIndex]);

    return (
        <div
            ref={ref}
            className={`mr-5 flex w-[230px]  shrink-0  flex-col overflow-hidden text-text md:w-[300px]`}
            key={post.placeID}
        >
            <div
                className="relative mb-2 aspect-[13/9] w-full shrink-0 overflow-hidden  rounded-xl"
                key={post.imageURL[0]._key}
            >
                <div
                    ref={imageContainerRef}
                    className="absolute top-0 left-0 flex  aspect-[13/9] w-full flex-nowrap transition-all duration-700 "
                >
                    {post.imageURL.map((e) => (
                        <ImageComponent
                            imageURL={e}
                            key={e._key}
                            title={post.title}
                        />
                    ))}
                </div>
                <Controller
                    increase={increase}
                    decrease={decrease}
                    curIndex={curIndex}
                    imageCount={imageCount}
                />
                <Indicator imageCount={imageCount} curIndex={curIndex} />
                <div className="absolute top-4 right-0 z-10 flex items-center overflow-hidden rounded-l-lg px-2 py-[3px] text-white">
                    <div className="absolute inset-0 z-0 bg-black opacity-40"></div>
                    <span className="z-30 mr-1 text-sm font-light ">
                        {post.reviews ? Object.keys(post.reviews).length : 0}{" "}
                        รีวิว
                    </span>
                    <FontAwesomeIcon
                        className="z-30 -rotate-45 text-xs"
                        icon={faPencilAlt}
                    />
                </div>
            </div>
            <div className="flex items-center justify-between">
                <Link href={`/restaurant/${post.slug.current}`} passHref>
                    <div className="font-medium">{post.title}</div>
                </Link>
                <div className="flex items-center">
                    <span className="mr-1 text-sm">{post.star}</span>
                    <FontAwesomeIcon
                        className="text-xs text-yellow-200"
                        icon={faStar}
                    />
                </div>
            </div>
            <div className="flex justify-between font-light text-text-lighter">
                <span className="text-xs ">
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        className="mr-[6px] text-red-400"
                    />
                    <span className="">ระยะห่าง 90 กม.</span>
                </span>

                <span className="ellipsis text-xs">
                    <span className=" mr-1">อ. {post.amphoe.name}</span>
                    <span className="">ต. {post.tambon.name}</span>
                </span>
            </div>
        </div>
    );
});

const ImageComponent = ({ imageURL, title }) => {
    return (
        <div
            className="relative  aspect-[13/9] w-full shrink-0 overflow-hidden"
            key={imageURL._key}
        >
            <Image
                alt={title}
                quality="low"
                layout="fill"
                objectFit="cover"
                src={imageURL.url}
                blurDataURL="URL"
                placeholder="blur"
            />
        </div>
    );
};

const Indicator = ({ imageCount, curIndex }) => {
    return (
        <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center">
            {[...Array(imageCount)].map((_, index) => (
                <div
                    className={`mx-[3px] h-[6px] w-[6px] rounded-full border border-white ${
                        curIndex === index && "scale-125 bg-white"
                    }`}
                    key={uuid()}
                ></div>
            ))}
        </div>
    );
};

const Controller = ({ increase, decrease, imageCount, curIndex }) => {
    return (
        <>
            <button
                name="ย้อนกลับ"
                disabled={curIndex === 0}
                onClick={() => decrease()}
                className="flex-cen group absolute top-1/2 left-2 z-10 h-8 w-8 -translate-y-1/2  cursor-pointer overflow-hidden rounded-full border-white text-white hover:border-2 disabled:hidden"
            >
                <div className="absolute inset-0 hidden bg-black opacity-40 group-hover:block"></div>
                <FontAwesomeIcon
                    className="z-10 rotate-180"
                    icon={faChevronRight}
                />
            </button>
            <button
                name="ถัดไป"
                disabled={curIndex === imageCount - 1}
                onClick={() => increase()}
                className="flex-cen group absolute top-1/2 right-2   z-10 h-8 w-8 -translate-y-1/2  cursor-pointer overflow-hidden rounded-full border-white text-white hover:border-2 disabled:hidden"
            >
                <div className="absolute inset-0 hidden bg-black opacity-40 group-hover:block"></div>
                <FontAwesomeIcon className="z-10" icon={faChevronRight} />
            </button>
        </>
    );
};

export default PostCard;
