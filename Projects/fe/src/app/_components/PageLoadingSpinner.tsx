import LoadingSpinner from "@/blog/_components/LoadingSpinner";
import React from "react";

interface PageLoadingSpinnerProps {
    children?: React.ReactNode;
    boxColor?: string;
}

const PageLoadingSpinner: React.FC<PageLoadingSpinnerProps> = ({
    children = "Loading...🐶",
    boxColor = "bg-transparent",
    // boxColor = "bg-slate-200",
}) => {
    return (
        <div className="left-0 top-0 fixed h-[100dvh] w-full flex justify-center items-center">
            <LoadingSpinner
                className={`backdrop-blur-3xl rounded-xl p-5 animate-fade-out-spinner bg-opacity-15 ${boxColor}`}
            >
                {children}
            </LoadingSpinner>
        </div>
    );
};

export default PageLoadingSpinner;
