import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/_redux/store";
import Avatar from "@/blog/_components/Avatar";
import me from "@/_assets/images/me.png";
import { NavLink, useLocation } from "react-router-dom";
import { makeVisible } from "@/_redux/signInModalSlice";
import { SignOut } from "@/blog/_utils/user";
import MenuModal from "@/blog/_components/MenuModal";
import { Link } from "react-router-dom";
import DarkmodeToggleSwitch from "./DarkmodeToggleSwitch";
import ArrowDown from "@/blog/_assets/images/arrow-down.svg?react";

type NavLinkRenderProps = {
    isActive: boolean;
    isPending: boolean;
    isTransitioning: boolean;
};

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    const dispatch = useDispatch();
    const prevScrollY = useRef<number>(0);
    const [headerTop, setHeaderTop] = useState<number>(0);
    const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.user);
    const isAuthenticated = useMemo(() => user.email !== "", [user.email]);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    const isOnCategory = useMemo(
        () =>
            location.pathname.startsWith("/blog/categories/") ||
            location.pathname.startsWith("/blog/recent-posts/pages/1"),
        [location.pathname]
    );
    const categoriesClass = useMemo(
        () =>
            isOnCategory
                ? "text-orange-400"
                : "text-default-10-dark dark:text-default-7",
        [isOnCategory]
    );

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);
        document.addEventListener("click", (e) => {
            const targetElement = e.target as HTMLElement;
            if (targetElement && targetElement.id !== "categories-button") {
                setIsCategoryOpen(false);
            }
        });

        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    });

    useEffect(() => {
        setIsCategoryOpen(false);
        setIsMenuOpen(false);
    }, [location.pathname]);

    const handleScroll = () => {
        setIsCategoryOpen(false);

        let tempHeaderTop: number = 0;
        if (window.scrollY > 200) {
            if (window.scrollY > prevScrollY.current) {
                // down
                const topDiff = window.scrollY - prevScrollY.current;
                tempHeaderTop = headerTop - topDiff;
                if (tempHeaderTop < -120) tempHeaderTop = -120;
            } else {
                const topDiff = prevScrollY.current - window.scrollY;
                tempHeaderTop = headerTop + topDiff;
                if (tempHeaderTop > 0) tempHeaderTop = 0;
            }
        }

        setHeaderTop(tempHeaderTop);
        prevScrollY.current = window.scrollY;
        if (headerRef.current) {
            headerRef.current.style.top = `${tempHeaderTop}px`;
        }
    };

    const handleNavColor = (props: NavLinkRenderProps) => {
        const { isActive } = props;

        return isActive
            ? "text-orange-400"
            : "dark:text-default-7 text-default-10-dark";
    };

    return (
        <aside ref={headerRef} className="fixed mt-[13px] w-full z-30">
            <div
                className="max-w-[1160px] sm:mx-[30px] md:mx-[30px] lg:mx-[60px] xl:mx-auto px-3 md:px-10
                flex items-center justify-between"
            >
                <Link to="/blog">
                    <Avatar
                        avatar={me}
                        width={50}
                        className="ring-[2.5px] ring-orange-200 border-[1px] border-transparent shadow-2xl"
                    />
                </Link>

                {/* Menu Button */}
                <button
                    className="dark:bg-default-5-dark bg-default-2
                        group ml-auto mr-5 flex flex-row items-center md:hidden
                        drop-shadow-xl border-[1px] border-slate-300 dark:border-default-18-dark ring-[0.4px] ring-orange-300
                        rounded-full h-fit py-2 text-sm px-4 font-medium text-default-14-dark dark:text-default-10"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    Menu &#160;
                    <ArrowDown
                        className={`stroke-default-10-dark dark:stroke-default-13-dark relative top-[2px] w-[13px] ${
                            isMenuOpen && "rotate-180"
                        } transition-transform`}
                    />
                </button>
                <MenuModal isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

                {/* Navigation bar */}
                <nav
                    className="dark:bg-default-5-dark bg-default-2 hidden md:flex
                    drop-shadow-xl border-[1px] border-slate-300 dark:border-default-18-dark ring-[0.4px] ring-orange-300
                    flex-row items-center gap-5 px-4 font-medium  dark:font-medium
                    rounded-full h-fit py-2 text-[0.8125rem]"
                >
                    <NavLink to="/blog" className={handleNavColor} end>
                        Home
                    </NavLink>

                    <NavLink to="/blog/about-me" className={handleNavColor}>
                        About
                    </NavLink>

                    <div>
                        <button
                            id="categories-button"
                            className={`flex flex-row items-center font-medium ${categoriesClass}`}
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
                        {isCategoryOpen && (
                            <div
                                className="fixed flex-col mt-2 
                                drop-shadow-xl border-[1px] border-slate-300 dark:border-default-18-dark ring-[0.4px] ring-orange-300 bg-default-2 dark:bg-default-5-dark
                                rounded-xl p-4 dark:text-orange-50 text-default-10-dark text-base"
                            >
                                <div className="mb-1">
                                    │&#160;
                                    <NavLink
                                        to="/blog/categories/Algorithm/pages/1"
                                        className={handleNavColor}
                                    >
                                        Algorithm
                                    </NavLink>
                                </div>

                                <span className="mb-1 dark:text-default-7 text-default-10-dark">
                                    └ Backend
                                </span>

                                <div className="pl-3 flex flex-col mb-2">
                                    <div>
                                        │&#160;
                                        <NavLink
                                            to="/blog/categories/ASP.NET/pages/1"
                                            className={handleNavColor}
                                        >
                                            ASP.NET
                                        </NavLink>
                                    </div>
                                    <div>
                                        └&#160;
                                        <NavLink
                                            to="/blog/categories/Spring/pages/1"
                                            className={handleNavColor}
                                        >
                                            Spring
                                        </NavLink>
                                    </div>
                                </div>

                                <span className="dark:text-default-7 text-default-10-dark">
                                    └ Frontend
                                </span>

                                <div className="pl-3 flex flex-col mb-2">
                                    <div>
                                        └&#160;
                                        <NavLink
                                            to="/blog/categories/React/pages/1"
                                            className={handleNavColor}
                                        >
                                            React
                                        </NavLink>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    └&#160;
                                    <NavLink
                                        to="/blog/categories/Uncategorized/pages/1"
                                        className={handleNavColor}
                                    >
                                        Uncategorized
                                    </NavLink>
                                </div>

                                <NavLink
                                    to="/blog/recent-posts/pages/1"
                                    className={handleNavColor}
                                >
                                    Recent Posts
                                </NavLink>
                            </div>
                        )}
                    </div>

                    {isAuthenticated ? (
                        <button
                            className="dark:text-orange-50 text-default-10-dark font-medium"
                            onClick={() => {
                                SignOut(dispatch);
                            }}
                        >
                            Sign-out
                        </button>
                    ) : (
                        <button
                            className="text-orange-400 drop-shadow-2xl font-medium"
                            onClick={() => {
                                dispatch(makeVisible());
                            }}
                        >
                            Sign-in
                        </button>
                    )}
                </nav>

                <DarkmodeToggleSwitch />
            </div>
        </aside>
    );
};

export default Header;
