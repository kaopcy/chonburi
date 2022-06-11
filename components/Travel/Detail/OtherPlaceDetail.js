import React, {
    useEffect,
    useState,
    useRef,
    useImperativeHandle,
    forwardRef,
} from "react";
import Image from "next/image";

// import dependencies

// import contexts
import { usePostsContext } from "../../../context/Travel/PostContext";
import { useActiveOtherPlace } from "../../../context/Travel/ActiveOtherPlaceContext";

// import config
import { urlFor } from "../../../lib/sanity";

const OtherPlaceDetail = () => {
    const { posts, distanceSortedPost } = usePostsContext();
    const { setActiveOtherPlace } = useActiveOtherPlace();
    const containerRef = useRef(null);
    const timer = useRef(null);

    const cardsRef = useRef([]);

    useEffect(() => {
        const onScroll = () => {
            if (timer.current !== null) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(function () {
                const activeOtherPlace = cardsRef.current
                    .map((cardRef) =>
                        cardRef.onScroll(
                            containerRef.current.scrollTop,
                            containerRef.current.clientHeight
                        )
                    )
                    .filter((e) => e);
                setActiveOtherPlace([]);
                setActiveOtherPlace(activeOtherPlace);
                console.log(activeOtherPlace);
            }, 50);
        };

        if (!containerRef.current) return;
        onScroll();
        containerRef.current.addEventListener("scroll", onScroll, false);
        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener(
                    "scroll",
                    onScroll,
                    false
                );
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="flex h-full w-full shrink-0 flex-col overflow-y-auto  lg:pr-8"
            id="สถานที่อื่นๆ-detail"
        >
            {distanceSortedPost &&
                distanceSortedPost.map((post, index) => (
                    <Card
                        ref={(e) => (cardsRef.current[index] = e)}
                        key={post._id}
                        post={post}
                    />
                ))}
        </div>
    );
};

const Card = forwardRef(({ post }, ref) => {
    const cardRef = useRef(null);
    const [isActive, setIsActive] = useState(false);

    const onScroll = (containerScrollTop, containerHeight) => {
        if (!cardRef.current) return;
        const cardTop = cardRef.current.offsetTop;
        const cardH = cardRef.current.clientHeight;

        const cardBot = cardTop + cardH;
        let onScreen = false;
        if (
            cardBot >= containerScrollTop &&
            cardTop <= containerHeight + containerScrollTop - cardH
        ) {
            onScreen = true;
        }
        setIsActive(onScreen);
        return onScreen ? post : null;
    };

    useImperativeHandle(ref, () => ({
        onScroll,
    }));

    return (
        <div
            className={`flex w-full items-center whitespace-nowrap py-10 ${
                isActive && "!bg-red-500"
            }`}
            ref={cardRef}
        >
            <div className="aspect-video  h-10 shrink-0">{post.title}</div>
        </div>
    );
});

export default OtherPlaceDetail;
