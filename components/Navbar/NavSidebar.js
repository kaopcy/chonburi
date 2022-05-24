import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import gsap from "gsap/dist/gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/router";
import Link from "next/link";
import MatchLink from "../Utils/MatchLink";

const NavSidebar = forwardRef(({ setIsOpen, navItems }, ref) => {
    const router = useRouter();
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
                className="absolute -left-full flex h-full w-full max-w-[300px] flex-col items-start  bg-white pt-10 text-lg"
                ref={container}
            >
                <FontAwesomeIcon
                    onClick={() => animation.current.reverse()}
                    icon={faXmark}
                    className=" absolute top-0 right-0 p-4 text-lg text-text "
                />
                {navItems.map((link) =>
                    link.to === "/" ? (
                        <NormalLink link={link} key={link.name} />
                    ) : (
                        <DropdownLink link={link} key={link.name} />
                    )
                )}
            </div>
        </div>
    );
});

const NormalLink = ({ link }) => {
    return (
        <div className="flex w-full flex-col">
            <div className="relative flex w-full  cursor-pointer items-center  justify-between px-4  py-2 ">
                <MatchLink path={link.to}>
                    {({ isMatch }) => (
                        <div className="flex items-center">
                            <FontAwesomeIcon
                                icon={link.icon}
                                className={`mr-4 text-base text-text-lighter  ${
                                    isMatch && "!text-primary"
                                }`}
                            />
                            <span className="z-10 whitespace-nowrap tracking-tighter">
                                {link.name}
                            </span>
                            {isMatch && (
                                <div className="absolute left-0 top-0 z-10 h-full w-[4px] bg-primary"></div>
                            )}
                        </div>
                    )}
                </MatchLink>
            </div>
        </div>
    );
};

const DropdownLink = ({ link }) => {
    const [isDropdown, setIsDropdown] = useState(false);
    const dropdownAnimation = useRef(null);
    const container = useRef(null);
    const detail = useRef(null);

    useEffect(() => {
        dropdownAnimation.current = gsap.to(container.current, {
            height: detail.current.clientHeight,
            paused: true,
            reversed: true,
            ease: "none",
            duration: 0.3,
        });
        return () => {
            if (dropdownAnimation.current) {
                dropdownAnimation.current.kill();
            }
        };
    }, []);

    return (
        <div className="flex w-full flex-col">
            <div className=" relative flex w-full  cursor-pointer items-center  justify-between px-4  py-2 ">
                <MatchLink path={link.to}>
                    {({ isMatch }) => (
                        <>
                            <div className="flex items-center">
                                <FontAwesomeIcon
                                    icon={link.icon}
                                    className={`mr-4 text-base text-text-lighter  ${
                                        isMatch && "!text-primary"
                                    }`}
                                />
                                <span className="z-10 whitespace-nowrap tracking-tighter text-text">
                                    {link.name}
                                </span>
                                {isMatch && (
                                    <div className="absolute left-0 top-0 z-10 h-full w-[4px] bg-primary"></div>
                                )}
                            </div>
                        </>
                    )}
                </MatchLink>
                <FontAwesomeIcon
                    icon={faChevronRight}
                    className={`justify-self-end text-sm text-text-lightest transition-transform  ${
                        dropdownAnimation.current?.reversed() && "rotate-90"
                    }`}
                    onClick={() => {
                        dropdownAnimation.current.reversed()
                            ? dropdownAnimation.current.play()
                            : dropdownAnimation.current.reverse();
                        // setIsDropdown((e) => !e);
                    }}
                />
            </div>
            <div
                ref={container}
                className="relative h-0 w-full overflow-hidden"
            >
                <div className="absolute bottom-0 left-0" ref={detail}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Ducimus officiis, maxime esse perspiciatis harum cumque!
                    Omnis non ab rem soluta?
                </div>
            </div>
        </div>
    );
};

export default NavSidebar;
