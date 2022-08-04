import React, { useEffect, useState, useRef, useMemo } from "react";
import Head from "next/head";
import groq from "groq";
import { useRouter } from "next/dist/client/router";

// import confixs
import { getClient } from "../../lib/sanity.server";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

// import contexts
import {
    SelectorContextProvider,
    useSelectorContext,
} from "../../context/Travel/SelectorContext";
import { PostContextProvider } from "../../context/Travel/PostContext";
import {
    DirectionProvider,
    useActiveDirection,
} from "../../context/DirectionContext";
import { ActiveOtherPlaceProvider } from "../../context/Travel/ActiveOtherPlaceContext";
import { MapContextProvider, useMapContext } from "../../context/MapContext";

// import components
import Selector from "../../components/Travel/Selector";
import TravelDetail from "../../components/Travel/Detail/TravelDetail/TravelDetail";
import OtherPlaceDetail from "../../components/Travel/Detail/OtherPlaceDetail";
import RouteDetail from "../../components/Travel/Detail/RouteDetail";
import Map from "../../components/Travel/Map/Map";
import DirectionRouteControl from "../../components/Travel/Controls/DirectionRouteControl";
import ImageGallery from "../../components/Travel/ImageGallery";

const Restaurant = ({ post: fetchedPost, posts: fetchedPosts }) => {
    const router = useRouter();
    if (router.isFallback) return <div className="">Loading</div>;

    const { query } = router;
    const isImage = useMemo(() => query.image !== undefined, [query]);
    
    return (
        <PostContextProvider
            fetchedPost={fetchedPost}
            fetchedPosts={fetchedPosts}
        >
            {isImage && <ImageGallery />}

            <MapContextProvider>
                <main
                    className={`absolute  inset-0 mx-auto flex  flex-col overflow-hidden  `}
                >
                    <Head>
                        <title>{query.slug} | หน้าหลัก</title>
                        <meta
                            name="description"
                            content={`ร้านอาหารในชลบุรี ${query.slug} ท่องเที่ยวที่ชลบุรี ค้นหาแหล่งท่องเที่ยวและร้านอาหารชื่อดงัที่ไม่ควรพลาดในจังหวัดชลบุรี, ประเทศไทย `}
                        />
                    </Head>
                    <div className="hidden h-[70px] shrink-0 sm:block lg:h-[100px] "></div>
                    <div className="relative flex h-[calc(100%)] w-full overflow-hidden sm:h-[calc(100%-100px)]  lg:h-full">
                        <ActiveOtherPlaceProvider>
                            <DirectionProvider>
                                <SelectorContextProvider>
                                    {/* Detail */}
                                    <Detail />
                                    {/* Map */}
                                    <div className="h-full w-full">
                                        <div className="relative h-full w-full rounded-lg bg-white">
                                            {/* <DirectionRouteControl /> */}
                                            <Map />
                                            {/* <LoadingOverlay/> */}
                                        </div>
                                    </div>
                                </SelectorContextProvider>
                            </DirectionProvider>
                        </ActiveOtherPlaceProvider>
                    </div>
                </main>
            </MapContextProvider>
        </PostContextProvider>
    );
};

const Detail = () => {
    const [isOpen, setIsOpen] = useState(true);
    const { selectedMode } = useSelectorContext();

    const parentDetailContainer = useRef(null);
    useEffect(() => {
        const calPosition = () => {
            const elRef = document.getElementById(`${selectedMode}-detail`);
            if (!elRef || !parentDetailContainer.current) return;
            const { offsetLeft } = elRef;
            parentDetailContainer.current.style.transform = `translate(-${offsetLeft}px , 0)`;
        };

        calPosition();
        window.addEventListener("resize", calPosition, { passive: true });
        return () => window.removeEventListener("resize", calPosition);
    }, [selectedMode]);

    return (
        <div
            className={`group fixed left-0 bottom-0 z-[1000] flex h-[80%] w-full shrink-0  flex-col transition-transform duration-[400ms] ease-in-out md:relative md:h-full  md:max-w-[400px] md:translate-x-0  md:translate-y-0 md:transition-none lg:max-w-[550px] ${
                isOpen
                    ? "translate-y-0 "
                    : "translate-y-[calc(100%-60px)] md:translate-y-0"
            }`}
        >
            {/* mobile control open */}
            <div
                className={`mobile-md absolute bottom-[calc(100%-2px)]  flex  h-8 w-full shrink-0 items-center justify-center rounded-t-full border-t-2 bg-white  ${
                    !isOpen && "!hidden"
                }`}
                onClick={() => setIsOpen((e) => !e)}
            >
                <FontAwesomeIcon icon={faChevronDown} className="text-text" />
            </div>

            <div
                className={`flex h-full w-full shrink-0  flex-col  rounded-lg  transition-colors   ${
                    isOpen ? "bg-white" : "bg-transparent"
                }`}
            >
                <Selector setIsOpen={setIsOpen} isOpen={isOpen} />

                <div className="w-full px-3 xl:px-5 ">
                    <hr />
                </div>

                <div
                    className={`relative h-full w-full overflow-hidden  ${
                        !isOpen && "opacity-0 md:opacity-100"
                    }`}
                >
                    <div
                        ref={parentDetailContainer}
                        className="absolute top-0 left-0 flex h-full w-full  flex-nowrap items-start transition-transform duration-500 ease-in-out"
                    >
                        <TravelDetail />
                        <OtherPlaceDetail />
                        <RouteDetail setIsOpen={setIsOpen} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export async function getStaticPaths() {
    const path = await getClient().fetch(
        groq`
            *[(_type == "pointOfInterest") && defined(slug.current)][].slug.current
        `
    );
    return {
        paths: path.map((slug) => ({ params: { slug } })),
        fallback: true,
    };
}

const postQuery = groq`
*[(_type == "post" || _type == "pointOfInterest") && slug.current == $slug][0]{
    amphoe-> { name },
    tambon-> { name },
    title,
    slug,
    coords,
    placeID,
    imageURL,
    reviews,
    star,
}`;

const postsQuery = groq`
*[(_type == "post" || _type == "restaurant")] {_id,coords , title , mainImage , location, locationType,}`;

export async function getStaticProps({ params, preview = false }) {
    const post = await getClient(preview).fetch(postQuery, {
        slug: params.slug,
    });
    const posts = await getClient(preview).fetch(postsQuery);
    return {
        props: {
            post,
            posts,
        },
    };
}

export default Restaurant;
