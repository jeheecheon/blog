import { ReactElement, useState } from 'react'
import { Header } from '@/pages/blog/page/components/Header'
import { Footer } from '@/pages/blog/page/components/Footer'
import { Sidebar } from '@/pages/blog/page/components/Sidebar'


export const Layout = (props: { children: ReactElement | ReactElement[] }) => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (<>
        <div className="bg-white dark:bg-gray-900 min-h-screen h-auto font-['Noto_Sans_KR']
            flex flex-col justify-between">

            <Sidebar show={showSidebar} setShowSidebar={setShowSidebar} />
            <Header show={showSidebar} setShowSidebar={setShowSidebar} />
            <div className='mb-auto'>
                {props.children}
            </div>

            <Footer />

        </div>
    </>
    )
}
