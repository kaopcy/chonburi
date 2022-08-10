import { useEffect, useRef } from "react";
import gsap from "gsap/dist/gsap";
const useZoomEffect = (
    linkRef,
    options = {
        opacity: 0.4,
        zoom: 2,
        onMouseEnterCallback: () => {},
        onMouseLeaveCallback: () => {},
    }
) => {
    const zoomRef = useRef(null);
    const overlayRef = useRef(null);
    const hover = useRef(null);

    useEffect(() => {
        if (!zoomRef.current || !overlayRef.current) return;
        hover.current = gsap
            .timeline({ paused: true, reversed: true })
            .to(zoomRef.current, {
                scale: options.zoom,
            })
            .to(
                overlayRef.current,
                {
                    opacity: options.opacity,
                },
                "<"
            );
        const onMouseEnter = () => {
            options.onMouseEnterCallback();
            hover.current.play();
        };
        const onMouseLeave = (e) => {
            if (linkRef.current.contains(e.target)) return;
            options.onMouseLeaveCallback();
            hover.current.reverse();
        };
        overlayRef.current.addEventListener("mouseenter", onMouseEnter, { passive: true });
        overlayRef.current.addEventListener("mouseleave", onMouseLeave, { passive: true });

        return () => {
            if (overlayRef.current) {
                overlayRef.current.removeEventListener(
                    "mouseenter",
                    onMouseEnter
                );
                overlayRef.current.removeEventListener(
                    "mouseleave",
                    onMouseLeave
                );
            }
        };
    }, []);
    return { overlayRef, zoomRef };
};

export default useZoomEffect;
