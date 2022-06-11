import React, { useEffect, useState, useRef } from "react";
import groq from "groq";

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
import { DirectionProvider } from "../../context/DirectionContext";
import { ActiveOtherPlaceProvider } from "../../context/Travel/ActiveOtherPlaceContext";

// import components
import Selector from "../../components/Travel/Selector";
import TravelDetail from "../../components/Travel/Detail/TravelDetail";
import OtherPlaceDetail from "../../components/Travel/Detail/OtherPlaceDetail";
import RouteDetail from "../../components/Travel/Detail/RouteDetail";
import Map from "../../components/Travel/Map/Map";
import useIsTouchDevice from "../../composables/useIsTouchDevice";

const Travel = ({ post: fetchedPost, posts: fetchedPosts }) => {
    const isTouch = useIsTouchDevice();

    return (
        <PostContextProvider
            fetchedPost={fetchedPost}
            fetchedPosts={fetchedPosts}
        >
            <div
                className={`flex  h-screen w-full flex-col overflow-hidden p-4 ${
                    isTouch && "!h-[calc(100vh-100px)] "
                }`}
            >
                <div className="h-[70px] md:h-[100px] shrink-0"></div>
                <div className="relative flex h-full w-full overflow-hidden">
                    <ActiveOtherPlaceProvider>
                        <DirectionProvider>
                            <SelectorContextProvider>
                                {/* Map */}
                                <div className="h-full w-full  shrink-0   md:w-[60%] md:max-w-[1000px]">
                                    <div className="h-full w-full rounded-lg bg-white ">
                                        <Map />
                                    </div>
                                </div>

                                {/* Detail */}
                                <Detail />
                            </SelectorContextProvider>
                        </DirectionProvider>
                    </ActiveOtherPlaceProvider>
                </div>
            </div>
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
            className={`group fixed bottom-0 flex h-[80%] w-full translate-y-[calc(100%-68px)] flex-col transition-transform duration-[400ms] ease-in-out  md:relative md:h-full md:translate-x-full md:translate-y-0 ${
                isOpen && "!translate-y-0 md:!translate-x-0"
            }`}
        >
            {/* mobile control open */}
            <div
                className="mobile-md absolute bottom-full flex h-10 w-full shrink-0 items-center justify-center bg-white"
                onClick={() => setIsOpen((e) => !e)}
            >
                <FontAwesomeIcon icon={faChevronDown} className="text-text" />
            </div>

            {/* desktop control open */}
            <div
                className={`desktop-md absolute top-1/2   right-full flex h-9 w-10   -translate-y-1/2 items-center justify-center  rounded-md rounded-r-none border  border-r-0 bg-white opacity-0 transition-all  group-hover:translate-x-0 group-hover:opacity-100
                
                    ${!isOpen && "!translate-x-0 opacity-100"}
                `}
                onClick={() => setIsOpen((e) => !e)}
            >
                <FontAwesomeIcon icon={faChevronLeft} className="text-text" />
            </div>

            <div className="h-full w-full shrink-0 rounded-lg  bg-white  lg:p-8 lg:pr-0 ">
                <Selector setIsOpen={setIsOpen}/>
                <div className="h-[1px] w-full bg-text-lightest"></div>

                <div className="relative h-full w-full overflow-hidden ">
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
            *[(_type == "post" || _type == "restaurant") && defined(slug.current)][].slug.current
        `
    );
    return {
        paths: path.map((slug) => ({ params: { slug } })),
        fallback: true,
    };
}

const postQuery = groq`
*[(_type == "post" || _type == "restaurant") && slug.current == $slug][0]`;
const postsQuery = groq`
*[(_type == "post" || _type == "restaurant")] {_id,coords , title}`;

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

export default Travel;
