import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectIsDarkMode } from "@/_redux/themeSlice";

import { setThemeColor } from "@/_assets/ts/theme";

import SignInModal from "@/_components/modal/SignInModal";
import Header from "@/_components/layout/Header";

import "@/_assets/css/scrollbar.css";
import { authenticateUser } from "@/_utils/user";

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

    return (
        <>
            <Header className="mt-[0.813rem] max-w-[66rem] lg:mx-auto" />
            <SignInModal />

            <Outlet />
        </>
    );
}

export default InitialLoad;
