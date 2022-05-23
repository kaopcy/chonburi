import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

import gsap from "gsap/dist/gsap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import NavSidebar from "./NavSidebar";
import PoiDropdown from "./PoiDropdown";
import RestaurantDropdown from "./RestaurantDropdown";

const Navbar = () => {
    const router = useRouter();

    const navItems = useMemo(
        () => [
            {
                name: "หน้าแรก",
                to: "/",
                match: router.pathname === "/",
            },
            {
                name: "แหล่งท่องเที่ยว",
                to: "/travel",
                match: router.pathname === "/travel",
            },
            {
                name: "ร้านอาหาร & คาเฟ่",
                to: "/restaurant",
                match: router.pathname === "/restaurant",
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
                    {navItems.map((link, i) => (
                        <div className="group relative py-4">
                            <Link href={link.to} key={Math.random(0) * (i + 1)}>
                                <div
                                    className={` cursor-pointer  px-4 ${
                                        link.match
                                            ? "text-primary"
                                            : "text-text"
                                    }`}
                                >
                                    <span className="">{link.name}</span>
                                    {link.match && (
                                        <div className="h-[3px] w-full bg-primary"></div>
                                    )}
                                </div>
                            </Link>
                            {link.name === "แหล่งท่องเที่ยว" && <PoiDropdown />}
                            {link.name === "ร้านอาหาร & คาเฟ่" && (
                                <RestaurantDropdown />
                            )}
                        </div>
                    ))}
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
