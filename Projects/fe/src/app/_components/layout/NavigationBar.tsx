import React, { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ArrowDown from "@/_assets/images/arrow-down.svg?react";
import CategoryMenu from "@/_components/layout/CategoryMenu";
import { setIsSignInModalOpen } from "@/_redux/signInModalSlice";
import { signOut } from "@/_utils/user";
import { useDispatch, useSelector } from "react-redux";
import { NavLinkRenderProps } from "@/_types/Navigation";
import { selectIsSignedIn } from "@/_redux/userSlice";

const handleNavColor = (props: NavLinkRenderProps) => {
    const { isActive } = props;

    return isActive
        ? "text-orange-400"
        : "dark:text-default-7 text-default-16-dark";
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
        () => curLocation.pathname.startsWith("/categories/"),
        [curLocation.pathname]
    );

    const categoriesClass = useMemo(
        () =>
            isOnCategory
                ? "text-orange-400"
                : "text-default-16-dark dark:text-default-7",
        [isOnCategory]
    );

    return (
        <nav
            className={`dark:bg-default-5-dark bg-default-2 pointer-events-auto font-semibold
                        shadow-xl dark:shadow-lg dark:shadow-black/40 border-[0.0625rem] border-slate-300 dark:border-default-18-dark
                        ring-[0.025rem] ring-orange-300
                        flex flex-row items-center gap-5 px-5
                        rounded-full h-fit py-2 text-[1rem] ${className}`}
        >
            <NavLink to="/" className={handleNavColor} end>
                Home
            </NavLink>

            <a
                href={import.meta.env.VITE_PORTFOLIO_URL}
                className={`cursor-pointer ${handleNavColor({
                    isActive: false,
                    isPending: false,
                    isTransitioning: false,
                })}`}
            >
                Portfolio
            </a>

            <div
                className={`flex flex-col items-center h-fit flex-nowrap shrink-0  ${categoriesClass}`}
            >
                <button
                    id="categories-button"
                    className="flex items-center flex-nowrap shrink-0"
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                >
                    Categories &#160;
                    <ArrowDown
                        className={`${
                            isOnCategory
                                ? "stroke-orange-400"
                                : "stroke-default-10-dark dark:stroke-default-7"
                        } relative top-[2.5px] w-[0.8125rem] ${
                            isCategoryOpen && "rotate-180"
                        } transition-transform`}
                    />
                </button>
                <CategoryMenu isCategoryOpen={isCategoryOpen} />
            </div>

            <button
                className={`text-nowrap
                ${
                    isSignedIn
                        ? "text-orange-400"
                        : "text-default-16-dark dark:text-default-7"
                }`}
                onClick={() => {
                    if (isSignedIn) {
                        signOut();
                    } else {
                        dispatch(setIsSignInModalOpen(true));
                    }
                }}
            >
                {isSignedIn ? "Sign-out" : "Sign-in"}
            </button>
        </nav>
    );
}

export default NavigationBar;
