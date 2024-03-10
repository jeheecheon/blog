import { ReactElement } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import { RootState } from '@/common/redux/store';
import Header from '@/pages/blog/page/components/Header'
import Footer from '@/pages/blog/page/components/Footer'

import { Helmet } from 'react-helmet';

interface LayoutProps {
    children?: ReactElement | ReactElement[],
    className?: string
}

const Layout: React.FC<LayoutProps> = ({ className }) => {
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    return (
        <>
            {/* Upper bg color */}
            <div className='fixed w-screen h-screen bg-default-2 dark:bg-body-dark -z-10' />

            <main className={`dark:bg-[#101010] bg-default-5 dark:text-default-7 text-default-1-dark 
                font-['Noto_Sans_KR'] ${className}`}>

                <Header />

                {/* Content body */}
                <div className='sm:mx-[30px] md:mx-[30px] lg:mx-[60px] xl:mx-auto max-w-[1160px]
                bg-default-2 dark:bg-body-dark pt-[100px]'>

                    <section className='mx-6 md:mx-10 min-h-[70vh]'>
                        <Outlet />
                    </section>

                    <Footer />
                </div>

            </main>


            {/* Bottom bg color */}
            <div className='fixed w-screen h-screen bg-default-2 dark:bg-body-dark -z-10' />


            {/* Business logic */}
            <ScrollRestoration />
            {
                isDarkMode
                    ? <Helmet>
                        <meta name='theme-color' content='#1c1c1c' />
                        <meta name='apple-mobile-web-app-status-bar-style' content='black' />
                        <meta name='msapplication-navbutton-color' content='#1c1c1c' />
                    </Helmet>
                    : <Helmet>
                        <meta name='theme-color' content='rgb(250, 250, 250)' />
                        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                        <meta name='msapplication-navbutton-color' content='rgb(250, 250, 250)' />
                    </Helmet>
            }
        </>
    )
};

export default Layout;