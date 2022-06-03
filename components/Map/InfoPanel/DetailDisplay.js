import React, { useEffect } from "react";
import Image from "next/image";

// import hooks
import { usePost } from "../../../context/PostContext";
import { urlFor } from "../../../lib/sanity";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import MuseumIcon from "../../../icons/MuseumIcon";
import GlobeIcon from "../../../icons/GlobeIcon";
import LocationIcon from "../../../icons/LocationIcon";


const DetailDisplay = () => {
    const { post } = usePost();
    useEffect(() => {
        console.log(post);
    }, [post]);

    return (
        <div className="relative inset-0 z-10 flex  w-full   shrink-0  flex-col overflow-y-auto  rounded-md border bg-white px-4">
            <div className="text-3xl font-thin  mt-6 rounded-md border self-start px-4 py2">{post.title}</div>
            <div className="my-6 h-[1px] w-full shrink-0 bg-zinc-200 "></div>

            <div className="mt-6 flex items-center">
                <div className="mr-5 h-7 w-7 shrink-0 ">
                    <MuseumIcon color="#1a73e8" />
                </div>
                <div className=" flex flex-col items-start text-text">
                    <span className="font-bold ">ประเภทแหล่งท่องเที่ยว</span>
                    <span className="text-text-lighter">
                        {post.locationType.split("#")[0]}
                    </span>
                </div>
            </div>
            <div className="mt-3 flex items-center">
                <div className="mr-5 h-7 w-7 shrink-0 ">
                    <GlobeIcon color="#1a73e8" />
                </div>
                <div className=" flex flex-col items-start text-text">
                    <span className="font-bold ">สถานที่ตั้ง</span>
                    <span className="text-text-lighter">{post.location}</span>
                </div>
            </div>
            <div className="mt-3 flex items-center">
                <div className="mr-5 h-7 w-7 shrink-0">
                    <LocationIcon color="#1a73e8" />
                </div>
                <div className="flex flex-col items-start text-text">
                    <span className="font-bold ">ตำแหน่ง</span>
                    <span className="flex flex-wrap text-text-lighter ">
                        <span className="mr-4">
                            ละติจูด: {post.coords.lat}{" "}
                        </span>
                        <span className="">ลองจิจูด: {post.coords.lng}</span>
                    </span>
                </div>
            </div>

            <div className="my-6 h-[1px] w-full shrink-0 bg-zinc-200 "></div>
            <Images post={post} />
            <div className="my-4 h-[1px] w-full shrink-0 bg-zinc-200 "></div>

            <div className="h-40 w-full">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptate quis deserunt magni maiores est ratione animi eum
                libero earum perferendis molestiae sequi tempore provident,
                ipsum iure illo magnam. Sequi distinctio asperiores suscipit
                quaerat debitis laborum corporis accusantium vitae sit!
                Adipisci.
            </div>
            {/* {post &&
                post.mainImage.map((image) => (
                    <Image
                        priority="low"
                        layout="fill"
                        objectFit="cover"
                        src={urlFor(image).url()}
                        className=""
                    />
                ))} */}
        </div>
    );
};

const Images = ({ post }) => {
    return (
        <div className="relative flex w-full space-x-2 lg:space-x-3">
            <div className="flex w-full flex-col space-y-2 lg:space-y-3">
                <div className="relative aspect-[3/2] h-full overflow-hidden  rounded-tl-xl ">
                    <Image
                        priority="low"
                        layout="fill"
                        objectFit="cover"
                        src={urlFor(post.mainImage[0]).url()}
                        className=""
                    />
                </div>
                <div className="relative aspect-[3/2] h-full overflow-hidden  rounded-bl-xl ">
                    <Image
                        priority="low"
                        layout="fill"
                        objectFit="cover"
                        src={urlFor(post.mainImage[1]).url()}
                        className=""
                    />
                </div>
            </div>
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-tr-xl  rounded-br-xl">
                <Image
                    priority="low"
                    layout="fill"
                    objectFit="cover"
                    src={urlFor(post.mainImage[2]).url()}
                    className=""
                />
            </div>
            <div className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-black px-4 py-1 text-white opacity-60 hover:opacity-100">
                <span className="mr-2">ดูรูปภาพทั้งหมด</span>
                <FontAwesomeIcon icon={faImage} />
            </div>
        </div>
    );
};

export default DetailDisplay;
