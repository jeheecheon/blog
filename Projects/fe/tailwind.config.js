/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/app/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
                navbar: "51.25rem",
                sm: "40rem",
                md: "48rem",
                lg: "64rem",
                xl: "80rem",
                "2xl": "96rem",
            },
            colors: {
                body: "var(--main-bg-color)",

                "default-1": "var(--default-1)",
                "default-2": "var(--default-2)",
                "default-3": "var(--default-3)",
                "default-4": "var(--default-4)",
                "default-5": "var(--default-5)",
                "default-6": "var(--default-6)",
                "default-7": "var(--default-7)",
                "default-8": "var(--default-8)",
                "default-9": "var(--default-9)",
                "default-10": "var(--default-10)",
                "default-11": "var(--default-11)",
                "default-12": "var(--default-12)",
                "default-13": "var(--default-13)",
                "default-14": "var(--default-14)",
                "default-15": "var(--default-15)",
                "default-16": "var(--default-16)",
                "default-17": "var(--default-17)",
                "default-18": "var(--default-18)",

                "default-1-dark": "var(--default-1-dark)",
                "default-2-dark": "var(--default-2-dark)",
                "default-3-dark": "var(--default-3-dark)",
                "default-4-dark": "var(--default-4-dark)",
                "default-5-dark": "var(--default-5-dark)",
                "default-6-dark": "var(--default-6-dark)",
                "default-7-dark": "var(--default-7-dark)",
                "default-8-dark": "var(--default-8-dark)",
                "default-9-dark": "var(--default-9-dark)",
                "default-10-dark": "var(--default-10-dark)",
                "default-11-dark": "var(--default-11-dark)",
                "default-12-dark": "var(--default-12-dark)",
                "default-13-dark": "var(--default-13-dark)",
                "default-14-dark": "var(--default-14-dark)",
                "default-15-dark": "var(--default-15-dark)",
                "default-16-dark": "var(--default-16-dark)",
                "default-17-dark": "var(--default-17-dark)",
                "default-18-dark": "var(--default-18-dark)",
            },
            keyframes: {
                spin: {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "fade-in-bouncing": {
                    "0%": { opacity: "0", transform: "translateY(-3.125rem)" },
                    "50%": { opacity: "1", transform: "translateY(0.625rem)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "fade-out": {
                    "0%": { opacity: "1" },
                    "80%": { opacity: "1" },
                    "100%": { opacity: "0" },
                },
                "infinite-scroll": {
                    "0%": { transform: "translate(100%, 0)" },
                    "100%": { transform: "translate(-170%, 0)" },
                },
                "blur-int-out": {
                    "0%": { opacity: "0.8" },
                    "50%": { opacity: "0.4" },
                    "100%": { opacity: "0.8" },
                },
                "bounce-sm": {
                    "0%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-0.938rem)" },
                    "100%": { transform: "translateY(0)" },
                },
                "header-hide-up": {
                    "0%": { transform: "translateY(0%)" },
                    "60%": { transform: "translateY(10%)" },
                    "100%": { transform: "translateY(-200%)" },
                },
                "header-show-down": {
                    "0%": { transform: "translateY(-150%)" },
                    "40%": { transform: "translateY(10%)" },
                    "100%": { transform: "translateY(0%)" },
                },
                "skeleton-gradient": {
                    "0%": {
                        "background-position": "0% 50%",
                    },
                    "50%": {
                        "background-position": "100% 50%",
                    },
                    "100%": {
                        "background-position": "0% 50%",
                    },
                },
                wave: {
                    "0%": {
                        transform: "rotate(0deg)",
                    },
                    "50%": {
                        transform: "rotate(30deg)",
                    },
                    "100%": {
                        transform: "rotate(0deg)",
                    },
                },
            },
        },
        animation: {
            spin: "spin 0.7s ease-in-out infinite",
            "fade-out-spinner": "fade-out 2s ease-out forwards",
            "blur-in-out": "blur-int-out 2.7s ease-in-out infinite",
            "infinite-x-scroll": "infinite-scroll 4s linear infinite",
            "bounce-sm": "bounce-sm 1.7s ease-in-out infinite",
            "header-hide-up": "header-hide-up 0.6s ease-in-out forwards",
            "header-show-down": "header-show-down 0.6s ease-in-out forwards",
            "fade-in": "fade-in 0.5s ease-in-out forwards",
            "fade-in-bouncing": "fade-in-bouncing 0.8s ease-in-out forwards",
            "skeleton-gradient": "skeleton-gradient 2.5s ease-in-out infinite",
            wave: "wave 1s ease-in-out infinite",
        },
    },
    plugins: [],
    darkMode: "selector",
};
