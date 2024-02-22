import { setIsDarkMode } from '@/common/redux/themeSlice';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

const InitialSetUp = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            || localStorage.theme === undefined || localStorage.theme === null
        ) {
            document.documentElement.classList.add('dark')
            localStorage.theme = 'dark'
            dispatch(setIsDarkMode(true))
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.theme = 'light'
            dispatch(setIsDarkMode(false))
        }
    }, []);

    return (
        <div className='dark:text-default-13 text-default-1-dark
        before:fixed before:h-100vh before:w-100vw before:bg-default-3 before:dark:bg-default-3-dark
        after:fixed before:h-100vh after:w-100vw after:bg-default-3 after:dark:bg-default-3-dark'
        >
            <Outlet />
        </div>
    )
}

export default InitialSetUp