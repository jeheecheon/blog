import { useEffect } from 'react'
import SignInModal from './SignInModal'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import MusicPlayer from '@/common/components/MusicPlayer';

import '@/pages/blog/page/css/font.css';
import '@/pages/blog/page/css/scrollbar.css';
import '@/pages/blog/page/css/blog.css';


const BlogLoad = () => {
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

    useEffect(() => {
        if (isDarkMode === true
        ) {
            document.documentElement.classList.add('dark')
            localStorage.theme = 'dark'
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.theme = 'light'
        }
    }, [isDarkMode]);

    return (
        <>
            <MusicPlayer className='fixed left-[100vw]'/>
            <SignInModal />
            <Outlet />
        </>
    )
}

export default BlogLoad