interface LoadingSpinnerProps {
    children: React.ReactNode;
    textSize?: string;
    className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    children,
    className,
    textSize = "text-sm",
}) => {
    return (
        <div
            className={`mx-auto w-[13rem] h-[11rem] pointer-events-none flex flex-col justify-center items-center gap-3 
            rounded-xl p-5 z-[51] ${className}`}
        >
            {/* spinner */}
            <div
                className="border-4 rounded-full p-3 animate-spin w-[2.5rem] h-[2.5rem]
                border-gray-400/40 border-t-gray-400
                dark:border-default-18-dark dark:border-t-gray-400"
            />

            <p
                className={`text-center text-gray-500/55 dark:text-gray-400/70 font-medium italic
                ${textSize}`}
            >
                {children}
            </p>
        </div>
    );
};

export default LoadingSpinner;
