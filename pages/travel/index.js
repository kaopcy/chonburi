import React, { useEffect } from "react";
import groq from "groq";
import Head from "next/head";
import { useRouter } from "next/router";

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
    return (
        <MapContextProvider>
            <PostsContextProvider initPosts={posts}>
                <main className="absolute inset-0 flex flex-col overflow-hidden">
                    <Head>
                        <title>แหล่งท่องเที่ยวในชลบุรี</title>
                        <meta
                            name="description"
                            content="ค้นหาแหล่งท่องเที่ยวในชลบุรีชื่อดังมากมายในชลบุรี รวมไปถึงแสดงแผนที่และเส้นทางในการเดินทาง"
                        />
                    </Head>
                    <div className="h-[70px] w-full shrink-0 md:h-[100px]"></div>
                    <div className="flex h-full w-full overflow-hidden">
                        <Posts />
                        <Map />
                    </div>
                </main>
            </PostsContextProvider>
        </MapContextProvider>
    );
};

const postsQuery = groq`
*[(_type == "travelSpot") && defined(slug.current)]{
  amphoe-> { name },
  tambon-> { name },
  title,
  slug,
  coords,
  placeID,
  imageURL,
  star,
}`;

export async function getStaticProps({ params, preview = false }) {
    const posts = await getClient(preview).fetch(postsQuery);
    return {
        props: {
            posts: posts
                .sort((a, b) => b.star - a.star)
                .reduce((prev, cur) => {
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
