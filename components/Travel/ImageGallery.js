import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import gsap from "gsap/dist/gsap";

// import contexts
import { usePostContext } from "../../context/Travel/PostContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const BLURRED_URL =
    "data:image/webp;base64,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";

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
                    className="flex-cen group absolute  top-4 right-4  h-10 w-10 rounded-full border-2 border-text-lighter bg-white hover:bg-text-lighter sm:top-10 sm:right-10"
                >
                    <FontAwesomeIcon
                        className="text-text group-hover:text-white"
                        icon={faXmark}
                    />
                </div>
                <div className="w-full max-w-[700px] px-3">
                    <div className="mb-14 flex min-w-0 items-center text-xl  font-bold  sm:text-2xl ">
                        <div className="">รูปภาพร้าน {post.title}</div>
                        <span className="mx-2 mt-1 w-6 border-t-2 sm:w-10" />
                        <div className="whitespace-nowrap text-base font-medium text-text-lighterr sm:text-xl">
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
                                            blurDataURL={BLURRED_URL}
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
                                                blurDataURL={BLURRED_URL}
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
                                                blurDataURL={BLURRED_URL}
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
