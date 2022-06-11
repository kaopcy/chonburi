/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "cdn.sanity.io",
            "lh5.googleusercontent.com",
            "lh3.ggpht.com",
        ],
    },
};

module.exports = nextConfig;
