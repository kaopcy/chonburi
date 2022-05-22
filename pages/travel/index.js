import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    InfoWindow,
    InfoBox,
} from "@react-google-maps/api";
import groq from "groq";

import useGeolocation from "../../composables/useGeolocation";

import { getClient } from "../../lib/sanity.server";
import { getCenter } from "geolib";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import InfoWindowContent from "../../components/Map/InfoWindowContent";

const Restaurant = ({ posts }) => {
    const { isLoaded } = useJsApiLoader({
        region: "th",
        language: "th",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    });
    const { currentLocation } = useGeolocation();

    const [map, setMap] = useState(/**@type google.maps.Map */ (null));

    const [markerDetail, setMarkerDetail] = useState(null);

    const center = useMemo(() => {
        return {
            lat: 13.140154448470017,
            lng: 101.20415951907635,
        };
    }, []);

    return (
        <div className="flex h-screen w-full flex-col px-3">
            <div className="aspect-square h-[calc(100vh-200px)] w-full  max-w-[800px] self-center">
                {isLoaded && (
                    <GoogleMap
                        center={center}
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
                            if (map.getZoom() !== 10) {
                                map.setZoom(10);
                            }
                            setMap(map);
                        }}
                    >
                        {currentLocation && (
                            <Marker position={currentLocation} />
                        )}
                        {posts &&
                            posts.map((post, i) => (
                                <Marker
                                    icon={{
                                        url: `/markers/${
                                            post.locationType.split("#")[0]
                                        }.png`,
                                    }}
                                    key={post._id}
                                    onClick={(e) => {
                                        if (!map) return;
                                        map.panTo(post.coords);
                                        if (map.getZoom() < 10) {
                                            map.setZoom(10);
                                        }
                                        setMarkerDetail(post);
                                    }}
                                    position={post.coords}
                                />
                            ))}
                        {markerDetail && (
                            <InfoWindow
                                position={markerDetail.coords}
                                onCloseClick={() => setMarkerDetail(null)}
                            >
                                <InfoWindowContent
                                    post={markerDetail}
                                    currentLocation={currentLocation}
                                />
                            </InfoWindow>
                        )}
                    </GoogleMap>
                )}
            </div>
        </div>
    );
};

export const getStaticProps = async (context) => {
    const posts = await getClient(context.preview).fetch(groq`
        *[_type == "post" && publishedAt < now()] | order(publishedAt desc , title desc){
            _id,
            title,
            "username": author->username,
            "categories": categories[]->{_id, title},
            "authorImage": author->avatar,
            body,
            mainImage,
            slug,
            publishedAt,
            coords,
            location,
            locationType,
        }
    `);
    return {
        props: {
            posts,
        },
    };
};

export default Restaurant;
