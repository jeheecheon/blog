import { RootState } from "@/common/redux/store"
import Footer from "@/pages/blog/page/components/Footer"
import Header from "@/pages/blog/page/components/Header"
import { ReactNode, useState } from "react"
import { useSelector } from "react-redux"
import { Outlet, ScrollRestoration } from "react-router-dom"

interface LayoutProps {
    children?: ReactNode,
    className?: string
}
const Layout = (props: LayoutProps) => {
    const [showSidebar, setShowSidebar] = useState<string>('');

    const { coverImageUrl, titleOnCover } = useSelector((state: RootState) => state.banner);

    return (
        <>
            <ScrollRestoration />

            <div className='fixed w-screen h-screen bg-default-3 dark:bg-body-dark -z-10' />

            <main className={`font-['Noto_Sans_KR'] dark:text-default-7 text-default-1-dark ${props.className}`}>
                {/* Content body */}
                <section className='bg-default-2 dark:bg-[#101010]'>

                    <Header show={showSidebar} setShowSidebar={setShowSidebar} />

                    {/* Page Header Image */}
                    <div className='bg-fixed h-[75vh] bg-center' style={{
                        backgroundImage: `url(${coverImageUrl})`
                    }}>

                        <span className={`absolute bottom-[77%] right-[50%] translate-y-[77%] translate-x-[50%]
                        text-slate-200 w-full text-3xl text-pretty text-center 
                        bg-default-18 dark:bg-default-18-dark bg-opacity-90 dark:bg-opacity-80 ${titleOnCover && "py-3"}`}>
                            {titleOnCover}
                        </span>

                        <span className='absolute right-[0px] text-white text-lg 
                            bg-opacity-30 bg-yellow-400'
                        >
                            😁 항상 &#160;<span className=''>화이팅</span>
                        </span>

                    </div>
                    {props.children ? props.children : <Outlet />}
                </section>

                <Footer />
                
            </main>

            <div className='fixed w-screen h-screen bg-default-3 dark:bg-default-3-dark -z-10' />
        </>
    )
}

export default Layout