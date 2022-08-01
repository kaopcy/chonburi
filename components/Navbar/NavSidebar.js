import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import gsap from "gsap/dist/gsap";

// import components
import SvgUtensil from "../../icons/Utensil";
import SvgMuseum from "../../icons/new/Museum";
import SvgHouse from "../../icons/House";
import SvgSuitcase from "../../icons/Suitcase";

// import HOC
import MatchLink from "../Utils/MatchLink";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
    FacebookShareButton,
    LineShareButton,
    TwitterShareButton,
} from "react-share";
import {
    faFacebook,
    faFacebookSquare,
    faLine,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const NavSidebar = ({ setIsOpen }) => {
    const animation = useRef(null);
    const container = useRef(null);
    const overlay = useRef(null);

    useEffect(() => {
        animation.current = gsap
            .timeline({
                paused: true,
                reversed: true,
                onReverseComplete: () => {
                    setIsOpen(false);
                },
            })
            .to(container.current, { left: 0 })
            .to(overlay.current, { opacity: 0.5 }, "<")
            .fromTo(
                ".sidebar-item",
                { xPercent: -120 },
                {
                    xPercent: 0,
                    stagger: { amount: 0.2, each: 0.1 },
                },
                "<0.1"
            );
        animation.current.play();
    }, []);

    const animationToggle = () => {
        animation.current.reversed()
            ? animation.current.play()
            : animation.current.reverse();
    };

    return (
        <div className="mobile fixed top-0 left-0 z-50 h-screen w-full">
            <div
                ref={overlay}
                className="absolute inset-0 bg-black opacity-0"
                onClick={() => animationToggle()}
            ></div>
            <div
                className="absolute  -left-full flex h-full w-full max-w-[300px] flex-col items-start  bg-white px-8 pt-14 text-lg text-text"
                ref={container}
            >
                <FontAwesomeIcon
                    onClick={() => animation.current.reverse()}
                    icon={faXmark}
                    className=" mb-6 text-2xl "
                />

                <MatchLink index path={`/`}>
                    {({ isMatch }) => (
                        <div className="sidebar-item  flex h-10  w-full items-center ">
                            <div className="mr-8 w-5">
                                <SvgHouse />
                            </div>
                            <div
                                className={`text-base font-medium ${
                                    isMatch && "underline underline-offset-2"
                                }`}
                            >
                                หน้าแรก
                            </div>
                        </div>
                    )}
                </MatchLink>
                <MatchLink path={`/restaurant`}>
                    {({ isMatch }) => (
                        <div className="sidebar-item  flex h-10  w-full items-center ">
                            <div className="mr-8 w-5">
                                <SvgUtensil />
                            </div>
                            <div
                                className={`text-base font-medium ${
                                    isMatch && "underline underline-offset-2"
                                }`}
                            >
                                ร้านอาหาร
                            </div>
                        </div>
                    )}
                </MatchLink>
                <MatchLink path={`/travel`}>
                    {({ isMatch }) => (
                        <div className="sidebar-item  flex h-10  w-full items-center ">
                            <div className="mr-8 w-5">
                                <SvgMuseum />
                            </div>
                            <div
                                className={`text-base font-medium ${
                                    isMatch && "underline underline-offset-2"
                                }`}
                            >
                                แหล่งท่องเที่ยว
                            </div>
                        </div>
                    )}
                </MatchLink>
                <MatchLink path={`/trip`}>
                    {({ isMatch }) => (
                        <div className="sidebar-item  flex h-10  w-full items-center ">
                            <div className="mr-8 w-5">
                                <SvgSuitcase />
                            </div>
                            <div
                                className={`text-base font-medium ${
                                    isMatch && "underline underline-offset-2"
                                }`}
                            >
                                โปรแกรมท่องเที่ยว
                            </div>
                        </div>
                    )}
                </MatchLink>
                <div className="mt-10 h-[1px] w-full bg-text-lightest"></div>
                <Contract />
            </div>
        </div>
    );
};

const Contract = () => {
    return (
        <div className="mt-6 flex flex-col">
            <div className="text-sm font-bold">ติดต่อ</div>
            <div className="flex items-center mt-2">
                <FacebookShareButton url={``}>
                    <FontAwesomeIcon
                        className="mr-4 shrink-0 text-xl   text-[#4267B2]"
                        icon={faFacebookSquare}
                    />
                </FacebookShareButton>
                <TwitterShareButton url={``}>
                    <FontAwesomeIcon
                        className="mr-4 shrink-0 text-xl   text-[#00ACEE]"
                        icon={faTwitter}
                    />
                </TwitterShareButton>
                <LineShareButton url={``}>
                    <FontAwesomeIcon
                        className="mr-4 shrink-0 text-xl   text-[#00B900]"
                        icon={faLine}
                    />
                </LineShareButton>
            </div>
        </div>
    );
};

export default NavSidebar;
