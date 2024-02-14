import React from 'react'

const CommentsLoadingSpinner = () => {
    return (
        <div className='flex justify-center items-center'>
            <div className='w-[250px] h-[200px] flex flex-col justify-center items-center gap-3 bg-slate-300
                bg-opacity-30 rounded-xl p-5'>

                <div className='border-4 rounded-full p-3 border-t-slate-300 animate-spin w-[40px] h-[40px]
                border-slate-600' />

                <span className='text-center text-md text-slate-800 font-semibold italic'>Comments Loading..!</span>
            </div>
        </div>
    )
}

export default CommentsLoadingSpinner