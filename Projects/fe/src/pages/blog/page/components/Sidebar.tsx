import React from "react";
import { useIsMounted } from "@/common/hooks/useIsMounted";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { makeVisible } from "@/common/redux/signInModalSlice";
import { AuthTest, SignOut } from "@/common/utils/user";

interface SidebarProps {
    show: string,
    setShowSidebar: React.Dispatch<React.SetStateAction<string>>,
}

const Sidebar = React.memo(({ show, setShowSidebar }: SidebarProps) => {
    const dispatch = useDispatch();
    const justMounted = useIsMounted();

    if (justMounted === true)
        return <></>;

    const overlay = show === "true" ? "animate-show-sidebar-overlay" : "animate-hide-sidebar-overlay pointer-events-none";
    const content1 = show === "true" ? "animate-show-sidebar-content1" : "animate-hide-sidebar-content5 pointer-events-none";
    const content2 = show === "true" ? "animate-show-sidebar-content2" : "animate-hide-sidebar-content4 pointer-events-none";
    const content3 = show === "true" ? "animate-show-sidebar-content3" : "animate-hide-sidebar-content3 pointer-events-none";
    const content4 = show === "true" ? "animate-show-sidebar-content4" : "animate-hide-sidebar-content2 pointer-events-none";
    const content5 = show === "true" ? "animate-show-sidebar-content5" : "animate-hide-sidebar-content1 pointer-events-none";
    const handleLinkClicked = () => setShowSidebar("false");

    return (<>
        <div className={`w-screen h-screen z-30 bg-white bg-opacity-90 fixed cursor-pointer 
        ${overlay}`}
            onClick={() => handleLinkClicked()}>
        </div>

        <div className={`fixed w-screen h-screen z-30 pointer-events-none 
        flex flex-col items-start justify-center gap-3 text-slate-500 pl-[10vw] text-2xl md:text-3xl`}>
            <Link
                to="/blog"
                onClick={handleLinkClicked}
                className={`pointer-events-auto ${content1}`}
            >
                Home
            </Link>

            <Link to="/blog/recent-posts/pages/1"
                onClick={handleLinkClicked}
                className={`mt-5 pointer-events-auto ${content2}`}
            >
                Latest posts
            </Link>

            <Link to="/blog" onClick={() => {
                dispatch(makeVisible());
                handleLinkClicked();
            }} className={`pointer-events-auto ${content3}`}
            >
                Sign in test button
            </Link>

            <Link
                to="/blog/about-me"
                onClick={handleLinkClicked}
                className={`pointer-events-auto ${content4}`}
            >
                About me
            </Link>
            <Link
                to="/blog/post-upload"
                onClick={handleLinkClicked}
                className={`pointer-events-auto ${content5}`}>
                새 포스트 쓰기
            </Link>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    SignOut();
                }}
                className={`pointer-events-auto ${content5}`}
            >
                Sign out test button
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    AuthTest();
                }}
                className={`pointer-events-auto ${content5}`}
            >
                Auth test button
            </button>
        </div>
    </>
    )
});

export default Sidebar;