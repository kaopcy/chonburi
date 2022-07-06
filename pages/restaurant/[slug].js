import React, { useEffect, useState, useRef } from "react";
import groq from "groq";
import { useRouter } from "next/dist/client/router";
import Link from "next/dist/client/link";

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
import useIsTouchDevice from "../../composables/useIsTouchDevice";
import DirectionRouteControl from "../../components/Travel/Controls/DirectionRouteControl";

const Restaurant = ({ post: fetchedPost, posts: fetchedPosts }) => {
    const router = useRouter();
    if (router.isFallback) return <div className="">Loading</div>;

    const isTouch = useIsTouchDevice();
    return (
        <PostContextProvider
            fetchedPost={fetchedPost}
            fetchedPosts={fetchedPosts}
        >
            <MapContextProvider>
                <div
                    className={`mx-auto  flex h-screen w-full  flex-col overflow-hidden  `}
                >
                    <div className="hidden h-[70px] shrink-0 sm:block lg:h-[100px] "></div>
                    <div className="relative flex h-full w-full  overflow-hidden">
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
                </div>
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
        window.addEventListener("resize", calPosition);
        return () => window.removeEventListener("resize", calPosition);
    }, [selectedMode]);

    return (
        <div
            className={`group fixed left-0 bottom-0 z-[1000] flex h-[80%] w-full shrink-0 translate-y-[calc(100%-75px)] flex-col transition-transform duration-[400ms] ease-in-out md:relative  md:h-full md:max-w-[400px]  md:translate-x-full md:translate-y-0 lg:max-w-[550px] ${
                isOpen && "!translate-y-0 md:!translate-x-0"
            }`}
        >
            {/* mobile control open */}
            <div
                className={`mobile-md absolute  bottom-full flex h-8 w-full shrink-0 items-center justify-center rounded-t-full bg-white  ${
                    !isOpen && "!opacity-0"
                }`}
                onClick={() => setIsOpen((e) => !e)}
            >
                <FontAwesomeIcon icon={faChevronDown} className="text-text" />
            </div>

            <div
                className={`flex h-full w-full shrink-0  flex-col  rounded-lg bg-white transition-colors   `}
            >
                <Selector setIsOpen={setIsOpen} isOpen={isOpen} />
                <div className="w-full px-3 xl:px-5">
                    <div
                        className={` h-[2px] w-full bg-text-lightest `}
                    ></div>
                </div>

                <div
                    className={`relative h-full w-full overflow-hidden  ${
                        !isOpen && "!opacity-0"
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
