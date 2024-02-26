
import React, { useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/common/redux/store"
import Avatar from "@/common/components/post/Avatar"
import me from "@/common/assets/images/default/me.jpg"
import { setIsDarkMode } from "@/common/redux/themeSlice"
import { NavLink, useLocation } from "react-router-dom"
import { makeVisible } from "@/common/redux/signInModalSlice"
import { SignOut } from "@/common/utils/user"
import MenuModal from "@/common/components/MenuModal"

type NavLinkRenderProps = {
    isActive: boolean;
    isPending: boolean;
    isTransitioning: boolean;
};

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
    const dispatch = useDispatch();
    const prevScrollY = useRef<number>(0);
    const [headerTop, setHeaderTop] = useState<number>(0);
    const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.user)
    const isAuthenticated = useMemo(() => user.email !== '', [user.email]);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const location = useLocation();

    const isOnCategory = useMemo(
        () => location.pathname.startsWith("/blog/categories/") || location.pathname.startsWith("/blog/recent-posts/pages/1")
        , [location.pathname]
    )
    const categoriesClass = useMemo(
        () => isOnCategory
            ? "text-orange-400"
            : "text-default-10-dark dark:text-default-7"
        , [isOnCategory]
    );

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);
        document.addEventListener("click", (e) => {
            const targetElement = e.target as HTMLElement;
            if (targetElement && targetElement.id !== 'categories-button') {
                setIsCategoryOpen(false);
            }
        });

        return () => {
            document.removeEventListener('scroll', handleScroll);
        }
    })

    useEffect(() => {
        setIsCategoryOpen(false);
        setIsMenuOpen(false);
    }, [location.pathname]);

    const changeTheme = () => {
        dispatch(setIsDarkMode(!isDarkMode));
    }

    const handleScroll = () => {
        setIsCategoryOpen(false);

        let tempHeaderTop: number = 0;
        if (window.scrollY > 200) {
            if (window.scrollY > prevScrollY.current) { // down
                const topDiff = window.scrollY - prevScrollY.current;
                tempHeaderTop = headerTop - topDiff;
                if (tempHeaderTop < -120)
                    tempHeaderTop = -120;
            }
            else {
                const topDiff = prevScrollY.current - window.scrollY;
                tempHeaderTop = headerTop + topDiff;
                if (tempHeaderTop > 0)
                    tempHeaderTop = 0;
            }

        }

        setHeaderTop(tempHeaderTop);
        prevScrollY.current = window.scrollY;
    }

    const handleNavColor = (props: NavLinkRenderProps) => {
        const { isActive } = props;

        return isActive
            ? "text-orange-400"
            : "dark:text-default-7 text-default-10-dark"
    }

    return (
        <aside
            className="fixed mt-[13px] w-full z-30"
            style={{
                top: `${headerTop}px`
            }}>
            <div className="sm:mx-[30px] md:mx-[30px] lg:mx-[60px] xl:mx-auto max-w-[1160px] px-3 md:px-10
            flex flex-row items-center justify-between">

                <Avatar
                    avatar={me}
                    width={55}
                    className="ring-[2.5px] ring-orange-300 border-[0.5px] border-slate-300 shadow-2xl" />

                {/* Menu Button */}
                <button
                    className="dark:bg-default-5-dark bg-default-2
                        group ml-auto mr-5 flex flex-row items-center md:hidden
                        drop-shadow-xl border-[1px] border-slate-300 dark:border-default-18-dark ring-[0.4px] ring-orange-300
                        rounded-full h-fit py-2 text-sm px-4 font-medium text-default-14-dark dark:text-default-10"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    Menu &#160;
                    <svg className={`stroke-default-10-dark dark:stroke-default-13-dark relative top-[2px] w-[13px] ${isMenuOpen && 'rotate-180'} transition-transform`} viewBox="0 0 8 6" aria-hidden="true"><path d="M1.75 1.75 4 4.25l2.25-2.5" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>

                    {/* <svg className="ml-3 w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" viewBox="0 0 8 6" aria-hidden="true"><path d="M1.75 1.75 4 4.25l2.25-2.5" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg> */}
                </button>
                <MenuModal isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

                {/* Navigation bar */}
                <nav className="dark:bg-default-5-dark bg-default-2 hidden md:flex
                drop-shadow-xl border-[1px] border-slate-300 dark:border-default-18-dark ring-[0.4px] ring-orange-300
                flex-row items-center gap-5 px-4 font-medium  dark:font-medium
                rounded-full h-fit py-2 text-sm">
                    <NavLink to="/blog" className={handleNavColor}
                        end
                    >
                        Home
                    </NavLink>

                    <NavLink to="/blog/about-me" className={handleNavColor}
                    >
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
                                <svg className={`${isOnCategory ? 'stroke-orange-400' : 'stroke-default-10-dark dark:stroke-default-7'} relative top-[2.5px] w-[13px] ${isCategoryOpen && 'rotate-180'} transition-transform`} viewBox="0 0 8 6" aria-hidden="true"><path d="M1.75 1.75 4 4.25l2.25-2.5" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </p>
                        </button>
                        {
                            isCategoryOpen
                            && <div className="fixed flex-col mt-2 
                                drop-shadow-xl border-[1px] border-slate-300 dark:border-default-18-dark ring-[0.4px] ring-orange-300 bg-default-2 dark:bg-default-5-dark
                                rounded-xl p-4 dark:text-orange-50 text-default-10-dark text-base"
                            >
                                <div className="mb-1">
                                    │&#160;
                                    <NavLink to="/blog/categories/Algorithm/pages/1" className={handleNavColor}>Algorithm</NavLink>
                                </div>

                                <span className="mb-1 dark:text-default-7 text-default-10-dark">└ Backend</span>

                                <div className="pl-3 flex flex-col mb-2">
                                    <div>
                                        │&#160;
                                        <NavLink to="/blog/categories/ASP.NET/pages/1" className={handleNavColor}>ASP.NET</NavLink>
                                    </div>
                                    <div>
                                        └&#160;
                                        <NavLink to="/blog/categories/Spring/pages/1" className={handleNavColor}>Spring</NavLink>
                                    </div>
                                </div>

                                <span className="dark:text-default-7 text-default-10-dark">└ Frontend</span>

                                <div className="pl-3 flex flex-col mb-2">
                                    <div>
                                        └&#160;
                                        <NavLink to="/blog/categories/React/pages/1" className={handleNavColor}>React</NavLink>
                                    </div>
                                </div>

                                <div
                                    className="mb-4"
                                >
                                    └&#160;
                                    <NavLink to="/blog/categories/Uncategorized/pages/1" className={handleNavColor}>Uncategorized</NavLink>
                                </div>

                                <NavLink to="/blog/recent-posts/pages/1" className={handleNavColor}>Recent Posts</NavLink>

                            </div>
                        }
                    </div>

                    {
                        isAuthenticated
                            ? <button
                                className="dark:text-orange-50 text-default-10-dark font-medium"
                                onClick={() => {
                                    SignOut(dispatch);
                                }}
                            >
                                Sign-out
                            </button>
                            : <button
                                className="text-orange-400 drop-shadow-2xl font-medium"
                                onClick={() => {
                                    dispatch(makeVisible())
                                }}
                            >
                                Sign-in
                            </button>
                    }

                </nav>

                <button
                    onClick={changeTheme}
                    className="rounded-full h-fit p-2 shadow-xl
                    dark:bg-default-5-dark bg-default-2
                    border-[1px] border-slate-300 dark:border-default-18-dark ring-[0.4px] ring-orange-300"
                >
                    <svg className="w-7 fill-orange-300 dark:hidden stroke-orange-300" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z"></path><path d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061" fill="none"></path></svg>
                    <svg className="hidden w-7 fill-orange-300 stroke-orange-300 dark:block" viewBox="0 0 24 24" aria-hidden="true" ><path d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </button>
            </div >
        </aside >
    )
};

export default Header;
