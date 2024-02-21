interface LoadingSpinnerProps {
    children: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ children }) => {
    return (
        <div className='flex justify-center items-center h-full'>
            <div className='w-[250px] h-[200px] flex flex-col justify-center items-center gap-3 
            rounded-xl p-5
            '>
                {/* bg-slate-300 bg-opacity-30 */}
                <div className='border-4 rounded-full p-3 border-t-slate-300 animate-spin w-[40px] h-[40px]
                border-slate-600' />

                <span className='text-center text-md text-slate-600 font-semibold italic'>{children}</span>
            </div>
        </div>
    )
}

export default LoadingSpinner