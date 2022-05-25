import React, { useEffect, useMemo, useRef, useState } from "react";
import groq from "groq";
import { useRouter } from "next/router";
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    DirectionsRenderer,
    OverlayView,
} from "@react-google-maps/api";
import { PortableText } from "@portabletext/react";
import { getCenter } from "geolib";

// import custom hooks
import useGeolocation from "../../composables/useGeolocation";
import { getClient } from "../../lib/sanity.server";
import {
    useDirectionContext,
    useActiveDirection,
    DirectionProvider,
} from "../../context/DirectionContext";
import { PostProvider, usePost, usePosts } from "../../context/PostContext";

// import constants
import { coords } from "../../config/mapConstants/chonburiCoor";
import { mapStyles } from "../../config/mapConstants/mapStyles";

// import components
import InfoPanel from "../../components/Map/InfoPanel/InfoPanel";

const Travel = ({ post, posts }) => {
    return (
        <PostProvider initialPost={post} initialPosts={posts}>
            <DirectionProvider>
                <Inside />
            </DirectionProvider>
        </PostProvider>
    );
};

const Inside = () => {
    // post = tempPost;
    const router = useRouter();
    if (router.isFallback) return <div className="">Loading</div>;

    // not fallback
    const { post } = usePost();
    const { posts } = usePosts();

    const { isLoaded } = useJsApiLoader({
        region: "th",
        language: "th",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    });
    const { currentLocation, error: userLocationError } = useGeolocation();
    const { direction, setDirection } = useDirectionContext();
    const { activeDirection } = useActiveDirection();

    const [tempLocation, setTempLocation] = useState(post.coords);

    const [map, setMap] = useState(/**@type google.maps.Map */ (null));

    const directionActive = useMemo(() => {
        return direction
            ? direction.routes[0].legs[0].steps[activeDirection]
            : null;
    }, [direction, activeDirection]);

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
        setDirection(result);
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

    // add nearby marker
    const nearByMarker = useRef([]);
    const timeoutRef = useRef([]);

    const addNearbyMarker = () => {
        if (!map) return;
        clearMarker();
        for (let i = 0; i < posts.length; i++) {
            timeoutRef.current.push(
                window.setTimeout(() => {
                    nearByMarker.current.push(
                        new google.maps.Marker({
                            position: {
                                lat: posts[i].coords.lat,
                                lng: posts[i].coords.lng,
                            },
                            map,
                            title: posts[i].title,
                            animation: google.maps.Animation.DROP,
                        })
                    );
                }, i * 50)
            );
        }
    };

    const clearMarker = () => {
        timeoutRef.current.forEach((e) => clearTimeout(e));
        nearByMarker.current.forEach((e) => e.setMap(null));
        nearByMarker.current = [];
    };

    const onMapLoad = (map) => {
        // calculateDirection();
        map.panTo(defaultCenter);
        if (map.getZoom() !== 10) {
            map.setZoom(9);
        }
        setMap(map);
    };

    return (
        <div className="relative flex w-full flex-col items-center sm:px-3">
            <div className="relative flex w-full  justify-center overflow-hidden ">
                <div
                    onClick={() => addNearbyMarker()}
                    className="absolute top-0 left-0 z-10 rounded-xl bg-white px-4 py-2 text-text"
                >
                    Click Me
                </div>

                <div
                    onClick={() => clearMarker()}
                    className="absolute top-0 left-20 z-10 rounded-xl bg-white px-4 py-2 text-text"
                >
                    Clear
                </div>
                {/* {post.body && <PortableText value={post.body} />} */}
                <div
                    className={`relative flex h-[calc(100vh-120px)]  w-full transition-transform duration-500 ${
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
                                styles: mapStyles,
                            }}
                            onLoad={onMapLoad}
                        >
                            {currentLocation && (
                                <Marker
                                    options={{ optimized: true }}
                                    position={currentLocation}
                                    animation={google.maps.Animation.DROP}
                                />
                            )}
                            {tempLocation && (
                                <Marker
                                    options={{ optimized: true }}
                                    position={tempLocation}
                                    animation={google.maps.Animation.DROP}
                                />
                            )}
                            {directionActive && (
                                <OverlayView
                                    position={directionActive.lat_lngs[0]}
                                    mapPaneName={
                                        OverlayView.OVERLAY_MOUSE_TARGET
                                    }
                                >
                                    <div className=" relative flex origin-top-right -translate-x-full flex-col rounded-md  border bg-white p-3 py-2 text-sm  text-text opacity-90">
                                        <div className="">
                                            {direction.routes[0].legs[0].steps
                                                .length -
                                                1 ===
                                            activeDirection
                                                ? "จุดหมาย"
                                                : activeDirection === 0
                                                ? "จุดเริ่มต้น"
                                                : "เส้นทาง"}
                                        </div>
                                        <div className="">
                                            {directionActive.distance.text}
                                        </div>
                                    </div>
                                </OverlayView>
                            )}

                            {direction && (
                                <DirectionsRenderer
                                    options={{
                                        suppressMarkers: true,
                                        preserveViewport: true,
                                    }}
                                    directions={direction}
                                />
                            )}
                        </GoogleMap>
                    )}
                </div>
                <InfoPanel
                    isDisplayRoute={isDisplayRoute}
                    setIsDisplayRoute={setIsDisplayRoute}
                    userLocationError={userLocationError}
                />
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

const postQuery = groq`
*[(_type == "post" || _type == "restaurant") && slug.current == $slug][0]`;
const postsQuery = groq`
*[(_type == "post" || _type == "restaurant")] {_id,coords , title}`;

export async function getStaticProps({ params, preview = false }) {
    const post = await getClient(preview).fetch(postQuery, {
        slug: params.slug,
    });
    const posts = await getClient(preview).fetch(postsQuery);
    return {
        props: {
            post,
            posts,
        },
    };
}

export default Travel;
