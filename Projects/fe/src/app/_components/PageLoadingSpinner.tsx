import React from "react";

const PageLoadingSpinner: React.FC = () => {
    return (
        <div className="left-0 top-0 fixed h-[100dvh] w-full flex justify-center items-center">
            <div
                className="w-[200px] h-[200px] z-50 pointer-events-none flex flex-col justify-center items-center gap-3 
                bg-slate-200 dark:bg-default-7-dark bg-opacity-30 rounded-xl p-5 animate-fade-out-spinner"
            >
                <div
                    className="block border-4 rounded-full p-3 border-t-default-8 animate-spin w-[40px] h-[40px]
                    border-default-18-dark"
                />

                <span className="text-md font-semibold italic animate-blur-in-out">
                    Page Loading...!
                </span>
            </div>
        </div>
    );
};

export default PageLoadingSpinner;
