import React from "react";
import { groq } from "next-sanity";
import { getClient } from "../../lib/sanity.server";

// import components
import TripCard from "../../components/Trip/TripCard";

const Trip = ({ trips }) => {
    return (
        <div className="mx-auto flex w-full max-w-[1300px] flex-col px-6 pt-[95px] md:px-0 md:pt-[125px]">
            <div className=""></div>
            <div className="  relative grid max-w-full  grid-cols-[repeat(auto-fill,minmax(300px,1fr))] grid-rows-[minmax(100px,auto)]  gap-7">
                {trips.map((trip, index) => (
                    <TripCard key={`${trip._id}-1`} trip={trip} index={index} />
                ))}
            </div>
        </div>
    );
};

const tripsQuery = groq`
    *[(_type == "trip")]
`;

export async function getStaticProps() {
    const trips = await getClient().fetch(tripsQuery);

    return {
        props: {
            trips,
        },
    };
}

export default Trip;
