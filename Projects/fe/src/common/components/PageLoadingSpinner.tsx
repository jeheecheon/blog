import React from 'react'

const PageLoadingSpinner: React.FC = () => {
    return (
        <div className='h-full w-full flex justify-center items-center'>
            <div className='z-50 pointer-events-none animate-fade-out-spinner 
            flex justify-center items-center w-screen h-[90vh]'>
                <div className='w-[200px] h-[200px] flex flex-col justify-center items-center gap-3 bg-slate-300
                bg-opacity-30 rounded-xl p-5'>
                    <div className='border-4 rounded-full p-3 border-t-default-8 animate-spin w-[40px] h-[40px]
                    border-default-18-dark' />
                    <span className='text-md text-default-13 font-semibold italic'>Page Loading..!</span>
                </div>
            </div>
        </div>
    )
}

export default PageLoadingSpinner;
