module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                kanit: ["kanit"],
                sarabun: ["sarabun"],
            },
            fontSize: {
                xxs: "10px",
                xs: "12px",
            },
            colors: {
                text: {
                    lightest: "#DFDFDF",
                    lighter: "#8B8B8B",
                    DEFAULT: "#4F4F4F",
                    dark: "#7F7F7F",
                },
                primary: {
                    light: "#5AD7FF",
                    DEFAULT: "#5ABDFF",
                },
            },
        },
    },
    plugins: [],
};
