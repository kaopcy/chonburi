import dynamic from "next/dynamic";
import "../styles/globals.css";
import Head from "next/head";

// font awesome
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import "nprogress/nprogress.css";

// import
import Navbar from "../components/Navbar";
const ProgressBar = dynamic(() => import("../components/ProgressBar"), {
    ssr: false,
});

import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import Image from "next/dist/client/image";
import { urlFor } from "../lib/sanity";

import { PortableTextComponentsProvider } from "@portabletext/react";

function MyApp({ Component, pageProps }) {
  
    return (
        <PortableTextComponentsProvider components={CustomPortableText}>
            <ProgressBar />
            <div className="min-h-screen w-full">
                <Navbar />
                <div className="h-[100px]"></div>
                <Component {...pageProps} />
            </div>
        </PortableTextComponentsProvider>
    );
}

const CustomPortableText = {
    types: {
        image: ({ value }) => (
            <div className="relative  aspect-video w-[60vw] md:w-[50vw] lg:w-[40vw] ">
                <Image
                    priority='low'
                    layout="fill"
                    objectFit="cover"
                    src={urlFor(value).url()}
                />
            </div>
        ),
    },
};
export default MyApp;
