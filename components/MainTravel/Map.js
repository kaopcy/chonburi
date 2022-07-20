import React, { useRef, useEffect, useState } from "react";
import { useJsApiLoader, GoogleMap, OverlayView } from "@react-google-maps/api";
import gsap from "gsap/dist/gsap";

// import contexts
import { useMapContext } from "../../context/MainTravel/MapContext";
import { usePostsContext } from "../../context/MainTravel/PostContext";

// import constants - configs
import { mapStyles } from "../../config/mapConstants/mapStyles";

// import components
import AmphoeSelector from "./AmphoeSelector";
import SearchBar from "./SearchBar";
import LocationMarker from "./LocationMarker";

const Map = () => {
    const { postByActiveAmphoe } = usePostsContext();
    const { isOpen, setMap, map } = useMapContext();
    const { isLoaded } = useJsApiLoader({
        region: "th",
        language: "th",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    });
    const mockCenter = useRef({ lat: 13, lng: 102 });
    const [isShowMap, setIsShowMap] = useState(false);

    const markerRef = useRef([]);

    useEffect(() => {
        const mapRef = document.getElementById("map-haha");
        const evnt = (event) => {
            if (event.srcElement !== mapRef) return;
            if (isOpen) setIsShowMap(true);
        };
        mapRef.addEventListener("transitionend", evnt);
        return () => {
            setIsShowMap(false);
            if (mapRef) mapRef.removeEventListener("transitionend", evnt);
        };
    }, [isOpen]);

    // useEffect(() => {
    //     if (!isLoaded || !isShowMap) return;
    //     console.log(markerRef.current);
    //     const evt = (e) => {
    //         console.log(e);
    //     };
    //     markerRef.current.forEach((marker) => {
    //         if (!marker) return;
    //         marker.addEventListener("mouseenter", evt);
    //     });
    //     return () => {
    //         markerRef.current.forEach((marker) => {
    //             if (!marker) return;
    //             marker.removeEventListener("mouseenter", evt);
    //         });
    //     };
    // }, [postByActiveAmphoe, isShowMap, isLoaded]);

    const onMapLoad = (initMap) => {
        setMap(initMap);
    };

    const currentOver = useRef();
    const onMouseOver = (e) => {
        currentOver.current = e.currentTarget;
        const currentTarget = e.currentTarget;
        currentTarget.style.zIndex = 100;

        const {
            right: curRight,
            top: curTop,
            bottom: curBottom,
            left: curLeft,
        } = e.currentTarget.getBoundingClientRect();

        const otherMarker = markerRef.current.filter((marker) => {
            return marker != currentTarget;
        });

        let overlapMarker = []
        otherMarker.forEach((marker) => {
            if (!marker) return;
            const {
                right: markerRight,
                top: markerTop,
                bottom: markerBottom,
                left: markerLeft,
            } = marker.getBoundingClientRect();

            const overlapping = !(
                curRight < markerLeft ||
                curLeft > markerRight ||
                curBottom < markerTop ||
                curTop > markerBottom
            );
            if (overlapping) {
                marker.style.opacity = 0.4;
                marker.style.zIndex = 0;
            } else {
                marker.style.opacity = 1;
                marker.style.zIndex = 10;
            }
        });
    };
    const onMouseLeave = (e) => {
        if (currentOver.current !== e.currentTarget) return;
        currentOver.current.style.zIndex = 10;
        markerRef.current.forEach((marker, index) => {
            if (!marker) return;

            marker.style.opacity = 1;
            marker.style.zIndex = 10;
        });
    };

    useEffect(() => {
        if (!map) return;
        if (!postByActiveAmphoe || postByActiveAmphoe === undefined) return;
        const newBounds = new google.maps.LatLngBounds();
        postByActiveAmphoe.forEach((place) => {
            newBounds.extend({
                lat: parseFloat(place.coords.lat),
                lng: parseFloat(place.coords.lng),
            });
        });
        map.fitBounds(newBounds);
    }, [postByActiveAmphoe, map]);

    return (
        <div
            id="map-haha"
            className={`flex-cen  relative h-full shrink-0 bg-white  transition-all duration-1000 ease-in-out  ${
                isOpen ? "!w-[100%] md:!w-[55%] " : "w-0"
            }`}
        >
            <div className=" group absolute left-0 top-0 z-20  flex w-full  items-center justify-between gap-3 px-2 py-2 md:hidden  md:py-4">
                <div className="absolute inset-0 bg-white opacity-80"></div>
                <AmphoeSelector />
                <SearchBar />
            </div>
            {isOpen && !isShowMap && (
                <div className=" h-20 w-20 animate-spin rounded-full rounded-tl-none border-2 border-red-400 "></div>
            )}
            {isShowMap && isLoaded && (
                <GoogleMap
                    clickableIcons={false}
                    onLoad={onMapLoad}
                    center={mockCenter.current}
                    zoom={8}
                    mapContainerStyle={{
                        width: "100%",
                        height: "100%",
                    }}
                    options={{
                        clickableIcons: false,
                        gestureHandling: "greedy",
                        restriction: {
                            latLngBounds: {
                                north: 20.4178496363,
                                south: 5.67,
                                west: 97.3758964376,
                                east: 105.589038527,
                            },
                            strictBounds: false,
                        },
                        streetViewControl: false,
                        mapTypeControl: false,
                        zoomControl: false,
                        fullscreenControl: false,
                        styles: mapStyles,
                    }}
                >
                    {postByActiveAmphoe?.map((post, index) => (
                        <LocationMarker
                            ref={(e) => (markerRef.current[index] = e)}
                            key={post.placeID}
                            position={post.coords}
                            post={post}
                            onMouseLeave={onMouseLeave}
                            onMouseOver={onMouseOver}
                        />
                    ))}
                </GoogleMap>
            )}
        </div>
    );
};

const Overlay = ({ post, index }) => {
    const isLoad = useRef(false);
    const markerRef = useRef(null);
    const timeline = useRef(null);
    const onLoad = () => {
        isLoad.current = true;
        timeline.current = gsap.timeline();
        if (!markerRef.current) return;
        gsap.set(markerRef.current, { opacity: 0, yPercent: -200 });
        gsap.to(markerRef.current, {
            opacity: 1,
            delay: parseFloat(index * 0.13).toFixed(2),
            yPercent: 0,
            ease: "elastic.out(1.2,0.5)",
            duration: 1,
        });
    };

    useEffect(() => {
        if (isLoad) {
            timeline.current = gsap.timeline();
            if (!markerRef.current) return;
            gsap.set(markerRef.current, { opacity: 0, yPercent: -200 });
            gsap.to(markerRef.current, {
                opacity: 1,
                delay: parseFloat(index * 0.13).toFixed(2),
                yPercent: 0,
                ease: "elastic.out(1.2,0.5)",
                duration: 1,
            });
        }
        return () => {
            if (timeline.current) {
                timeline.current.kill();
            }
        };
    }, []);

    return (
        <OverlayView
            position={post.coords}
            mapPaneName={OverlayView.FLOAT_PANE}
            onLoad={onLoad}
        >
            <div
                onClick={() => setIsOpen((e) => !e)}
                ref={markerRef}
                className="relative flex max-w-[150px] items-center whitespace-nowrap rounded-full bg-white py-[4px]  px-[4px] font-sarabun shadow-big hover:border-blue-400"
            >
                <div className="ml-2 mr-1 flex min-w-0 flex-col">
                    <div className="ellipsis font-bold">{post.title}</div>
                    <div className="flex items-center text-[10px] text-text-lighterr ">
                        <span>ร้านอาหาร</span>{" "}
                        <span className="mx-1 h-[2.5px] w-[2.5px] shrink-0 rounded-full bg-text-lighter font-light"></span>
                        <span>3 รีวิว</span>
                    </div>
                </div>
            </div>
        </OverlayView>
    );
};

export default Map;
