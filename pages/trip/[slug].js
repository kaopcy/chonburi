import React from "react";
import groq from "groq";
import { useRouter } from "next/dist/client/router";

// import config
import { getClient } from "../../lib/sanity.server";

// import components
import TripImages from "../../components/Trip/TripImages";
import TripContent from "../../components/Trip/TripContent";

const Trip = ({ trip }) => {
    const router = useRouter();
    if (router.isFallback) return <div className="">Loading</div>;
    return (
        <div className="mx-auto flex w-full max-w-[1300px] flex-col pt-[70px] md:pt-[100px] ">
            <TripImages trip={trip} />
            <TripContent trip={trip} />
            <div className="h-[100px]"></div>
        </div>
    );
};

const tripPathQuery = groq`
    *[(_type == "trip")].slug.current
`;

export async function getStaticPaths() {
    const path = await getClient().fetch(tripPathQuery);
    return {
        paths: path.map((slug) => ({ params: { slug } })),
        fallback: true,
    };
}

const tripQuery = groq`
*[(_type == "trip") && slug.current == $slug][0]`;

export async function getStaticProps({ params, preview = false }) {
    const trip = await getClient(preview).fetch(tripQuery, {
        slug: params.slug,
    });

    
    

    return {
        props: {
            trip,
        },
    };
}

export default Trip;
