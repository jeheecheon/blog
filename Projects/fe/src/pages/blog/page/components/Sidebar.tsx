import React, { useEffect, useState } from "react";
import { useIsMounted } from "@/common/hooks/useIsMounted";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { makeVisible } from "@/common/redux/signInModalSlice";
import { SignOut } from "@/common/utils/user";
import { RootState } from "@/common/redux/store";

interface SidebarProps {
    show: string,
    setShowSidebar: React.Dispatch<React.SetStateAction<string>>,
}

const Sidebar = React.memo(({ show, setShowSidebar }: SidebarProps) => {
    const user = useSelector((state: RootState) => state.user)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(user.email !== '');
    const dispatch = useDispatch();
    const justMounted = useIsMounted();

    useEffect(() => {
        setIsAuthenticated(user.email !== '')
    }, [user]);

    if (justMounted === true)
        return <></>;

    const overlay = show === "true" ? "animate-show-sidebar-overlay" : "animate-hide-sidebar-overlay pointer-events-none";
    const content1 = show === "true" ? "animate-show-sidebar-content1" : "animate-hide-sidebar-content5 pointer-events-none";
    const content2 = show === "true" ? "animate-show-sidebar-content2" : "animate-hide-sidebar-content4 pointer-events-none";
    const content3 = show === "true" ? "animate-show-sidebar-content3" : "animate-hide-sidebar-content3 pointer-events-none";
    const content4 = show === "true" ? "animate-show-sidebar-content4" : "animate-hide-sidebar-content2 pointer-events-none";
    const content5 = show === "true" ? "animate-show-sidebar-content5" : "animate-hide-sidebar-content1 pointer-events-none";
    const handleLinkClicked = () => setShowSidebar("false");

    return (
        <section>
            <div className={`w-screen h-screen z-30 bg-white bg-opacity-90 fixed cursor-pointer 
            ${overlay}`}
                onClick={() => handleLinkClicked()}>
            </div>

            <nav className={`fixed w-screen h-screen z-30 pointer-events-none 
            flex flex-col items-start justify-start gap-3 text-slate-500 pl-[10vw] text-2xl md:text-3xl pt-[8%]`}>
                <Link
                    to="/blog"
                    onClick={handleLinkClicked}
                    className={`pointer-events-auto ${content1}`}
                >
                    Home
                </Link>

                <Link
                    to="/blog/about-me"
                    onClick={handleLinkClicked}
                    className={`pointer-events-auto ${content2}`}
                >
                    About me
                </Link>

                <Link to="/blog/recent-posts/pages/1"
                    onClick={handleLinkClicked}
                    className={`mt-5 pointer-events-auto ${content3}`}
                >
                    Latest posts
                </Link>

                <div
                    className={`pointer-events-auto ${content4}`}
                >
                    <span>Categories</span>
                    <div
                        className="pl-4 flex flex-col"
                    >
                        <Link to="/blog/categories/Algorithm/pages/1" onClick={handleLinkClicked}>│ Algorithm</Link>
                        <div>
                            <span>└ Backend</span>
                            <div className="pl-8 flex flex-col">
                                <Link to="/blog/categories/Spring/pages/1" onClick={handleLinkClicked}>│ Spring</Link>
                                <Link to="/blog/categories/ASP.NET/pages/1" onClick={handleLinkClicked}>└ ASP.NET</Link>
                            </div>
                        </div>
                        <div>
                            <span>└ Frontend</span>
                            <div className="pl-8 flex-flex-col">
                                <Link to="/blog/categories/React/pages/1" onClick={handleLinkClicked}>└ React</Link>
                            </div>
                        </div>
                        <Link to="/blog/categories/Uncategorized/pages/1" onClick={handleLinkClicked}>└ Uncategorized</Link>
                    </div>
                </div>
                <button
                    onClick={() => {
                        if (isAuthenticated) {
                            SignOut(dispatch);
                            handleLinkClicked();
                        }
                        else {
                            dispatch(makeVisible());
                            handleLinkClicked();
                        }
                    }}
                    className={`pointer-events-auto mt-5 ${content5}`}
                >
                    {isAuthenticated ? "Sign Out" : "Sign in"}
                </button>
            </nav>
        </section>
    )
});

export default Sidebar;