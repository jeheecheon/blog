import LoadingSpinner from "@/_components/spinner/LoadingSpinner";
import React from "react";
import { createPortal } from "react-dom";

interface PageLoadingSpinnerProps {
    children?: React.ReactNode;
    boxColor?: string;
    className?: string;
}

const PageLoadingSpinner: React.FC<PageLoadingSpinnerProps> = ({
    children = "Loading...",
    className,
    // boxColor = "bg-none",
    boxColor = "bg-gray-400/10 dark:bg-gray-600/10",
}) => {
    return createPortal(
        <div className="left-0 top-0 fixed h-[100vh] w-full flex justify-center items-center pointer-events-none z-[50]">
            <LoadingSpinner
                className={`backdrop-blur-md dark:backdrop-blur-lg rounded-xl p-5 ${boxColor} ${className}`}
            >
                {children}
            </LoadingSpinner>
        </div>,
        document.body
    );
};

export default PageLoadingSpinner;
