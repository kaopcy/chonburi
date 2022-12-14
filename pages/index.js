import React, { useEffect, useRef } from "react";
import Image from "next/image";
import groq from "groq";
import gsap from "gsap/dist/gsap";
import Head from "next/head";

// import hooks
import { getClient } from "../lib/sanity.server";
import useIsTouchDevice from "../composables/useIsTouchDevice";

// import contexts
import { SearchProvider } from "../context/Home/SearchContext";

// import components
import SearchBar from "../components/Home/SearchBar";
import RestaurantList from "../components/Home/Restaurant/RestaurantList";
import PointOfInterestList from "../components/Home/PointOfInterest/PointOfInterestList";

import RunningText from "../components/Home/RunningText";
import HistoryImageSlider from "../components/Home/HistoryImageSlider";
import AmphoeHistory from "../components/Home/AmphoeHistory";

import TripCard from "../components/Trip/TripCard";

// import images
import chonburiImage from "../public/images/background.jpg";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase } from "@fortawesome/free-solid-svg-icons";

const bluredMainImg =
    "data:image/webp;base64,UklGRkwDAABXRUJQVlA4WAoAAAAgAAAAgQAAWAAASUNDUBgCAAAAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANlZQOCAOAQAAEAoAnQEqggBZAD7tbK9QP6Ykoqj0TEvwHYllbt//TFhcuJ1v+f6AW/OukB/99WuwZFFI0SD0+OFXWNSgF/qM0SXy3pA4BigopgPgufyj9kLAt3YnW25dZoAA/qbj/nU8U5xFLnM5PRrPvmvoGgDox+lMbDP1a4X1C9iIzUWDkb1Km9kcY36DBQEvoPPk3nwEQDW4Ac4xrcYXz/ZatjUXBdpZeNWjEOsTZZ42NcYMN7q7e/t+CK9yCczqoaUPpZZPau1j7oAmNZWczaa431bubwH3WqPFa1yUyciZNnGrOrh0dxVr2vmQzXEyn/2pnnmcfWpoaDSkaCCeUai7JpXSCaR7rY/3rUmkqDpyrgAA";

const Home = ({
    trips,
    restaurants,
    pointOfInterests,
    searchRestaurants,
    searchTravels,
}) => {
    const imageRef = useRef(null);
    const quoteRef = useRef(null);
    const parallaxTrigger = useRef(null);
    const parallax = useRef(null);

    const isTouch = useIsTouchDevice();

    useEffect(() => {
        if (isTouch || isTouch === null) return;
        parallax.current = gsap
            .timeline({
                scrollTrigger: {
                    trigger: parallaxTrigger.current,
                    scrub: true,
                    start: "top 110px",
                    end: "bottom top",
                },
            })
            .to(imageRef.current, {
                y: imageRef.current.clientHeight * 0.28,
                overwrite: true,
            })
            .to(
                quoteRef.current,
                {
                    y: quoteRef.current.clientHeight * 0.7,
                    overwrite: true,
                },
                "<"
            );
    }, [isTouch]);

    return (
        <main className="flex min-h-screen w-full flex-col bg-white px-3 text-text sm:px-16">
            <Head>
                <title>Chonburi x Travel | หน้าหลัก</title>
                <meta
                    name="description"
                    content="ท่องเที่ยวที่ชลบุรี Chonburi x Travel ค้นหาแหล่งท่องเที่ยวและร้านอาหารชื่อดงัที่ไม่ควรพลาดในจังหวัดชลบุรี ประเทศไทย"
                />
            </Head>
            <div className="h-[100px]"></div>

            <div
                ref={parallaxTrigger}
                className="relative mt-4 aspect-[16/11]  w-full max-w-[1300px] self-center sm:aspect-[16/9] "
            >
                <div className="relative h-full w-full  overflow-hidden rounded-xl">
                    <div
                        className="absolute bottom-0   aspect-[16/14] w-full sm:aspect-[16/11] sm:w-[110%]"
                        ref={imageRef}
                    >
                        <Image
                            alt="ชลบุรี เกาะ หาด"
                            src={chonburiImage}
                            layout="fill"
                            className="object-cover "
                            quality="100"
                            blurDataURL={bluredMainImg}
                            placeholder="blur"
                        />
                    </div>
                    <div
                        ref={quoteRef}
                        className="absolute top-1/2 right-[30%] z-10 flex w-[60%] -translate-y-1/2 flex-col self-center border-[4.5px] border-white px-2 py-4 text-[25px] font-semibold text-white sm:text-[30px] md:right-[40%] md:w-[50%] md:border-[10px] md:text-[40px] lg:min-w-[475px] lg:px-10 lg:text-[55px] xl:text-[60px]"
                    >
                        <div className="self-start whitespace-nowrap font-kanit">
                            วิถีกิน วิถีถิ่น
                        </div>
                        <div className="self-end font-kanit">
                            ใน"{" "}
                            <span className="font-kanit text-[#5ABDFF]">
                                จังหวัดชลบุรี
                            </span>{" "}
                            "
                        </div>
                    </div>
                </div>
                <SearchProvider
                    initRestaurants={searchRestaurants}
                    initTravels={searchTravels}
                >
                    <SearchBar />
                </SearchProvider>
            </div>
            <RunningText />
            <HistoryImageSlider />

            <div className="mx-auto mb-20 flex w-full max-w-[1300px]  flex-col  pt-[95px]">
                <span className="mb-8 flex items-center text-lg font-semibold text-text sm:text-2xl lg:text-3xl">
                    ทริปแนะนำ
                    <FontAwesomeIcon
                        icon={faSuitcase}
                        className="ml-3  text-text-lightest"
                    />
                </span>
                <div className=" relative  grid  max-w-[full] grid-cols-[repeat(auto-fill,minmax(300px,1fr))] grid-rows-[minmax(100px,auto)] gap-6 md:gap-4">
                    {trips.map((trip, index) => (
                        <TripCard
                            key={`${trip._id}-1`}
                            trip={trip}
                            index={index}
                        />
                    ))}
                </div>
            </div>
            <PointOfInterestList pointOfInterests={pointOfInterests} />
            <RestaurantList restaurants={restaurants} />

            <AmphoeHistory />
            <div className="h-screen" />
            <div className="h-screen" />
        </main>
    );
};

const TestSlider = () => {
    const containerRef = useRef();
    useEffect(() => {
        const children = [...containerRef.current.children];
        let baseChild = "";
        children.forEach((child) => {
            baseChild += child.outerHTML;
        });
        while (containerRef.current.clientHeight < 2000) {
            containerRef.current.insertAdjacentHTML("beforeend", baseChild);
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="flex w-full flex-col  items-center bg-blue-50"
        >
            <div className="relative  aspect-[11/9] h-10 w-10 border-2 border-red-500 ">
                <img
                    className="h-full w-full object-cover"
                    src="https://lh3.ggpht.com/p/AF1QipM1CGCZ1rEssQseh1Il4euzxrUx4esF0-hnJf7z=s512"
                />
            </div>
            {/* <ImageComponent src="https://lh3.ggpht.com/p/AF1QipM1CGCZ1rEssQseh1Il4euzxrUx4esF0-hnJf7z=s512" /> */}
        </div>
    );
};

const ImageComponent = ({ src }) => {
    return (
        <div className="relative mb-10 aspect-[11/9] h-10 w-10 ">
            <Image
                quality="low"
                blurDataURL="URL"
                placeholder="blur"
                src={src}
                layout="fill"
                objectFit="cover "
            />
        </div>
    );
};
const restaurantQuery = groq`
*[(_type == "pointOfInterest") && defined(slug.current)][0...7] | order(star desc , title desc){
  amphoe-> { name },
  tambon-> { name },
  title,
  slug,
  coords,
  placeID,
  imageURL,
  reviews,
  star,
}`;

const pointOfInterestQuery = groq`
*[(_type == "travelSpot") && defined(slug.current)][0...7] | order(star desc , title desc){
  amphoe-> { name },
  tambon-> { name },
  title,
  slug,
  coords,
  placeID,
  imageURL,
  star,
}`;

const tripsQuery = groq`
    *[(_type == "trip")]
`;

const searchRestaurantsQuery = groq`
*[(_type == "pointOfInterest")]{
  title , 
  slug , 
  imageURL[0]{ url , _key },
  _id,
  amphoe-> { name },
  tambon-> { name }
}
`;

const searchTravelsQuery = groq`
*[(_type == "travelSpot")]{
  title , 
  slug , 
  imageURL[0]{ url , _key },
  _id,
  amphoe-> { name },
  tambon-> { name }
}
`;

export const getStaticProps = async (context) => {
    const restaurants = await getClient(context.preview).fetch(restaurantQuery);
    const pointOfInterests = await getClient(context.preview).fetch(
        pointOfInterestQuery
    );
    const searchRestaurants = await getClient(context.preview).fetch(
        searchRestaurantsQuery
    );
    const searchTravels = await getClient(context.preview).fetch(
        searchTravelsQuery
    );

    const trips = await getClient().fetch(tripsQuery);

    return {
        props: {
            trips,
            restaurants,
            pointOfInterests,
            searchRestaurants,
            searchTravels,
        },
    };
};

export default Home;
