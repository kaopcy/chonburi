import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import gsap from "gsap/dist/gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/router";
import Link from "next/link";

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
            .to(overlay.current, { opacity: 0.5 }, "<");
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
                className="absolute -left-full flex h-full w-full max-w-[300px] flex-col items-start bg-white pt-10"
                ref={container}
            >
                <FontAwesomeIcon
                    onClick={() => animation.current.reverse()}
                    icon={faXmark}
                    className=" absolute top-0 right-0 p-4 text-lg text-text "
                />
                {navItems.map((link, i) => (
                    <Link href={link.to} key={Math.random(0) * (i + 1)}>
                        <div
                            className={`cursor-pointer relative     text-lg ${
                                link.match ? "text-primary" : "text-text"
                            }`}
                        >
                            <span className="">{link.name}</span>
                            {link.match && (
                                <div className="h-[2px] w-full absolute left-0 bottom-0 bg-primary"></div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
});

export default NavSidebar;
