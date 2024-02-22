import { Link } from "react-router-dom"

import SidebarButton from "@/pages/blog/page/components/SidebarButton"
import React from "react"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/common/redux/store"
import { setIsDarkMode } from "@/common/redux/themeSlice"

interface HeaderProps {
    setShowSidebar: React.Dispatch<React.SetStateAction<string>>,
    show: string
}

const Header: React.FC<HeaderProps> = React.memo((props) => {
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
    const dispatch = useDispatch();

    const buttonVariants = {
        off: { backgroundColor: 'rgb(225, 225, 225)', transition: { duration: 0.3 } },
        on: { backgroundColor: 'rgb(60, 60, 60)', transition: { duration: 0.3 } }
    };

    const circleVariants = {
        off: { x: 3, transition: { duration: 0.3 } },
        on: { x: 27, transition: { duration: 0.3 } }
    };

    return (
        <section>
            <nav className='fixed h-[50px] w-full px-3 z-20
                flex flex-row flex-unwrap justify-between items-center basis-auto
                bg-default-1 dark:bg-default-3-dark shadow-md 
                shadow-gray-400 dark:shadow-default-1-dark'>
                <Link to='/blog' className="truncate font-bold italic
                    text-default-8-dark dark:text-default-3 text-lg">
                    <span className='uppercase text-sm'>Blog</span>
                    <span className='text-blue-500 mx-[2px] font-extrabold'>:</span>
                    <span className="">jeheecheon</span>
                </Link>

                <motion.button
                    className="mr-[50px]"
                    onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
                    variants={buttonVariants}
                    initial={false}
                    animate={isDarkMode ? 'on' : 'off'}
                    style={{ padding: '10px', cursor: 'pointer', position: 'relative', width: '55px', height: '26px', borderRadius: '15px' }}
                >
                    {isDarkMode
                        ? < motion.svg
                            variants={circleVariants}
                            animate={isDarkMode ? 'on' : 'off'}
                            style={{ position: 'absolute', top: '-1px', left: '2px', width: '26px', height: '26px', borderRadius: '50%' }}
                            className="fill-yellow-300" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z" />
                        </motion.svg>
                        : <motion.svg
                            variants={circleVariants}
                            animate={isDarkMode ? 'on' : 'off'}
                            style={{ position: 'absolute', top: '-1px', left: '2px', width: '26px', height: '26px', borderRadius: '50%' }}
                            className="fill-red-500" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z" />
                        </motion.svg>
                    }
                </motion.button>
            </nav>
            <SidebarButton
                show={props.show}
                setShowSidebar={props.setShowSidebar}
                color="bg-slate-600 dark:bg-default-18"
                className="fixed z-30 top-[17px] right-3" />
            <div className="h-[50px]" />
        </section >
    )
});

export default Header;
