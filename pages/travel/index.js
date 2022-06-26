import React from "react";
import groq from "groq";

// import configs
import { getClient } from "../../lib/sanity.server";

const Travel = () => {
    return (
        <div className="relative flex min-h-screen w-full flex-col">
            <div className="h-[100px] w-full"></div>
            <div className="h-screen w-full bg-black"></div>
        </div>
    );
};

const postsQuery = groq`
*[(_type == "post" || _type == "restaurant")] {_id,coords , title , mainImage , location, locationType,}`;

export async function getStaticProps({ params, preview = false }) {
    const posts = await getClient(preview).fetch(postsQuery);

    return {
        props: {
            posts: posts.reduce((prev, cur) => {
                if (prev[cur.type]) {
                    return {
                        ...prev,
                        [cur.type]: [...prev[cur.type], { ...cur }],
                    };
                }
                return { ...prev, [cur.type]: [{ ...cur }] };
            }, {}),
        },
    };
}

export default Travel;
