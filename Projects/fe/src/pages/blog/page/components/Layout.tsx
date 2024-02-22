import { ReactElement, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import { RootState } from '@/common/redux/store';
import Header from '@/pages/blog/page/components/Header'
import Footer from '@/pages/blog/page/components/Footer'
import Sidebar from '@/pages/blog/page/components/Sidebar'
import SignInModal from '@/common/components/SignInModal';

import MusicPlayer from './MusicPlayer';

import '@/pages/blog/page/css/font.css';
import '@/pages/blog/page/css/scrollbar.css';
import '@/pages/blog/page/css/blog.css';
import { Helmet } from 'react-helmet';

interface LayoutProps {
    children?: ReactElement | ReactElement[],
    className?: string
}

const Layout = (props: LayoutProps) => {
    const [showSidebar, setShowSidebar] = useState<string>('');
    const { coverImageUrl, titleOnCover } = useSelector((state: RootState) => state.banner);
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    useEffect(() => {
        if (isDarkMode === true
        ) {
            document.documentElement.classList.add('dark')
            localStorage.theme = 'dark'
            document.querySelector('meta[name="theme-color"]')!.setAttribute('content', '#1c1c1c');
            document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')!.setAttribute('content', '#1c1c1c');
            document.querySelector('meta[name="msapplication-navbutton-color"]')!.setAttribute('content', '#1c1c1c');
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.theme = 'light'
            document.querySelector('meta[name="theme-color"]')!.setAttribute('content', 'rgb(255, 255, 255)');
            document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')!.setAttribute('content', 'rgb(255, 255, 255)');
            document.querySelector('meta[name="msapplication-navbutton-color"]')!.setAttribute('content', 'rgb(255, 255, 255)');
        }
    }, [isDarkMode]);

    return (
        <>
            <Helmet>
                <meta name='apple-mobile-web-app-capable' content='yes' />
                <meta name='theme-color' content='#1c1c1c' />
                <meta name='apple-mobile-web-app-status-bar-style' content='#1c1c1c' />
                <meta name='msapplication-navbutton-color' content='#1c1c1c' />
            </Helmet>

            {
                process.env.NODE_ENV === 'production' &&
                <MusicPlayer
                    className='fixed left-[100vw]'
                />
            }
            <ScrollRestoration />
            <SignInModal />

            <div className='fixed w-screen h-screen bg-default-3 dark:bg-default-3-dark -z-10' />

            <main className={`min-h-screen font-['Noto_Sans_KR']
            flex flex-col dark:text-default-13 text-default-1-dark ${props.className}`}>

                <Sidebar show={showSidebar} setShowSidebar={setShowSidebar} />
                <Header show={showSidebar} setShowSidebar={setShowSidebar} />

                {/* Content body */}
                <section className='bg-default-2 dark:bg-default-2-dark'>
                    {/* Page Header Image */}
                    <div className='bg-fixed h-[75vh] bg-center' style={{
                        backgroundImage: `url(${coverImageUrl})`
                    }}>
                        <span className={`absolute bottom-[60%] right-[50%] translate-y-[60%] translate-x-[50%]
                    text-slate-200 w-full text-3xl text-pretty text-center 
                    bg-default-18 dark:bg-default-18-dark bg-opacity-90 dark:bg-opacity-80 ${titleOnCover && "py-3"}`}>
                            {titleOnCover}
                        </span>
                        <span className='absolute top-[65px] right-[5px] text-white text-lg 
                    bg-opacity-30 bg-yellow-400'>
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
};

export default Layout;