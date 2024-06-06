import { selectIsDarkMode, setIsDarkMode } from "@/_redux/themeSlice";
import { useDispatch, useSelector } from "react-redux";

import Moon from "@/blog/_assets/images/moon.svg?react";
import Sun from "@/blog/_assets/images/sun.svg?react";

function DarkmodeToggleSwitch() {
    const dispatch = useDispatch();
    const isDarkMode = useSelector(selectIsDarkMode);

    const changeTheme = () => {
        dispatch(setIsDarkMode(!isDarkMode));
    };

    return (
        <>
            <button
                onClick={changeTheme}
                className="rounded-full h-fit p-2 shadow-xl
                    dark:bg-default-5-dark bg-default-2
                    border-[1px] border-slate-300 dark:border-default-18-dark ring-[0.4px] ring-orange-300"
            >
                <Moon
                    className={`hidden dark:block fill-orange-300 w-[20px] stroke-orange-300`}
                />
                <Sun className="dark:hidden fill-orange-300 stroke-orange-300 w-[20px] " />
            </button>
        </>
    );
}

export default DarkmodeToggleSwitch;
