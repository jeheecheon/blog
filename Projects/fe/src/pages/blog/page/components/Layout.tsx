import { ReactElement } from 'react'
import { Header } from '@blog/page/components/Header'
import { Footer } from '@blog/page/components/Footer'


export const Layout = (props: { children: ReactElement | ReactElement[] }) => {
    return (<>
        <div className="bg-slate-50 dark:bg-gray-900 min-h-screen h-auto font-['Gowun_Dodum']
            flex flex-col justify-between">

            <Header />

            <div className='mb-auto'>
                {props.children}
            </div>

            <Footer />

        </div>
    </>
    )
}
