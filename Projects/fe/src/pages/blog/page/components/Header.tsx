
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
        <aside className="pt-[30px] pb-[60px]
        flex flex-row  items center justify-between">
            <Avatar avatar={me} />
            <nav className="dark:bg-default-5-dark
                flex flex-row items-center
                rounded-full px-2">
                <Link to="" className="px-3 text-emerald-500">Home</Link>
                <Link to="" className="px-3">About</Link>
                <Link to="" className="px-3">Articles</Link>
            </nav>
            <button>Dark</button>
        </aside >
    )
});

export default Header;
