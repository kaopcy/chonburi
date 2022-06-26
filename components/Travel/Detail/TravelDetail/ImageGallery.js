import React, { useContext } from "react";
import Image from "next/image";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

// import configs
import { urlFor } from "../../../../lib/sanity";

// import contexts
import { usePostContext } from "../../../../context/Travel/PostContext";

const ImageGallery = () => {
    const { post } = usePostContext();
    if (!post?.mainImage) return null;
    return (
        <div className="relative flex w-full space-x-2 lg:space-x-3">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl shadow-big">
                <Image
                    priority="low"
                    layout="fill"
                    objectFit="cover"
                    // src={urlFor(post.mainImage[0]).url()}
                    src={
                        "https://lh5.googleusercontent.com/p/AF1QipOIDX0klFrjG2ToSTKL2zLeSYbdRfuZ3HVUWWTt=s1024"
                    }
                    className=""
                />
            </div>
            <div className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-black px-4 py-1 text-white opacity-60 hover:opacity-100">
                <span className="mr-2">ดูรูปภาพทั้งหมด</span>
                <FontAwesomeIcon icon={faImage} />
            </div>
            <div className="flex w-full flex-col space-y-2 lg:space-y-3">
                <div className="relative aspect-[3/2] h-full overflow-hidden  rounded-xl shadow-big">
                    <Image
                        priority="low"
                        layout="fill"
                        objectFit="cover"
                        src={
                            "https://lh5.googleusercontent.com/p/AF1QipOu6Z1t7MHv5KCbRyeo4KmGDV0AWduu2Y-627uL=s451-k-no"
                        }
                        // src={urlFor(post.mainImage[2]).url()}
                        className=""
                    />
                </div>
                <div className="relative aspect-[3/2] h-full overflow-hidden  rounded-xl shadow-big">
                    {post.mainImage[2] && (
                        <Image
                            priority="low"
                            layout="fill"
                            objectFit="cover"
                            // src={urlFor(post.mainImage[1]).url()}
                            src="https://lh3.ggpht.com/p/AF1QipM_Iwr6GBCLAyz7jglsGeTNfIQ94qodO7IHtb0s=s1024"
                            // className=""
                        />
                    )}
                    <div className="absolute top-0 left-0 h-full w-full cursor-pointer bg-black opacity-60"></div>
                    <div className="abs-center whitespace-nowrap text-white cursor-pointer">
                        <span className="underline underline-offset-1 text-sm">
                            ดูรูปภาพทั้งหมด
                        </span>
                        <span className=""> +2</span>
                    </div>
                </div>
            </div>
            {/* <div className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-black px-4 py-1 text-white opacity-80 hover:opacity-100">
                <span className="mr-2">ดูรูปภาพทั้งหมด</span>
                <FontAwesomeIcon icon={faImage} />
            </div> */}
        </div>
    );
};

export default ImageGallery;
