import React from 'react'

const PageLoadingSpinner: React.FC = () => {
    return (
        <div className='fixed z-50 pointer-events-none animate-fade-out-spinner'>
            <div className='flex justify-center items-center w-screen h-screen'>
                <div className='w-[200px] h-[200px] flex flex-col justify-center items-center gap-3 bg-slate-300
                bg-opacity-30 rounded-xl p-5'>
                    <div className='border-4 rounded-full p-3 border-t-slate-300 animate-spin w-[40px] h-[40px]
                    border-slate-600' />
                    <span className='text-md text-slate-800 font-semibold italic'>Page Loading..!</span>
                </div>
            </div>
        </div>
    )
}

export default PageLoadingSpinner;
