import React, { useEffect, useMemo, useRef, useState } from "react";
import groq from "groq";
import gsap from "gsap/dist/gsap";
import { useRouter } from "next/router";
import useGeolocation from "../../composables/useGeolocation";
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    DirectionsRenderer,
    OverlayView,
} from "@react-google-maps/api";

import { PortableText } from "@portabletext/react";
import { getClient } from "../../lib/sanity.server";
import RouteDisplay from "../../components/Map/RouteDisplay";

import { getCenter } from "geolib";

import { coords } from "../../generalConfig/chonburiCoor";

import { routes as tempRoutes } from "../../generalConfig/tempRoutes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const tempPost = {
    _createdAt: "2022-05-05T20:57:15Z",
    _id: "311d4def-7ed4-4abd-a125-3269f4461861",
    _rev: "TdboPKuuXe2Xo36DQNmD4g",
    _type: "post",
    _updatedAt: "2022-05-06T14:16:52Z",
    coords: {
        _type: "geopoint",
        lat: 13.208179,
        lng: 100.9750484,
    },
    location: "ต.บางพระ อ.ศรีราชา จ.ชลบุรี",
    locationType: "ธรรมชาติ#6BCB77",
    mainImage: [
        {
            _key: "5e9d55908e68",
            _type: "eachImage",
            asset: {
                _ref: "image-c9b84ae0a59bec0c2ba16e5de81bdb22957609e3-672x450-jpg",
                _type: "reference",
            },
        },
        {
            _key: "5c0ac3956c45",
            _type: "eachImage",
            asset: {
                _ref: "image-76cbab943da9353213d28bfdca7a9d79b1a07c13-672x450-jpg",
                _type: "reference",
            },
        },
        {
            _key: "7760e6d2285a",
            _type: "eachImage",
            asset: {
                _ref: "image-8a74fcd61805a22770d41ff6316518088c8b47a2-672x450-jpg",
                _type: "reference",
            },
        },
    ],
    postedAt: {
        _type: "geopoint",
        lat: 13.8575872,
        lng: 100.7255552,
    },
    publishedAt: "2022-05-05T20:55:38.193Z",
    slug: {
        _type: "slug",
        current: "อ่างเก็บน้ำบางพระ",
    },
    title: "อ่างเก็บน้ำบางพระ",
};

const Travel = ({ post }) => {
    // post = tempPost;
    const router = useRouter();
    if (router.isFallback) return <div className="">Loading</div>;

    // not fallback

    const { isLoaded } = useJsApiLoader({
        region: "th",
        language: "th",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    });
    const { currentLocation, error: userLocationError } = useGeolocation();
    const [tempLocation, setTempLocation] = useState(post.coords);

    const [map, setMap] = useState(/**@type google.maps.Map */ (null));
    const [directionRes, setDirectionRes] = useState(
        /**@type google.maps.DirectionsResult */ (null)
    );
    // const [directionRes, setDirectionRes] = useState(tempRoutes);

    const [activePopup, setActivePopup] = useState(0);
    const directionActive = useMemo(() => {
        return directionRes
            ? directionRes.routes[0].legs[0].steps[activePopup]
            : null;
    }, [directionRes, activePopup]);

    const defaultCenter = useMemo(() => {
        if (!currentLocation) return null;
        const center = getCenter([currentLocation, tempLocation]);
        return { lat: center.latitude, lng: center.longitude };
    }, [currentLocation]);

    const [isDisplayRoute, setIsDisplayRoute] = useState(true);

    useEffect(() => {
        if (!map) return;
        map.panTo(directionActive.lat_lngs[0]);
    }, [directionActive]);

    const calculateDirection = async () => {
        const directionService = new google.maps.DirectionsService();
        const result = await directionService.route({
            origin: currentLocation,
            destination: tempLocation,
            travelMode: google.maps.TravelMode.WALKING,
        });
        setDirectionRes(result);
    };

    const setPolyline = () => {
        const polyline = new google.maps.Polyline({
            path: [...coords.map((e) => new google.maps.LatLng(e[0], e[1]))],
            strokeColor: "#000000",
            strokeOpacity: 1,
            strokeWeight: 2,
        });
        polyline.setMap(map);
    };

    const onMapLoad = (map) => {
        calculateDirection();
        map.panTo(defaultCenter);
        if (map.getZoom() !== 10) {
            map.setZoom(9);
        }
        setMap(map);
    };

    return (
        <div className="relative flex w-full flex-col items-center px-3">
            <div className="h-screen w-full"></div>
            <div className="relative mb-16  flex w-full max-w-[1300px] justify-center overflow-hidden sm:mb-4">
                {/* {post.body && <PortableText value={post.body} />} */}
                <div
                    className={`relative flex h-[calc(100vh-120px)] w-full transition-transform duration-500 ${
                        isDisplayRoute
                            ? "sm:translate-x-[-200px]"
                            : "sm:translate-x-0"
                    }`}
                >
                    {isLoaded && defaultCenter && (
                        <GoogleMap
                            center={defaultCenter}
                            zoom={8}
                            mapContainerStyle={{
                                width: "100%",
                                height: "100%",
                            }}
                            options={{
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
                                zoomControlOptions: {
                                    position:
                                        google.maps.ControlPosition.LEFT_CENTER,
                                },
                                fullscreenControlOptions: {
                                    position:
                                        google.maps.ControlPosition.TOP_LEFT,
                                },
                            }}
                            onLoad={onMapLoad}
                        >
                            {currentLocation && (
                                <Marker
                                    options={{ optimized: true }}
                                    position={currentLocation}
                                    animation={google.maps.Animation.BOUNCE}
                                />
                            )}
                            {tempLocation && (
                                <Marker
                                    options={{ optimized: true }}
                                    position={tempLocation}
                                    animation={google.maps.Animation.BOUNCE}
                                />
                            )}
                            {directionActive && (
                                <OverlayView
                                    position={directionActive.lat_lngs[0]}
                                    mapPaneName={
                                        OverlayView.OVERLAY_MOUSE_TARGET
                                    }
                                >
                                    <div
                                        className=" relative flex origin-top-right -translate-x-full flex-col rounded-md  border bg-white p-3 py-2 text-sm  text-text opacity-90"
                                        id="test"
                                    >
                                        <div className="">
                                            {directionRes.routes[0].legs[0]
                                                .steps.length -
                                                1 ===
                                            activePopup
                                                ? "จุดหมาย"
                                                : activePopup === 0
                                                ? "จุดเริ่มต้น"
                                                : "เส้นทาง"}
                                        </div>
                                        <div className="">
                                            {directionActive.distance.text}
                                        </div>
                                    </div>
                                </OverlayView>
                            )}

                            {directionRes && (
                                <>
                                    <DirectionsRenderer
                                        options={{
                                            suppressMarkers: true,
                                            preserveViewport: true,
                                        }}
                                        directions={directionRes}
                                    />
                                </>
                            )}
                        </GoogleMap>
                    )}
                </div>

                <div
                    className={`fixed bottom-0 right-0 h-[400px] w-full max-w-[400px] transition-transform duration-300  sm:absolute sm:h-[calc(100vh-120px)]   sm:duration-500 ${
                        isDisplayRoute
                            ? " translate-y-0 sm:translate-x-0 "
                            : " translate-y-full sm:translate-y-0 sm:translate-x-full "
                    }`}
                >
                    <div className="flex h-full w-full shrink-0 ">
                        {directionRes && (
                            // <RouteDisplay routes={directionRes?.routes[0].legs[0]} />
                            <RouteDisplay
                                userLocationError={userLocationError}
                                routes={directionRes?.routes[0].legs[0]}
                                setActivePopup={setActivePopup}
                                endPoint={router.query.slug}
                            />
                        )}
                        <div
                            className="flex-col-cen absolute bottom-full left-0  h-16 w-full rounded-t-3xl  border  bg-white   sm:left-0 sm:top-1/2 sm:hidden"
                            onClick={() => setIsDisplayRoute((e) => !e)}
                        >
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`rotate-180 text-text-lightest transition-transform duration-700  ${
                                    isDisplayRoute && "rotate-0"
                                }`}
                            />
                            <div className="text-text ">เส้นทาง</div>
                        </div>

                        <div
                            className="flex-col-cen absolute  top-1/2 right-full hidden h-10 w-10 rounded-l-xl border bg-white sm:flex"
                            onClick={() => setIsDisplayRoute((e) => !e)}
                        >
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className={`rotate-180 text-text transition-transform duration-700  ${
                                    isDisplayRoute && "rotate-0"
                                }`}
                            />
                        </div>
                    </div>
                </div>
                {/* <div ref={panel }  className="fixed top-0 left-0"></div>   */}
            </div>
        </div>
    );
};

export async function getStaticPaths() {
    const path = await getClient().fetch(
        groq`
            *[(_type == "post" || _type == "restaurant") && defined(slug.current)][].slug.current
        `
    );
    return {
        paths: path.map((slug) => ({ params: { slug } })),
        fallback: true,
    };
}

const query = groq`
*[(_type == "post" || _type == "restaurant") && slug.current == $slug][0]`;

export async function getStaticProps({ params, preview = false }) {
    const post = await getClient(preview).fetch(query, { slug: params.slug });
    return {
        props: {
            post,
        },
    };
}

export default Travel;
