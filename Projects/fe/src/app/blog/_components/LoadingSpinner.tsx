interface LoadingSpinnerProps {
    children: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ children }) => {
    return (
        <div className="w-[250px] h-[200px] flex flex-col justify-center items-center rounded-xl p-5 gap-3 mx-auto">
            {/* spinner */}
            <div
                className="border-4 rounded-full p-3 border-t-default-8 animate-spin w-[40px] h-[40px]
                border-default-18-dark"
            />
            <span className="text-center text-md font-semibold italic">
                {children}
            </span>
        </div>
    );
};

export default LoadingSpinner;
