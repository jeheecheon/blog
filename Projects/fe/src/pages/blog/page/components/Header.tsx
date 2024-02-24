
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/common/redux/store"
import Avatar from "@/common/components/post/Avatar"
import me from "@/common/assets/images/default/me.jpg"
import { Link } from "react-router-dom"

interface HeaderProps {
    setShowSidebar: React.Dispatch<React.SetStateAction<string>>,
    show: string
}

const Header: React.FC<HeaderProps> = React.memo((props) => {
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
    const dispatch = useDispatch();

    return (
        <aside className="fixed pt-[30px] w-full z-30">
            <div className="sm:mx-[30px] md:mx-[30px] lg:mx-[60px] xl:mx-auto max-w-[1160px] px-3 md:px-10
            flex flex-row items center justify-between">

                <Avatar avatar={me} className="ring-2 ring-default-13-dark border-2 border-orange-400" />

                <nav className="dark:bg-default-5-dark
                flex flex-row items-center
                rounded-full px-2">
                    <Link to="/blog" className="px-3 text-orange-400">Home</Link>
                    <Link to="/blog/about-me" className="px-3">About</Link>
                    <Link to="/blog/recent-posts/pages/1" className="px-3">Articles</Link>
                </nav>

                <button>Dark</button>

            </div>
        </aside >
    )
});

export default Header;
