import React, { useState, useMemo, useEffect, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

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
                    className="absolute   top-0 left-0 flex  aspect-[13/9] w-full flex-nowrap transition-all duration-700 "
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
                <Indicator
                    placeID={post.placeID}
                    imageCount={imageCount}
                    curIndex={curIndex}
                />
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
                <Link href={`/travel/${post.slug.current}`} passHref>
                    <a className="cursor-pointer font-medium underline-offset-1 hover:underline">
                        {post.title}
                    </a>
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
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABJZJREFUWEeNV4lu1FgQ7Gfn/z+JGwZCiDgEikCLFoECQYhzpRXMs72qrr7sGVZEsd5cmq6uqi73tI8/lkXsrzURwYW/8tg/MC+LLMsi8zzLssx68uJrOPG+8N++pom0QdrQpOFsOHkJzgoARbX+Bgi+jN+LArVgglgAwgASRH4ZC65BaHFcV9+PMFBZQHG92J0zMC+zLKvujzFQOnUQdhKASPvwbQ4J2DnfcBn4JsqDhZldorBLMHnhBFBasu9z2imBSqKnSLv82g2AvaASOH1kUgEUeqO4eaAyocXxWTNTLdgG98AQjbZ3n/cHDByakK6aBbRDa6d/4wEzYTKAZrIojJjPzYRvPv1cT4E70WQgA2jK9Efx1QTMMk94zaXZMuDdVhMWBl5f/asAUvct/WZA80CMYYwgWYAMYIdAY7BNThQ3JgYULx549f6flQdI/waEaloYKMWpf07EKgdgaBlEPAO8uD7nrLeLd99/6wFSsx7BGMN5sjE0CTScjjFA6hlG6ByAnIEm7fmbL1ondNgkITPAPcAiTD0DAP0LC5pBEYOeAyzOwvbYg+jJ60+FgUo9H5P8AkCnYJJF59+A2GMa0ZOD9EXHtfvwgUg7f3W1AuCuhw8yAwikjh+7njgBOGFAk8HoNC8BxMju7XImdOBOLy4PGdDOjzOQhivFTQYHQAk456G9SjCufYBP7Z6/JQC/C1kcpwHThKsAmuABgHAgNooxhhY0bjovPjgbNgV3n/7tqamIqxnDgBHFqXtQrwByIgRS1CgN6tE9GUgJmrTbj//iFHgS/R8D4XbrPBhIU3oOrCUw6scNCJj05vnLJbYQaB8hRBPGbRgmLAAm61y7LywwDdMD7JiFBwUAM0IG2xGun10c94DfA2IXKBsQCqL73sWBKIiIYx/BZu6vAEZpowUSsuDa6YuVB3Il2zCAAMJNyItPk0y983l3SdyIhwDY/Ym0cZTBx1EBPHhGCWIN88c05NI2m5DpPk09ADgQhpNHoU1BpR/Fiw90Jbt2/2kxbVkK1Q+5jGATUtrhAy0+SYAIKSoDGCoPHxQ+ieLhBQJ4XPaB7J4xXPZBX8NAvXWv5x4+6EUG24w1hpmCWlC7J4ghAqlJu747X0nguxo0cQa47WYGgHIU7TgBwJ7PPcPIx5DFWHx0CdwHYOjG7pFJQNsHAB3HvBHlEkrno2jve557nGlEhhEZUADjKKN3jxOAdDyRA7uzPwJABkB/SoDCygKA7PmejyKbGbTQMJD68QRnAtAfK7d2DwMAlxTbjj2WyyZ0HMBeusvQe65mhQF0rAycmAwKyFa02wEg6U8f+D5gC6cx0M2EyoCyAAZKKM32swImRHFQrsV50Yi2nNzZnR4wkEzYcuEhpABoOlAfAEIKBBO3JoxQSGCFyYIBUnM2aXcBwGI3fq34/WCVA8UDZkAA2BsLOgk6DdyOwwPwgU0APEAWfBQB4P4DHcNYB5S2sprpT12LYZeg03xk4JedlgeRhsmAU08AzAWdDtS6pwDsNyFOvUvVHwrcCn3/SwmovzPgRtS7oy0llAAGpAn1CiPSA/8BlsA/Vk2CHYsAAAAASUVORK5CYII="
                placeholder="blur"
            />
        </div>
    );
};

const Indicator = ({ placeID, imageCount, curIndex }) => {
    return (
        <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center">
            {[...Array(imageCount)].map((_, index) => (
                <div
                    className={`mx-[3px] h-[6px] w-[6px] rounded-full border border-white ${
                        curIndex === index && "scale-125 bg-white"
                    }`}
                    key={`poi-card-indicator-${curIndex}-${index}-${placeID}`}
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
                <div className="absolute inset-0  bg-black opacity-20 group-hover:block group-hover:opacity-40"></div>
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
                <div className="absolute inset-0  bg-black opacity-20 group-hover:block group-hover:opacity-40"></div>
                <FontAwesomeIcon className="z-10" icon={faChevronRight} />
            </button>
        </>
    );
};

export default PostCard;
