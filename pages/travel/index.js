import React from "react";
import groq from "groq";

// import configs
import { getClient } from "../../lib/sanity.server";

// import contexts
import { MapContextProvider } from "../../context/MainTravel/MapContext";
import { PostsContextProvider } from "../../context/MainTravel/PostContext";

// imports hooks
import useIsTouchDevice from "../../composables/useIsTouchDevice";

// import components
import Posts from "../../components/MainTravel/Posts";
import Map from "../../components/MainTravel/Map";

const Travel = ({ posts }) => {
    const isTouch = useIsTouchDevice();
    return (
        <MapContextProvider>
            <PostsContextProvider initPosts={posts}>
                <div
                    className={`relative flex   w-full flex-col overflow-hidden  ${
                        isTouch ? "h-[calc(100vh-70px)]" : "h-screen"
                    }`}
                >
                    <div className="h-[70px] w-full shrink-0 md:h-[100px]"></div>
                    <div className="flex h-full w-full overflow-hidden">
                        <Posts />
                        <Map />
                    </div>
                </div>
            </PostsContextProvider>
        </MapContextProvider>
    );
};

const postsQuery = groq`
*[(_type == "pointOfInterest") && defined(slug.current)]{
  amphoe-> { name },
  tambon-> { name },
  title,
  slug,
  coords,
  placeID,
  imageURL,
}`;

export async function getStaticProps({ params, preview = false }) {
    const posts = await getClient(preview).fetch(postsQuery);

    return {
        props: {
            posts: posts.reduce((prev, cur) => {
                if (prev[cur.amphoe.name]) {
                    return {
                        ...prev,
                        [cur.amphoe.name]: [
                            ...prev[cur.amphoe.name],
                            { ...cur },
                        ],
                    };
                }
                return { ...prev, [cur.amphoe.name]: [{ ...cur }] };
            }, {}),
        },
    };
}

export default Travel;
