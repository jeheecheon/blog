import { SidebarButton } from "@/pages/blog/page/components/SidebarButton"

export const Header = ({ show, setShowSidebar }:
    {
        setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>,
        show: boolean
    }) => {
    return (<>
        <div className='fixed h-[60px] w-full px-3 z-20
            flex flex-row flex-unwrap justify-between items-center basis-auto
            bg-slate-50 shadow-lg shadow-gray-400'>

            <div className="text-center truncate text-slate-900">
                Jehee Cheon 블로그
            </div>
            {/* <SidebarButton show={show} setShowSidebar={setShowSidebar} className="" /> */}
        </div>
        
        <SidebarButton show={show} setShowSidebar={setShowSidebar} color="bg-slate-600"
        className="fixed z-30 top-[22px] right-3" />
        <div className="h-[60px]" />
    </>
    )
}
