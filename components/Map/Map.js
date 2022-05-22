import React, { useEffect, useMemo, useState } from "react";
import groq from "groq";
import { useRouter } from "next/router";
import useGeolocation from "../../composables/useGeolocation";

import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    DirectionsRenderer,
} from "@react-google-maps/api";

import { PortableText } from "@portabletext/react";
import { getClient } from "../../lib/sanity.server";
import RouteDisplay from "../../components/Map/RouteDisplay";

import { getCenter } from "geolib";

import { coords } from "../../generalConfig/chonburiCoor";

const Map = ({ post }) => {
    const router = useRouter();
    if (router.isFallback) return <div className="">Loading</div>;

    // not fallback
    
    const { isLoaded } = useJsApiLoader({
        region: "th",
        language: "th",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    });
    const { currentLocation } = useGeolocation();
    const [tempLocation, setTempLocation] = useState(post.coords);

    const [map, setMap] = useState(/**@type google.maps.Map */ (null));
    const [directionRes, setDirectionRes] = useState(
        /**@type google.maps.DirectionsResult */ (null)
    );

    const defaultCenter = useMemo(() => {
        if (!currentLocation) return null;
        const center = getCenter([currentLocation, tempLocation]);
        return { lat: center.latitude, lng: center.longitude };
    }, [currentLocation]);

    const calculateDirection = async () => {
        const directionService = new google.maps.DirectionsService();
        const result = await directionService.route({
            origin: currentLocation,
            destination: tempLocation,
            travelMode: google.maps.TravelMode.WALKING,
        });
        setDirectionRes(result);
        console.log(result);
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

    return (
        <div className="relative flex  w-full flex-col items-center px-3">
            {post.body && <PortableText value={post.body} />}
            <div className="relative flex h-[calc(100vh-100px)] w-full max-w-[900px]">
                {isLoaded && defaultCenter && (
                    <GoogleMap
                        center={defaultCenter}
                        zoom={8}
                        mapContainerStyle={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "20px",
                        }}
                        options={{
                            streetViewControl: false,
                            mapTypeControl: false,
                        }}
                        onLoad={(map) => {
                            calculateDirection();
                            map.panTo(defaultCenter);
                            if (map.getZoom() !== 10) {
                                map.setZoom(9);
                            }
                            setMap(map);
                        }}
                    >
                        {currentLocation && (
                            <Marker position={currentLocation} />
                        )}
                        {directionRes && (
                            <DirectionsRenderer directions={directionRes} />
                        )}
                    </GoogleMap>
                )}
            </div>
            {directionRes && <RouteDisplay routes={directionRes?.routes[0].legs} />}
            <div className="h-56"></div>
        </div>
    );
};

export default Map;
