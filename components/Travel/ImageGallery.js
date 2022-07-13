import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import gsap from "gsap/dist/gsap";

// import contexts
import { usePostContext } from "../../context/Travel/PostContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ImageGallery = () => {
    const { post } = usePostContext();
    const router = useRouter();

    const backgroundRef = useRef(null);
    const overlayRef = useRef(null);

    const removeParams = () => {
        const { pathname, query } = router;
        const params = new URLSearchParams(query);
        params.delete("image");
        router.replace({ pathname, query: params.toString() }, undefined, {
            shallow: true,
        });
    };

    useEffect(() => {
        gsap.set(backgroundRef.current, { visibility: "visible" });
        gsap.set(overlayRef.current, { visibility: "visible" });
        gsap.from(backgroundRef.current, { autoAlpha: 0, y: "100px" });
        gsap.from(overlayRef.current, { backgroundColor: "#ffffff00" });
    }, []);

    return (
        <div
            ref={overlayRef}
            onClick={removeParams}
            className="invisible fixed inset-0  z-[1001] flex  flex-col items-center overflow-y-scroll bg-[#00000088]"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                ref={backgroundRef}
                className="invisible  relative my-28  flex  w-full  max-w-[1000px] flex-col items-center bg-white p-2 py-20 text-text"
            >
                <div
                    onClick={removeParams}
                    className="flex-cen group absolute  top-4 sm:top-10  right-4 sm:right-10 h-10 w-10 rounded-full border-2 border-text-lighter bg-white hover:bg-text-lighter"
                >
                    <FontAwesomeIcon
                        className="text-text group-hover:text-white"
                        icon={faXmark}
                    />
                </div>
                <div className="w-full max-w-[700px] px-3">
                    <div className="mb-14 flex min-w-0 text-xl sm:text-2xl  items-center  font-bold ">
                        
                        <div className="">รูปภาพร้าน {post.title}</div>
                        <span className="mx-2 mt-1 w-6 sm:w-10 border-t-2" />
                        <div className="whitespace-nowrap text-base sm:text-xl font-medium text-text-lighterr">
                            {post.imageURL?.length} ภาพ
                        </div>
                    </div>
                    <hr className="my-6" />
                    <div className="flex w-full flex-col gap-3 sm:gap-5">
                        {post.imageURL?.map((e, index) => {
                            if (index % 3 === 0)
                                return (
                                    <div className="relative aspect-[5/3] w-full   overflow-hidden ">
                                        <Image
                                            layout="fill"
                                            objectFit="cover"
                                            alt={post.title}
                                            quality="low"
                                            blurDataURL="URL"
                                            placeholder="blur"
                                            src={post.imageURL[index].url}
                                            className=""
                                        />
                                    </div>
                                );
                            else if (index % 3 === 1)
                                return post.imageURL[index + 1] ? null : (
                                    <div className="relative aspect-[5/3] w-full   overflow-hidden ">
                                        <Image
                                            layout="fill"
                                            objectFit="cover"
                                            alt={post.title}
                                            quality="low"
                                            blurDataURL="URL"
                                            placeholder="blur"
                                            src={post.imageURL[index].url}
                                            className=""
                                        />
                                    </div>
                                );
                            else if (index % 3 === 2)
                                return (
                                    <div className="flex w-full gap-3 sm:gap-5">
                                        <div className="relative aspect-[5/3] w-full   overflow-hidden ">
                                            <Image
                                                layout="fill"
                                                objectFit="cover"
                                                alt={post.title}
                                                quality="low"
                                                blurDataURL="URL"
                                                placeholder="blur"
                                                src={
                                                    post.imageURL[index - 1].url
                                                }
                                                className=""
                                            />
                                        </div>
                                        <div className="relative aspect-[5/3] w-full   overflow-hidden ">
                                            <Image
                                                layout="fill"
                                                objectFit="cover"
                                                alt={post.title}
                                                quality="low"
                                                blurDataURL="URL"
                                                placeholder="blur"
                                                src={post.imageURL[index].url}
                                                className=""
                                            />
                                        </div>
                                    </div>
                                );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
