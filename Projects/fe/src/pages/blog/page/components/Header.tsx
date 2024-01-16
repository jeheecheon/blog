import { SidebarButton } from "@blog/page/components/SidebarButton"

export const Header = () => {
    return (<>
        <div className='fixed h-[60px] w-full px-3
            flex flex-row flex-unwrap
            justify-between items-center
            grow shrink-0 basis-auto
            bg-blue-50 shadow-xl shadow-gray-400'>

            {/* <div className='hidden md:block'>
                avatar
            </div> */}
            <div className="text-center truncate">
                Jehee Cheon 블로그
            </div>
            <SidebarButton/>
        </div>
        <div className="h-[60px]" />
    </>
    )
}
