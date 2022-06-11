import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap/dist/gsap";
import { useRouter } from "next/router";
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    DirectionsRenderer,
    OverlayView,
} from "@react-google-maps/api";
import { getCenter } from "geolib";

// import custom hooks
import {
    useDirectionContext,
    useActiveDirection,
} from "../../../context/DirectionContext";
import {
    usePostsContext,
    usePostContext,
} from "../../../context/Travel/PostContext";
import { useUserLocation } from "../../../context/UserLocationContext";
import { useActiveOtherPlace } from "../../../context/Travel/ActiveOtherPlaceContext";
import { useSelectorContext } from "../../../context/Travel/SelectorContext";
import { useMapSmoothPan } from "../../../composables/useMapSmoothPan";

// import constants
import { coords } from "../../../config/mapConstants/chonburiCoor";
import { mapStyles } from "../../../config/mapConstants/mapStyles";
import { chonburiShape } from "../../../config/mapConstants/chonburiShape";

// import components
import Overlay from "../Detail/Overlay";

// import icons
import { faImage } from "@fortawesome/free-solid-svg-icons";

const Map = () => {
    const router = useRouter();
    if (router.isFallback) return <div className="">Loading</div>;

    // not fallback
    const { post } = usePostContext();
    const { posts } = usePostsContext();

    const { isLoaded } = useJsApiLoader({
        region: "th",
        language: "th",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    });
    const { userLocation } = useUserLocation();
    const { setDirection } = useDirectionContext();
    const { activeDirectionCoord } = useActiveDirection();
    const { selectedMode } = useSelectorContext();

    const [tempLocation, setTempLocation] = useState(post.coords);

    const [map, setMap] = useState(/**@type google.maps.Map */ (null));
    const { smoothlyAnimatePanTo } = useMapSmoothPan(map);

    const defaultCenter = useMemo(() => {
        if (!userLocation) return null;
        const center = getCenter([userLocation, tempLocation]);
        return { lat: center.latitude, lng: center.longitude };
    }, [userLocation]);

    useEffect(() => {
        if (!map || selectedMode !== "เส้นทาง") return;
        // map.panTo(activeDirectionCoord);
        const destCoords = new google.maps.LatLng(
            activeDirectionCoord.lat,
            activeDirectionCoord.lng
        );
        smoothlyAnimatePanTo(destCoords , 15);
    }, [activeDirectionCoord, selectedMode === "เส้นทาง"]);

    const calculateDirection = async () => {
        const directionService = new google.maps.DirectionsService();
        const result = await directionService.route({
            origin: userLocation,
            destination: tempLocation,
            travelMode: google.maps.TravelMode.WALKING,
        });
        setDirection(result);
    };

    const onMapLoad = (map) => {
        // calculateDirection();
        map.panTo(defaultCenter);
        if (map.getZoom() !== 10) {
            map.setZoom(9);
        }
        setMap(map);
        chonburiShape.forEach((shape) => {
            const polyline = new google.maps.Polygon({
                fillColor: "#fff",
                fillOpacity: 0.2,
                path: [
                    ...shape.map((e) => ({
                        lat: parseFloat(e[1]),
                        lng: parseFloat(e[0]),
                    })),
                ],
                strokeColor: "#4d4d4d",
                strokeOpacity: 1,
                strokeWeight: 1.5,
            });
            polyline.setMap(map);
        });
    };

    return (
        isLoaded &&
        defaultCenter && (
            <GoogleMap
                center={defaultCenter}
                zoom={15}
                mapContainerStyle={{
                    width: "100%",
                    height: "100%",
                }}
                options={{
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
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.LEFT_CENTER,
                    },
                    fullscreenControl: false,
                    styles: mapStyles,
                }}
                onLoad={onMapLoad}
            >
                {userLocation && (
                    <Marker
                        options={{ optimized: true }}
                        position={userLocation}
                        animation={google.maps.Animation.DROP}
                    >
                        children={<div>หัวดอเอ้ย</div>}
                    </Marker>
                )}
                {tempLocation && (
                    <Marker
                        options={{ optimized: true }}
                        position={tempLocation}
                        animation={google.maps.Animation.DROP}
                    />
                )}
                <OtherPlaces />
                <DirectionRouteDisplay />
            </GoogleMap>
        )
    );
};

const OtherPlaces = () => {
    const { selectedMode } = useSelectorContext();
    const { distanceSortedPost, posts } = usePostsContext();
    const { activeOtherPlace } = useActiveOtherPlace();

    useEffect(() => {
        console.log("distanceSortedPost: ", distanceSortedPost);
    }, [distanceSortedPost]);

    return activeOtherPlace.map(
        (post, index) =>
            selectedMode === "สถานที่อื่นๆ" && (
                <Overlay key={post._id} post={post} index={index} />
            )
    );
};

const DirectionRouteDisplay = () => {
    const { activeDirectionCoord } = useActiveDirection();
    const { direction } = useDirectionContext();
    const { selectedMode } = useSelectorContext();

    return (
        activeDirectionCoord &&
        selectedMode === "เส้นทาง" && (
            <>
                <OverlayView
                    onLoad={() => {
                        gsap.from(".overlay-ref", {
                            yPercent: 100,
                        });
                    }}
                    position={activeDirectionCoord}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                    <div className="overlay-ref  absolute top-0 left-0 flex  w-32  flex-col rounded-md  border bg-white p-3 py-2 text-sm  text-text opacity-100 shadow-md">
                        <div className="">ควย</div>
                    </div>
                </OverlayView>
                <OverlayView
                    position={activeDirectionCoord}
                    mapPaneName={OverlayView.MARKER_LAYER}
                >
                    <div className="absolute top-1/2 left-1/2 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white"></div>
                </OverlayView>
                <DirectionsRenderer
                    options={{
                        suppressMarkers: true,
                        preserveViewport: true,
                    }}
                    directions={direction}
                />
            </>
        )
    );
};

export default Map;
