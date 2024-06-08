import { Outlet, useLocation } from "react-router-dom";
import MusicPlayer from "./MusicPlayer";
import SignInModal from "./SignInModal";

import "@/blog/_assets/css/scrollbar.css";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "@/_redux/themeSlice";
import { useEffect } from "react";
import { setThemeColor } from "@/_assets/ts/theme";

function BlogInitialLoad() {
    const isDarkMode = useSelector(selectIsDarkMode);
    const location = useLocation();

    useEffect(() => {
        if (isDarkMode === true) {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.theme = "light";
        }
    }, [isDarkMode]);

    useEffect(() => {
        setThemeColor(isDarkMode, location.pathname);

        return () => {
            setThemeColor(isDarkMode, location.pathname);
        };
    }, [location.pathname, isDarkMode]);

    return (
        <>
            <MusicPlayer className="absolute invisible" />
            <SignInModal />
            <Outlet />
        </>
    );
}

export default BlogInitialLoad;
