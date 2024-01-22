import { Link } from "react-router-dom"

import SidebarButton from "@/pages/blog/page/components/SidebarButton"

interface HeaderProps {
    setShowSidebar: React.Dispatch<React.SetStateAction<string>>,
    show: string
}

const Header: React.FC<HeaderProps> = (props) => {
    return (<>
        <div className='fixed h-[60px] w-full px-3 z-20
            flex flex-row flex-unwrap justify-between items-center basis-auto
            bg-slate-50 shadow-md shadow-gray-400'>

            <Link to='/blog/posts' className="align-middle text-center truncate text-slate-900 h-full
                    flex flex-row justify-center items-center">
                Jehee Cheon 블로그
            </Link>

            {/* <SidebarButton show={show} setShowSidebar={setShowSidebar} className="" /> */}
        </div>

        <SidebarButton show={props.show} setShowSidebar={props.setShowSidebar} color="bg-slate-600"
            className="fixed z-30 top-[22px] right-3" />
        <div className="h-[60px]" />
    </>
    )
}

export default Header;
