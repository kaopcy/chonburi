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
                    DEFAULT: "#4f4f4f",
                    dark: "#7F7F7F",
                },
                primary: {
                    light: "#5AD7FF",
                    DEFAULT: "#5ABDFF",
                },
            },
            animation:{
                'bounce-once': 'bounce 2s linear'
            }
        },
    },
    plugins: [],
};
