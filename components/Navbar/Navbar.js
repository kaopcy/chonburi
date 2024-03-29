import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import gsap from "gsap/dist/gsap";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SvgSuitcase from "../../icons/Suitcase";

// import components
import NavSidebar from "./NavSidebar";
import SvgChonburi2 from "../../icons/new/Chonburi2";

// import HOC
import MatchLink from "../Utils/MatchLink";

const Navbar = () => {
    const navbarRef = useRef(null);
    const iconRef = useRef(null);
    const iconContainerRef = useRef(null);
    const textRef = useRef(null);
    const animation = useRef(null);

    useEffect(() => {
        animation.current = gsap
            .timeline({
                scrollTrigger: {
                    trigger: document.body,
                    start: "70px top",
                    end: "70px top",
                    toggleActions: "play none reverse none",
                },
            })
            .to(navbarRef.current, {
                height: "70px",
                duration: 0.5,
                ease: "expo.inOut",
            })
            .to(
                iconRef.current,
                {
                    ease: "linear",
                    rotate: "200deg",
                    duration: 0.3,
                },
                "<"
            )
            .to(
                textRef.current,
                {
                    ease: "expo.inOut",
                    fontSize: "24px",
                    duration: 0.5,
                },
                "<"
            )
            .to(
                iconRef.current,
                {
                    ease: "expo.inOut",
                    width: "0px",
                    display: "none",
                    duration: 0.5,
                },
                "<"
            )
            .set(textRef.current, { textDecorationLine: "underline" });
    }, []);

    // navsidebar
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);

    return (
        <div
            ref={navbarRef}
            className="fixed z-[1010] flex  h-[70px] w-full flex-col border-b lg:h-[100px]"
        >
            <div className="relative hidden h-full w-full  max-w-[1350px] items-center justify-between self-center px-20 text-xl  font-medium text-text lg:flex 2xl:px-5">
                <div className="absolute top-0 left-0 z-10 h-full w-full bg-white opacity-80"></div>
                <Link href={"/"} passHref>
                    <div
                        ref={iconContainerRef}
                        className="z-20 flex items-center"
                    >
                        <div
                            className="relative  mt-1 w-10 md:w-20 "
                            ref={iconRef}
                        >
                            <SvgChonburi2 />
                        </div>
                        <div
                            ref={textRef}
                            className="ml-1 cursor-pointer text-[32px] font-black !text-text"
                        >
                            ชลบุรี
                        </div>
                    </div>
                </Link>

                <div className="z-20 flex justify-center space-x-6 transition-all">
                    
                    <div className=" group relative py-4">
                        <MatchLink path="/restaurant?map=true">
                            {({ isMatch }) => (
                                <div
                                    className={` cursor-pointer  px-4 ${
                                        isMatch ? "text-primary" : "text-text"
                                    }`}
                                >
                                    <span className="mr-2">อาหารคาว</span>
                                    <div
                                        className={`h-[3px] w-full origin-left scale-x-0 bg-primary opacity-20 transition-transform group-hover:scale-x-100  ${
                                            isMatch && "!scale-x-100"
                                        }`}
                                    ></div>
                                </div>
                            )}
                        </MatchLink>
                    </div>
                    <div className="group relative py-4">
                        <MatchLink path="/desert?map=true">
                            {({ isMatch }) => (
                                <div
                                    className={`group cursor-pointer  px-4 ${
                                        isMatch ? "text-primary" : "text-text"
                                    }`}
                                >
                                    <span className="">อาหารหวาน</span>
                                    <div
                                        className={`h-[3px] w-full origin-left scale-x-0 bg-primary opacity-20 transition-transform group-hover:scale-x-100  ${
                                            isMatch && "!scale-x-100"
                                        }`}
                                    ></div>
                                </div>
                            )}
                        </MatchLink>
                    </div>
                    <div className="group relative py-4">
                        <MatchLink path="/travel?map=true">
                            {({ isMatch }) => (
                                <div
                                    className={` cursor-pointer  px-4 ${
                                        isMatch ? "text-primary" : "text-text"
                                    }`}
                                >
                                    <span className="">แหล่งท่องเที่ยวเชิงอาหาร</span>
                                    <div
                                        className={`h-[3px] w-full origin-left scale-x-0 bg-primary opacity-20 transition-transform group-hover:scale-x-100  ${
                                            isMatch && "!scale-x-100"
                                        }`}
                                    ></div>
                                </div>
                            )}
                        </MatchLink>
                        {/* <PoiDropdown /> */}
                    </div>
                </div>
                <div className="group relative z-20 rounded-full bg-primary-light py-[7px] shadow-md">
                    <MatchLink path="/trip">
                        {({ isMatch }) => (
                            <div
                                className={` group flex cursor-pointer items-center px-5 ${
                                    isMatch ? "text-white" : "text-white"
                                }`}
                            >
                                <div className="mr-2 w-4 shrink-0">
                                    <SvgSuitcase stroke="#fff" />
                                </div>
                                <span className="whitespace-nowrap text-base underline-offset-1 group-hover:underline">
                                    โปรแกรมเที่ยว
                                </span>

                                <div
                                    className={`h-[3px] w-full origin-left scale-x-0 bg-primary opacity-20 transition-transform group-hover:scale-x-100  ${
                                        isMatch && "!scale-x-100"
                                    }`}
                                ></div>
                            </div>
                        )}
                    </MatchLink>
                    {/* <RestaurantDropdown /> */}
                </div>
            </div>
            <div
                className="flex h-full  w-full max-w-[1300px] items-center justify-between  self-center px-3 text-xl   font-medium text-text sm:px-16 lg:hidden"
                ref={navbarRef}
            >
                <div className="absolute top-0 left-0 z-10 h-full w-full bg-white opacity-80"></div>
                <Link href={"/"} passHref>
                    <div className="relative z-20 mt-1 w-16 ">
                        <SvgChonburi2 />
                    </div>
                </Link>
                <FontAwesomeIcon
                    icon={faBars}
                    className="z-20 cursor-pointer"
                    onClick={() => setIsOpenSidebar(true)}
                />
            </div>
            {isOpenSidebar && <NavSidebar setIsOpen={setIsOpenSidebar} />}
        </div>
    );
};

export default Navbar;
