import React, { useEffect, useRef } from "react";
import Image from "next/image";
import groq from "groq";
import gsap from "gsap/dist/gsap";
import Head from "next/head";

// import hooks
import { getClient } from "../lib/sanity.server";
import useIsTouchDevice from "../composables/useIsTouchDevice";

// import components
import LocationList from "../components/Home/PointOfInterest/PointOfInterestList";
import SearchBar from "../components/Home/SearchBar";
import RestaurantList from "../components/Home/Restaurant/RestaurantList";
import RunningText from "../components/Home/RunningText";

// import images
import chonburiImage from "../public/images/background.jpg";

const Home = ({ posts, restaurants }) => {
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
                    content="ท่องเที่ยวที่ชลบุรี ค้นหาแหล่งท่องเที่ยวและร้านอาหารชื่อดงัที่ไม่ควรพลาดในจังหวัดชลบุรี, ประเทศไทย "
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
                            blurDataURL="URL"
                            placeholder="blur"
                        />
                    </div>
                    <div
                        ref={quoteRef}
                        className="absolute top-1/2 right-[30%] z-10 flex w-[55%] -translate-y-1/2 flex-col self-center border-[4.5px] border-white px-2 py-4 text-[25px] font-semibold text-white sm:text-[30px] md:right-[40%] md:w-[47%] md:border-[10px] md:text-[40px] lg:min-w-[475px] lg:px-10 lg:text-[55px] xl:text-[70px]"
                    >
                        <div className="self-start whitespace-nowrap font-kanit">
                            แหล่งท่องเที่ยว
                        </div>
                        <div className="self-end font-kanit">
                            ใน"{" "}
                            <span className="font-kanit text-[#5ABDFF]">
                                ชลบุรี
                            </span>{" "}
                            "
                        </div>
                    </div>
                </div>
                <div className="absolute  left-1/2 bottom-0 z-10 flex w-full -translate-x-1/2 translate-y-1/2 px-5 ">
                    <SearchBar />
                </div>
            </div>
            <RunningText />
            <LocationList posts={posts} />
            <RestaurantList restaurants={restaurants} />
            <div className="h-screen" />
        </main>
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

export const getStaticProps = async (context) => {
    const posts = await getClient(context.preview).fetch(groq`
        *[_type == "post" && publishedAt < now()][0...5] | order(publishedAt desc , title desc){
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

    const restaurants = await getClient(context.preview).fetch(restaurantQuery);
    return {
        props: {
            posts,
            restaurants,
        },
    };
};

export default Home;
