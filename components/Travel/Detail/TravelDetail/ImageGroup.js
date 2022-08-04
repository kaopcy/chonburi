import React, { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

// import configs
import { urlFor } from "../../../../lib/sanity";

// import contexts
import { usePostContext } from "../../../../context/Travel/PostContext";

const blurredUrl =
    "data:image/webp;base64,UklGRkgDAABXRUJQVlA4WAoAAAAgAAAAgQAAWAAASUNDUBgCAAAAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANlZQOCAKAQAAsAkAnQEqggBZAD7tbK9QP6Ykoqj0TEvwHYllbt1aYUsF/j9gJ412AKqqrPnvtSSBmoB7kQkuOPZucrqrwlPyfyRrp2zGmwnu5xtKcgqG1/BDrYZd5qAA/qbj/hKp0IqQI58abIXs5uX/lTDEwo7O3BobPQ0B+oyNOjxJ4MMMuLlKTImxwJJuTiuHLhYUU4gHngATeWTCcDgkV6mI1UEWPquCtJAX/LGV06dcM6+KtvvxgzDsjRT5NyPDS19RXyKiRutSP3QBMfGHl5iEVTSUe7sAso3TrzXN3za36MzoBEKqbufEows2j3yqhskNTPmPL1GwIllMscwDtf2out5v/Mo2JFVjhyQAAAA=";

const ImageGroup = () => {
    const { post } = usePostContext();
    const router = useRouter();
    if (!post?.imageURL) return null;
    return (
        <div className="relative flex w-full space-x-2 lg:space-x-3">
            <div className="relative aspect-[2/3] w-full overflow-hidden  shadow-big">
                <Image
                    layout="fill"
                    objectFit="cover"
                    alt={post.title}
                    quality="low"
                    blurDataURL={blurredUrl}
                    placeholder="blur"
                    src={post.imageURL[0].url}
                    className=""
                />
            </div>
            <div className="flex w-full flex-col space-y-2 lg:space-y-3">
                <div className="relative aspect-[3/2] h-full overflow-hidden   shadow-big">
                    <Image
                        layout="fill"
                        objectFit="cover"
                        alt={post.title}
                        quality="low"
                        blurDataURL={blurredUrl}
                        placeholder="blur"
                        src={post.imageURL[1].url}
                        className=""
                    />
                </div>
                <div
                    className="relative aspect-[3/2] h-full overflow-hidden   shadow-big"
                    onClick={() =>
                        router.push(
                            {
                                href: "/travel/[slug]/?image",
                                query: {
                                    slug: router.query.slug,
                                    image: true,
                                },
                            },
                            undefined,
                            { shallow: true }
                        )
                    }
                >
                    {post.imageURL[2] && (
                        <Image
                            layout="fill"
                            objectFit="cover"
                            alt={post.title}
                            quality="low"
                            blurDataURL={blurredUrl}
                            placeholder="blur"
                            src={post.imageURL[2].url}
                            className=""
                        />
                    )}
                    <div className="absolute top-0 left-0 h-full w-full cursor-pointer bg-black opacity-60"></div>
                    <div className="abs-center cursor-pointer whitespace-nowrap text-white">
                        <span className="text-sm underline underline-offset-1">
                            ดูรูปภาพทั้งหมด
                        </span>
                        <span className=""> +{post.imageURL.length - 3}</span>
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

export default ImageGroup;
