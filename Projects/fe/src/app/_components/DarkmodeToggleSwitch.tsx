import { selectIsDarkMode, setIsDarkMode } from "@/_redux/themeSlice";
import { useDispatch, useSelector } from "react-redux";

import Moon from "@/_assets/images/moon.svg?react";
import Sun from "@/_assets/images/sun.svg?react";

interface DarkmodeToggleSwitchProps {
    className?: string;
}

function DarkmodeToggleSwitch({ className }: DarkmodeToggleSwitchProps) {
    const dispatch = useDispatch();
    const isDarkMode = useSelector(selectIsDarkMode);

    const changeTheme = () => {
        dispatch(setIsDarkMode(!isDarkMode));
    };

    const MoonSun: {
        node: JSX.Element;
        className: string;
    }[] = [
        {
            node: <Moon className="w-[1.25rem]" />,
            className: "hidden dark:block",
        },
        {
            node: <Sun className="w-[1.25rem]" />,
            className: "dark:hidden",
        },
    ];

    return MoonSun.map((element, index) => (
        <button
            key={index}
            onClick={changeTheme}
            className={`animate-header-show-down rounded-full h-fit p-2 shadow-xl dark:shadow-lg dark:shadow-black/60 dark:bg-default-5-dark bg-default-2
                    border-[0.0625rem] border-slate-300 dark:border-default-18-dark ring-[0.025rem] ring-orange-300 pointer-events-auto
                    fill-orange-300  stroke-orange-300 ${className} ${element.className}`}
        >
            {element.node}
        </button>
    ));
}

export default DarkmodeToggleSwitch;
