import { RootState } from "@/common/redux/store"
import Footer from "@/pages/blog/page/components/Footer"
import Header from "@/pages/blog/page/components/Header"
import { ReactNode } from "react"
import { Helmet } from "react-helmet"
import { useSelector } from "react-redux"
import { Outlet, ScrollRestoration } from "react-router-dom"

interface LayoutProps {
    children?: ReactNode,
    className?: string
}
const Layout = (props: LayoutProps) => {
    const { coverImageUrl, titleOnCover } = useSelector((state: RootState) => state.banner);
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    return (
        <>
            {/* Upper bg color */}
            <div className='fixed w-screen h-screen bg-default-2 dark:bg-body-dark -z-10' />

            <main className={`font-['Noto_Sans_KR'] dark:text-default-7 text-default-1-dark ${props.className}`}>
                <Header />
                
                {/* Content body */}
                <div className='bg-fixed h-[75vh] bg-center' style={{
                    backgroundImage: `url(${coverImageUrl})`
                }}>

                    <span className={`absolute bottom-[77%] right-[50%] translate-y-[77%] translate-x-[50%]
                        text-slate-200 w-full text-xl md:text-3xl text-pretty text-center 
                        bg-default-18 dark:bg-default-18-dark bg-opacity-80 dark:bg-opacity-60 ${titleOnCover && "py-3"}`}>
                        {titleOnCover}
                    </span>

                    <span className='absolute right-[0px] text-white text-lg 
                            bg-opacity-50 bg-yellow-400'
                    >
                        😁 항상 &#160;<span className=''>화이팅</span>
                    </span>
                </div>

                <div className="bg-default-2 dark:bg-[#101010]">
                    <section>
                        <Outlet />
                    </section>

                    <Footer/>
                </div>

            </main>

            {/* Bottom bg color */}
            <div className='fixed w-screen h-screen bg-default-2 dark:bg-[#101010] -z-10' />

            
            {/* Business logic */}
            <ScrollRestoration />
            {
                isDarkMode
                    ? <Helmet>
                        <meta name='theme-color' content='#1c1c1c' />
                        <meta name='apple-mobile-web-app-status-bar-style' content='#1c1c1c' />
                        <meta name='msapplication-navbutton-color' content='#1c1c1c' />
                    </Helmet>
                    : <Helmet>
                        <meta name='theme-color' content='rgb(255, 255, 255)' />
                        <meta name='apple-mobile-web-app-status-bar-style' content='rgb(255, 255, 255)' />
                        <meta name='msapplication-navbutton-color' content='rgb(255, 255, 255)' />
                    </Helmet>
            }
        </>
    )
}

export default Layout