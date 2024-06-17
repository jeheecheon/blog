import React, { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ArrowDown from "@/blog/_assets/images/arrow-down.svg?react";
import CategoryMenu from "@/blog/_components/CategoryMenu";
import { makeVisible } from "@/_redux/signInModalSlice";
import { signOut } from "@/blog/_utils/user";
import { useDispatch, useSelector } from "react-redux";
import { NavLinkRenderProps } from "@/blog/_types/Navigation";
import { selectIsSignedIn } from "@/_redux/userSlice";

const handleNavColor = (props: NavLinkRenderProps) => {
    const { isActive } = props;

    return isActive
        ? "text-orange-400"
        : "dark:text-default-7 text-default-10-dark";
};

interface NavigationBarProps {
    setIsCategoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isCategoryOpen: boolean;
    className: string;
}

function NavigationBar({
    isCategoryOpen,
    setIsCategoryOpen,
    className,
}: NavigationBarProps) {
    const dispatch = useDispatch();
    const isSignedIn = useSelector(selectIsSignedIn);
    const curLocation = useLocation();

    const isOnCategory = useMemo(
        () =>
            curLocation.pathname.startsWith("/blog/categories/") ||
            curLocation.pathname.startsWith("/blog/recent-posts/pages/1"),
        [curLocation.pathname]
    );
    
    const categoriesClass = useMemo(
        () =>
            isOnCategory
                ? "text-orange-400"
                : "text-default-10-dark dark:text-default-7",
        [isOnCategory]
    );

    return (
        <nav
            className={`dark:bg-default-5-dark bg-default-2 pointer-events-auto
                        shadow-xl dark:shadow-lg dark:shadow-black/40 border-[1px] border-slate-300 dark:border-default-18-dark ring-[0.4px] ring-orange-300
                        flex-row items-center gap-5 px-4 font-medium  dark:font-medium
                        rounded-full h-fit py-2 text-[0.8125rem] ${className}`}
        >
            <NavLink to="/blog" className={handleNavColor} end>
                Home
            </NavLink>

            <NavLink to="/" className={handleNavColor}>
                Portfolio
            </NavLink>

            <div>
                <button
                    id="categories-button"
                    className={`flex flex-row items-center w-fit h-fit font-medium ${categoriesClass}`}
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                >
                    Categories &#160;
                    <p className="text-[9px]">
                        <ArrowDown
                            className={`${
                                isOnCategory
                                    ? "stroke-orange-400"
                                    : "stroke-default-10-dark dark:stroke-default-7"
                            } relative top-[2.5px] w-[13px] ${
                                isCategoryOpen && "rotate-180"
                            } transition-transform`}
                        />
                    </p>
                </button>

                <CategoryMenu isCategoryOpen={isCategoryOpen} />
            </div>

            <button
                className={`dark:text-default-7 text-default-10-dark ${
                    isSignedIn && "font-medium"
                }`}
                onClick={() => {
                    if (isSignedIn) {
                        signOut();
                    } else {
                        dispatch(makeVisible());
                    }
                }}
            >
                {isSignedIn ? "Sign-out" : "Sign-in"}
            </button>
        </nav>
    );
}

export default NavigationBar;
