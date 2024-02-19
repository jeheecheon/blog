import { Link } from "react-router-dom"

import SidebarButton from "@/pages/blog/page/components/SidebarButton"
import React, { useMemo, useState } from "react"

interface HeaderProps {
    setShowSidebar: React.Dispatch<React.SetStateAction<string>>,
    show: string
}

const Header: React.FC<HeaderProps> = React.memo((props) => {
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.theme === 'dark'
    );

    return (
        <>
            <section>
                <nav className='fixed h-[50px] w-full px-3 z-20
                flex flex-row flex-unwrap justify-between items-center basis-auto
                bg-slate-50 shadow-md shadow-gray-400'>
                    <Link to='/blog' className="truncate text-slate-800">
                        Jehee Cheon 블로그
                    </Link>
                    <button
                        className="dark:text-green-300"
                        onClick={() => {
                            setIsDarkMode(!isDarkMode);
                            if (isDarkMode) {
                                document.documentElement.classList.remove('dark')
                                localStorage.theme = 'light'
                            } else {
                                document.documentElement.classList.add('dark')
                                localStorage.theme = 'dark'
                            }
                        }}
                    >
                        asdasdasdasd
                    </button>
                </nav>
                <SidebarButton show={props.show} setShowSidebar={props.setShowSidebar} color="bg-slate-600"
                    className="fixed z-30 top-[17px] right-3" />
                <div className="h-[50px]" />
            </section >
        </>
    )
});

export default Header;
