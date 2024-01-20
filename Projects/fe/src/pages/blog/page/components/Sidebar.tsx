import { useIsMount } from "@/common/hooks/useIsMount";
import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = React.memo(({ show, setShowSidebar }: {
    show: boolean,
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
    const isMount = useIsMount();

    let overlay = '';
    let content1 = '';
    let content2 = '';
    let content3 = '';
    if (isMount === true) {
        overlay = show ? "animate-show-sidebar-overlay" : "";
        content1 = show ? "animate-show-sidebar-content1" : "";
        content2 = show ? "animate-show-sidebar-content2" : "";
        content3 = show ? "animate-show-sidebar-content3" : "";
    }
    else {
        overlay = show ? "animate-show-sidebar-overlay" : "animate-hide-sidebar-overlay";
        content1 = show ? "animate-show-sidebar-content1" : "animate-hide-sidebar-content3";
        content2 = show ? "animate-show-sidebar-content2" : "animate-hide-sidebar-content2";
        content3 = show ? "animate-show-sidebar-content3" : "animate-hide-sidebar-content1";
    }

    const handleLinkClicked = () => setShowSidebar(false);

    return (<>
        <div className={`w-screen h-screen z-30 bg-white bg-opacity-90 fixed right-full
        ${overlay}`}>
        </div>

        <div className={`fixed w-screen h-screen z-30 
        flex flex-col items-start justify-center gap-3 text-slate-500 pl-[10vw] text-3xl`}>
            <Link to="/blog/posts" onClick={handleLinkClicked} className={`-translate-x-[100vw] ${content1}`}>
                Home
            </Link>

            <Link to="/blog/posts" onClick={handleLinkClicked} className={`mt-5 -translate-x-[100vw] ${content2}`}>
                Latest posts
            </Link>

            <Link to="/blog" onClick={handleLinkClicked} className={`-translate-x-[100vw] ${content3}`}>
                Test button
            </Link>
        </div>
    </>
    )
});
