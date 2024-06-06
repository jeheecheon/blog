import { Outlet } from "react-router-dom";
import MusicPlayer from "./MusicPlayer";
import SignInModal from "./SignInModal";

import "@/blog/_assets/css/font.css";
import "@/blog/_assets/css/scrollbar.css";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "@/_redux/themeSlice";
import { useEffect } from "react";

function BlogInitialLoad() {
    const isDarkMode = useSelector(selectIsDarkMode);

    useEffect(() => {
        if (isDarkMode === true) {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.theme = "light";
        }
    }, [isDarkMode]);

    return (
        <>
            <MusicPlayer className="absolute invisible" />
            <SignInModal />
            <Outlet />

            {/* {isDarkMode ? (
                <Helmet>
                    <meta name="theme-color" content="rgb(24, 24, 27)" />
                    <meta
                        name="apple-mobile-web-app-status-bar-style"
                        content="black"
                    />
                    <meta
                        name="msapplication-navbutton-color"
                        content="rgb(24, 24, 27)"
                    />
                </Helmet>
            ) : (
                <Helmet>
                    <meta name="theme-color" content="rgb(250, 250, 250)" />
                    <meta
                        name="apple-mobile-web-app-status-bar-style"
                        content="default"
                    />
                    <meta
                        name="msapplication-navbutton-color"
                        content="rgb(250, 250, 250)"
                    />
                </Helmet>
            )} */}
        </>
    );
}

export default BlogInitialLoad;
