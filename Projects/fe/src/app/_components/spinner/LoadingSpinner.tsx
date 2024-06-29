interface LoadingSpinnerProps {
    children: React.ReactNode;
    textSize?: string;
    className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    children,
    className,
    textSize = "text-base",
}) => {
    return (
        <div
            className={`mx-auto w-[14.375rem] h-[14.375rem] pointer-events-none flex flex-col justify-center items-center gap-3 
            rounded-xl p-5 z-[51] ${className}`}
        >
            {/* spinner */}
            <div
                className="border-4 rounded-full p-3 animate-spin w-[2.5rem] h-[2.5rem]
                border-default-8 border-t-default-18
                dark:border-default-18-dark dark:border-t-default-10"
            />

            <p
                className={`text-center text-default-18-dark dark:text-default-16 font-[500] italic animate-blur-in-out
                ${textSize}`}
            >
                {children}
            </p>
        </div>
    );
};

export default LoadingSpinner;
