import React, { useRef, useEffect, forwardRef, useState } from "react";
import gsap from "gsap/dist/gsap";
import Image from "next/image";
import Link from "next/link";

// import Icons
import SvgSearch from "../../icons/Search";

// import hooks
import useIsTouchDevice from "../../composables/useIsTouchDevice";

// import context
import { useSearchContext } from "../../context/Home/SearchContext";

const TIMER_OFFSET = 500;
const BLURRED_URL =
    "data:image/webp;base64,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";

const SearchBar = () => {
    const overlayRef = useRef();
    const formRef = useRef();
    const searchDropdownRef = useRef();
    const onSubmit = (e) => {
        e.preventDefault();
    };

    const isTouch = useIsTouchDevice();

    // search context
    const { setSearchValue } = useSearchContext();

    // focus event

    const onInputFocus = () => {
        document.body.style.overflow = "hidden";

        if (isTouch) {
            gsap.set(overlayRef.current, { autoAlpha: 0.7 });
            gsap.set(formRef.current, {
                position: "fixed",
                left: "0px",
                top: "100px",
                bottom: "auto",
                transform: "translate(0,0)",
            });
            formRef.current.removeAttribute("bottom-0");
        } else {
            gsap.to(overlayRef.current, { autoAlpha: 0.7 });
            formRef.current.style.transform = `translate(-50%,-${
                formRef.current.getBoundingClientRect().top -
                formRef.current.clientHeight
            }px)`;
        }

        formRef.current.style.zIndex = `1030`;
        searchDropdownRef.current.style.display = "flex";
    };

    const onInputBlur = () => {
        document.body.style.overflow = "auto";

        if (isTouch) {
            gsap.set(overlayRef.current, { autoAlpha: 0 });
            gsap.set(formRef.current, {
                position: "absolute",
                left: "50%",
                bottom: "0px",
                top: "auto",
                transform: "translate(-50%,50%)",
                translateX: "0px",
            });
        } else {
            gsap.to(overlayRef.current, { autoAlpha: 0 });
            formRef.current.style.transform = `translate(-50%,50%)`;
        }

        formRef.current.style.zIndex = `10`;
        searchDropdownRef.current.style.display = "none";
    };

    // clear effect
    useEffect(() => {
        gsap.set(overlayRef.current, { autoAlpha: 0 });
        return () => {
            if (idleTimer.current) clearTimeout(idleTimer.current);
            document.body.style.overflow = "auto";
        };
    }, []);

    // handle input
    const idleTimer = useRef();
    const onInputChange = (e) => {
        if (!idleTimer.current) {
            idleTimer.current = setTimeout(() => {
                idleTimer.current = null;

                setSearchValue(e.target.value);
            }, TIMER_OFFSET);
        }
    };

    return (
        <>
            <div
                onClick={onInputBlur}
                ref={overlayRef}
                className="invisible fixed top-0 left-0 z-[1020]  h-full w-full bg-black opacity-50"
            ></div>
            <form
                ref={formRef}
                onSubmit={onSubmit}
                className="absolute left-1/2  bottom-0 z-[1030]  flex  w-full -translate-x-1/2 translate-y-1/2 px-5 md:bottom-0 md:transition-transform md:duration-500"
            >
                <div className=" mx-auto flex h-[50px] w-full max-w-[800px]  items-center rounded-full bg-white px-3 py-3 shadow-xl md:h-[70px] md:px-6 md:py-4">
                    <div className="mr-3 w-8 shrink-0 p-1 ">
                        <SvgSearch strokeWidth={44} />
                    </div>
                    <div className="mr-3 h-full w-[3px] bg-text-lightest md:mr-5"></div>
                    <input
                        onChange={onInputChange}
                        onFocus={onInputFocus}
                        type="text"
                        className="h-full w-full border-none text-lg text-text outline-none placeholder:text-text-lightest md:text-xl "
                        placeholder="ค้นหาในชลบุรี . . ."
                    />
                </div>
                <SearchDropdown ref={searchDropdownRef} />

                <div className=""></div>
            </form>
        </>
    );
};

const SearchDropdown = forwardRef(({}, ref) => {
    const { filteredRestaurants, filteredTravels } = useSearchContext();
    // mobile selector
    const [selector, setSelector] = useState("travel");
    const travelSelectorRef = useRef();
    const restaurantSelectorRef = useRef();
    const indicatorRef = useRef();
    useEffect(() => {
        const resizeEvt = () => {
            const curEl =
                selector === "travel"
                    ? travelSelectorRef.current
                    : restaurantSelectorRef.current;
            const curWidth = curEl.clientWidth;
            indicatorRef.current.style.width = `${curWidth}px`;

            if (selector === "travel") indicatorRef.current.style.left = `0px`;
            else
                indicatorRef.current.style.left = `${
                    travelSelectorRef.current.clientWidth +
                    parseFloat(
                        getComputedStyle(
                            travelSelectorRef.current
                        ).marginRight.slice(0, -2)
                    )
                }px`;
        };

        resizeEvt();
        window.addEventListener("resize", resizeEvt);
        return () => {
            window.removeEventListener("resize", resizeEvt);
        };
    }, [selector]);

    return (
        <div
            ref={ref}
            className="absolute top-[120%] left-1/2 hidden  max-h-[400px] w-full max-w-[800px] -translate-x-1/2 overflow-y-auto rounded-lg bg-white  shadow-lg"
        >
            <div className="relative grid h-full  w-full grid-cols-1 md:grid-cols-2">
                <div className=" relative flex  w-full flex-col justify-between py-4 px-4 md:hidden">
                    <div className="relative mb-3  flex w-full">
                        <div
                            ref={travelSelectorRef}
                            onClick={() => setSelector("travel")}
                            className="mr-4 cursor-pointer"
                        >
                            แหล่งท่องเที่ยว
                        </div>
                        <div
                            ref={restaurantSelectorRef}
                            onClick={() => setSelector("restaurant")}
                            className="cursor-pointer"
                        >
                            ร้านอาหาร
                        </div>
                    </div>

                    <div className="relative bottom-0  h-[1px] w-[100%]   bg-text-lightest ">
                        <div
                            ref={indicatorRef}
                            className="absolute top-0 left-0 h-[2px]  bg-primary transition-all"
                        ></div>
                    </div>
                </div>

                {/* travel content */}
                <div
                    className={`flex w-full flex-col items-start py-4 px-4 ${
                        selector === "travel" ? "!flex " : "hidden  md:flex"
                    }`}
                >
                    <div className="mb-3 flex w-full justify-between text-sm font-light text-text-lighter">
                        <div className="">แหล่งท่องเที่ยว</div>
                        <div className="mb-3 text-sm text-text">
                            <span className="font-bold">
                                {filteredTravels.length}
                            </span>{" "}
                            รายการ
                        </div>
                    </div>

                    <div className="grid grid-cols-1">
                        {filteredTravels.map((e) => (
                            <div key={e._id} className="ellipsis">
                                <Card place={e} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* divider */}
                <div className="absolute top-1/2 left-1/2   hidden h-[98%] w-[1px] -translate-y-1/2 bg-text-lightest   md:block"></div>

                {/* restaurant content */}
                <div
                    className={`flex w-full flex-col items-start py-4 px-4 ${
                        selector === "restaurant" ? "!flex" : "hidden  md:!flex"
                    }`}
                >
                    <div className="mb-3 flex w-full justify-between text-sm font-light text-text-lighter">
                        <div className="">ร้านอาหาร</div>
                        <div className="mb-3 text-sm text-text">
                            <span className="font-bold">
                                {filteredRestaurants.length}
                            </span>{" "}
                            รายการ
                        </div>
                    </div>
                    <div className="grid grid-cols-1">
                        {filteredRestaurants.map((e) => (
                            <div key={e._id} className="ellipsis ">
                                <Card place={e} restaurant />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

const Card = ({ place, restaurant }) => {
    return (
        <Link
            href={`${restaurant ? "restaurant" : "travel"}/${
                place.slug.current
            }`}
        >
            <div className="group mb-4 flex w-full cursor-pointer">
                <div className="relative mr-4 aspect-square h-[40px] shrink-0 overflow-hidden rounded-full bg-pink-200">
                    <Image
                        layout="fill"
                        objectFit="cover"
                        alt={place.title}
                        blurDataURL={BLURRED_URL}
                        placeholder="blur"
                        src={place.imageURL.url}
                        className=""
                    />
                </div>
                <div className="flex w-full min-w-0 flex-col ">
                    <div className="ellipsis group-hover:underline">
                        {place.title}
                    </div>
                    <div className=" flex min-w-0 space-x-2">
                        <div className=" text-xs text-text-lighterr">
                            อ. {place.amphoe.name}
                        </div>
                        <div className="ellipsis min-w-0 text-xs text-text-lighterr">
                            ต. {place.tambon.name}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SearchBar;
