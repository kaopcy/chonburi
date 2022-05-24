import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

import gsap from "gsap/dist/gsap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
    faMountain,
    faUtensils,
    faHouseChimney,
} from "@fortawesome/free-solid-svg-icons";

import NavSidebar from "./NavSidebar";
import PoiDropdown from "./PoiDropdown";
import RestaurantDropdown from "./RestaurantDropdown";

import MatchLink from "../Utils/MatchLink";

const Navbar = () => {
    const router = useRouter();

    const navItems = useMemo(
        () => [
            {
                name: "หน้าแรก",
                to: "/",
                match: router.pathname === "/",
                icon: faHouseChimney
            },
            {
                name: "แหล่งท่องเที่ยว",
                to: "/travel",
                match: router.pathname === "/travel",
                icon: faMountain
            },
            {
                name: "ร้านอาหาร & คาเฟ่",
                to: "/restaurant",
                match: router.pathname === "/restaurant",
                icon: faUtensils
            },
        ],
        []
    );

    const navbarRef = useRef(null);
    const animation = useRef(null);
    useEffect(() => {
        animation.current = gsap
            .timeline({
                scrollTrigger: {
                    trigger: navbarRef.current,
                    start: "bottom top",
                    end: "center top",
                    toggleActions: "play none reverse none",
                },
            })
            .to(navbarRef.current, {
                height: "70px",
                duration: 0.7,
                ease: "expo.inOut",
            });
    }, []);

    // navsidebar
    const navsidebarRef = useRef(null);
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);

    return (
        <div
            ref={navbarRef}
            className="fixed z-[100] flex h-[70px] w-full  flex-col lg:h-[100px]"
        >
            <div className="hidden h-full w-full  max-w-[1300px] items-center justify-between self-center px-3  text-xl font-medium text-text lg:flex">
                <div className="absolute top-0 left-0 z-10 h-full w-full bg-white opacity-80"></div>
                <Link href={"/"} passHref>
                    <h1 className="z-20 cursor-pointer  text-[40px] font-bold text-text">
                        ชลบุรี
                    </h1>
                </Link>

                <div className="z-20 flex justify-center space-x-6">
                    <div className="group relative py-4">
                        <MatchLink path="/">
                            {({ isMatch }) => (
                                <div
                                    className={` cursor-pointer  px-4 ${
                                        isMatch ? "text-primary" : "text-text"
                                    }`}
                                >
                                    <span className="">หน้าแรก</span>
                                    {isMatch && (
                                        <div className="h-[3px] w-full bg-primary"></div>
                                    )}
                                </div>
                            )}
                        </MatchLink>
                        <PoiDropdown />
                    </div>
                    <div className="group relative py-4">
                        <MatchLink path="/travel">
                            {({ isMatch }) => (
                                <div
                                    className={` cursor-pointer  px-4 ${
                                        isMatch ? "text-primary" : "text-text"
                                    }`}
                                >
                                    <span className="mr-2">แหล่งท่องเที่ยว</span>
                                    <FontAwesomeIcon icon={faChevronDown} className="group-hover:rotate-180  transition-transform text-sm text-text-lighter "/>
                                    {isMatch && (
                                        <div className="h-[3px] w-full bg-primary"></div>
                                    )}
                                </div>
                            )}
                        </MatchLink>
                        <PoiDropdown />
                    </div>
                    <div className="group relative py-4">
                        <MatchLink path="/restaurant">
                            {({ isMatch }) => (
                                <div
                                    className={` cursor-pointer  px-4 ${
                                        isMatch ? "text-primary" : "text-text"
                                    }`}
                                >
                                    <span className="mr-2">ร้านอาหาร & กาแฟ</span>
                                    <FontAwesomeIcon icon={faChevronDown} className="group-hover:rotate-180  transition-transform text-sm text-text-lighter "/>
                                    {isMatch && (
                                        <div className="h-[3px] w-full bg-primary"></div>
                                    )}
                                </div>
                            )}
                        </MatchLink>
                        <RestaurantDropdown />
                    </div>
                </div>

                <div className="z-20 flex items-center rounded-xl border-[3px] border-primary px-4 py-1 text-xl">
                    <div className="mr-2">ข้อมูล</div>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className="text-text-light text-sm "
                    />
                </div>
            </div>
            <div className="flex h-full  w-full max-w-[1300px] items-center justify-between self-center  px-3 text-xl font-medium text-text lg:hidden">
                <div className="absolute top-0 left-0 z-10 h-full w-full bg-white opacity-80"></div>
                <Link href={"/"} passHref>
                    <h1 className="z-20  cursor-pointer text-3xl font-bold ">
                        ชลบุรี
                    </h1>
                </Link>
                <FontAwesomeIcon
                    icon={faBars}
                    className="z-20 cursor-pointer"
                    onClick={() => setIsOpenSidebar(true)}
                />
            </div>
            {isOpenSidebar && (
                <NavSidebar
                    navItems={navItems}
                    ref={navsidebarRef}
                    setIsOpen={setIsOpenSidebar}
                />
            )}
        </div>
    );
};

export default Navbar;
