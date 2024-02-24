import { ReactElement, useState } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import { RootState } from '@/common/redux/store';
import Header from '@/pages/blog/page/components/Header'
import Footer from '@/pages/blog/page/components/Footer'

import MusicPlayer from '@/pages/blog/page/components/MusicPlayer';

import { Helmet } from 'react-helmet';

interface LayoutProps {
    children?: ReactElement | ReactElement[],
    className?: string
}

const Layout = (props: LayoutProps) => {
    const [showSidebar, setShowSidebar] = useState<string>('');
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    return (
        <>
            {/* Upper bg color */}
            <div className='fixed w-screen h-screen bg-default-3 dark:bg-body-dark -z-10' />

            <main className={`font-['Noto_Sans_KR'] dark:bg-[#101010] dark:text-default-7 text-default-1-dark ${props.className}`}>

                <Header show={showSidebar} setShowSidebar={setShowSidebar} />

                {/* Content body */}
                <div className='sm:mx-[30px] md:mx-[30px] lg:mx-[60px] xl:mx-auto max-w-[1160px] min-h-[100vh]
                px-3 md:px-10
                bg-default-2 dark:bg-body-dark pt-[100px]'>
                    {/* <Sidebar show={showSidebar} setShowSidebar={setShowSidebar} /> */}

                    <section className='min-h-[60vh]'>
                        {props.children ? props.children : <Outlet />}
                    </section>

                    <Footer className='' />
                </div>

            </main>


            {/* Bottom bg color */}
            <div className='fixed w-screen h-screen bg-default-3 dark:bg-body-dark -z-10' />


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

            {
                process.env.NODE_ENV === 'production' &&
                <MusicPlayer
                    className='fixed left-[100vw]'
                />
            }
        </>
    )
};

export default Layout;