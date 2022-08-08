module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],

    variants: {
        extend: {
            opacity: ["group-hover"],
            height: ["group-hover"],
            transform: ["group-hover"],
            textDecorationLine: ["group-hover"],
        },
    },

    theme: {
        extend: {
            fontFamily: {
                kanit: ["kanit"],
                sarabun: ["sarabun"],
                notoSansThai: ["noto sans thai"],
                apple: ["-apple-system", "BlinkMacSystemFont", "sans-serif"],
            },
            fontSize: {
                xxs: "10px",
                xs: "12px",
            },
            colors: {
                text: {
                    lightest: "#DFDFDF",
                    lighterr: "#C2C2C2",
                    lighter: "#8B8B8B",
                    // DEFAULT: "#4D4D4D",
                    DEFAULT: "#4D4D4D",
                    dark: "#7F7F7F",
                },
                primary: {
                    lighter: "#9AD7FF",
                    light: "#5AD7FF",
                    DEFAULT: "#5ABDFF",
                },
            },
            transitionProperty: {
                "opacity-transform": "opacity, transform",
                "font-size": "font-size, transform",
                "font-size-width": "font-size, transform, width, height",
            },
            animation: {
                "bounce-once": "bounce 2s linear",
                "scale-pulse": "scale-pulse 2s infinite 1s ease-in-out",
                "gps-pulse": "gps-pulse 2s infinite",
                "gps-pulse-2": "gps-pulse 2s infinite 1s",
                "gps-pulse-3": "gps-pulse 2s infinite 2s",
                "gps-pulse-blue": "gps-pulse-blue 2s infinite",
                "gps-pulse-red": "gps-pulse-red 2s infinite",
                "gps-pulse-2-blue": "gps-pulse-blue 2s infinite 1s",
                "gps-pulse-3-blue": "gps-pulse-blue 2s infinite 2s",
            },
            boxShadow: {
                small: "0px 3px 5px rgba(0,0,0,0.07)",
                big: "0px 1px 6px  rgba(0, 0, 0, 0.16)",
                icon: "2px 2px 10px  rgba(0, 0, 0, 0.16)",
                blue: "0px 0px 8px  rgba(154, 215, 255, 0.61)",
            },
            keyframes: {
                "gps-pulse": {
                    "0%": {
                        transform: "scale(0.95)",
                        boxShadow: "0 0 0 0 rgba(0, 170, 108, 0.7)",
                    },
                    "70%": {
                        transform: "scale(1)",
                        boxShadow: "0 0 0 20px rgba(0, 170, 108, 0)",
                    },
                    "100%": {
                        transform: "scale(0.95)",
                        boxShadow: "0 0 0 0 rgba(0, 170, 108, 0)",
                    },
                },
                "scale-pulse": {
                    "0%": {
                        transform: "scale(1.1)",
                    },
                    "50%": {
                        transform: "scale(1)",
                    },
                    "100%": {
                        transform: "scale(1.1)",
                    },
                },
                "gps-pulse-red": {
                    "0%": {
                        transform: "scale(0.95)",
                        boxShadow: "0 0 0 0 rgba(255, 21, 19, 0.7)",
                    },
                    "70%": {
                        transform: "scale(1)",
                        boxShadow: "0 0 0 20px rgba(255, 21, 19, 0)",
                    },
                    "100%": {
                        transform: "scale(0.95)",
                        boxShadow: "0 0 0 0 rgba(255, 21, 19, 0)",
                    },
                },
                "gps-pulse-blue": {
                    "0%": {
                        transform: "scale(0.95)",
                        boxShadow: "0 0 0 0 rgba(0,154,255, 0.7)",
                    },
                    "70%": {
                        transform: "scale(1)",
                        boxShadow: "0 0 0 15px rgba(0,154,255, 0)",
                    },
                    "100%": {
                        transform: "scale(0.95)",
                        boxShadow: "0 0 0 0 rgba(0,154,255, 0)",
                    },
                },
            },
        },
    },
    plugins: [
        require("tailwindcss-nested-groups"),
        require("tailwindcss-container-query"),
    ],
};
