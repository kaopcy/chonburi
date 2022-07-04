import Image from "next/dist/client/image";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import "../styles/globals.css";

// import dependencies
import { PortableTextComponentsProvider } from "@portabletext/react";
import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// import icons
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

// import progressbar
import "nprogress/nprogress.css";

// import configs
import { urlFor } from "../lib/sanity";

// import contexts
import { UserLocationProvider } from "../context/UserLocationContext";

// import components
import Navbar from "../components/Navbar/Navbar";
const ProgressBar = dynamic(() => import("../components/ProgressBar"), {
    ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

function MyApp({ Component, pageProps }) {
    return (
        <UserLocationProvider>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <PortableTextComponentsProvider components={CustomPortableText}>
                <div className="w-full">
                    <ProgressBar />
                    <Navbar />
                    {/* <div className="h-[100px]"></div> */}
                    <Component {...pageProps} />
                </div>
            </PortableTextComponentsProvider>
        </UserLocationProvider>
    );
}

const CustomPortableText = {
    types: {
        image: ({ value }) => (
            <div className="relative  aspect-video w-[60vw] md:w-[50vw] lg:w-[40vw] ">
                <Image
                    priority="low"
                    layout="fill"
                    objectFit="cover"
                    src={urlFor(value).url()}
                />
            </div>
        ),
    },
};
export default MyApp;
