import LoadingSpinner from "@/blog/_components/LoadingSpinner";
import React from "react";

interface PageLoadingSpinnerProps {
    children?: React.ReactNode;
    boxColor?: string;
    className?: string;
}

const PageLoadingSpinner: React.FC<PageLoadingSpinnerProps> = ({
    children = "Loading...🐶",
    className,
    // boxColor = "bg-none",
    boxColor = "bg-slate-200",
}) => {
    return (
        <div className="left-0 top-0 fixed h-[100dvh] w-full flex justify-center items-center pointer-events-none z-[50]">
            <LoadingSpinner
                className={`backdrop-blur-lg bg-opacity-15 rounded-xl p-5 ${boxColor} ${className}`}
            >
                {children}
            </LoadingSpinner>
        </div>
    );
};

export default PageLoadingSpinner;
