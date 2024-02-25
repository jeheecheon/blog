
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/common/redux/store"
import Avatar from "@/common/components/post/Avatar"
import me from "@/common/assets/images/default/me.jpg"
import { Link } from "react-router-dom"
import { setIsDarkMode } from "@/common/redux/themeSlice"

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
    const dispatch = useDispatch();
    const [prevScrollY, setPrevScrollY] = useState<number>(0);
    const [headerTop, setHeaderTop] = useState<number>(0);
    const headerRef = useRef<HTMLElement | null>(null);
    const changeTheme = () => {
        dispatch(setIsDarkMode(!isDarkMode));
    }

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        }
    })

    const handleScroll = () => {
        setPrevScrollY(window.scrollY);

        if (window.scrollY > prevScrollY) { // down
            const topDiff = window.scrollY - prevScrollY;
            let tempHeaderTop = headerTop - topDiff;
            tempHeaderTop = tempHeaderTop <= -120 ? -120 : tempHeaderTop;
            setHeaderTop(tempHeaderTop);
            headerRef.current!.style.top = `${tempHeaderTop}px`;

        }
        else {
            const topDiff = prevScrollY - window.scrollY;
            let tempHeaderTop = headerTop + topDiff;
            tempHeaderTop = tempHeaderTop > 0 ? 0 : tempHeaderTop;
            setHeaderTop(tempHeaderTop);
            headerRef.current!.style.top = `${tempHeaderTop}px`;
        }
    }

    return (
        <aside ref={headerRef} className="fixed mt-[30px] w-full z-30">
            <div className="sm:mx-[30px] md:mx-[30px] lg:mx-[60px] xl:mx-auto max-w-[1160px] px-3 md:px-10
            flex flex-row items-center justify-between">

                <Avatar
                    avatar={me}
                    width={55}
                    className="ring-[2.5px] ring-orange-300 border-[0.5px] border-slate-300 shadow-2xl" />

                <nav className="dark:bg-default-5-dark bg-default-2 
                drop-shadow-xl border-[1px] border-slate-300 dark:border-default-18-dark ring-[0.4px] ring-orange-300
                flex flex-row items-center
                rounded-full px-2 h-fit py-2 text-sm">
                    <Link to="/blog" className="px-3 text-orange-400">Home</Link>
                    <Link to="/blog/about-me" className="px-3">About</Link>
                    <Link to="/blog/recent-posts/pages/1" className="px-3">Articles</Link>
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
            </div>
        </aside >
    )
};

export default Header;
