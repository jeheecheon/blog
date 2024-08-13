import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectIsDarkMode } from "@/_redux/themeSlice";

import FontFaceObserver from "fontfaceobserver";
import SignInModal from "@/_components/modal/SignInModal";
import Header from "@/_components/layout/Header";
import { setThemeColor } from "@/_assets/ts/theme";
import { authenticateUser } from "@/_utils/user";

import "@/_assets/css/scrollbar.css";

let isFontLoaded = false;
const font = new FontFaceObserver("Noto Sans KR");
const fontPromise = font.load();

fontPromise
    .then(() => {
        isFontLoaded = true;
    })
    .catch(() => {
        console.error("Noto Sans KR font failed to load");
        isFontLoaded = true;
    });

function InitialLoad() {
    const isDarkMode = useSelector(selectIsDarkMode);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        authenticateUser(dispatch);
    }, []);

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

    if (!isFontLoaded) 
        throw fontPromise;
    
    return (
        <>
            <Header className="mt-[0.813rem] max-w-[66rem] lg:mx-auto" />
            <SignInModal />

            <Outlet />
        </>
    );
}

export default InitialLoad;
