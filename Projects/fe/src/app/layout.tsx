import { ReactNode } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

import Footer from "@/_components/layout/Footer";

interface LayoutProps {
    children?: ReactNode;
    className?: string;
}

const BlogLayout: React.FC<LayoutProps> = ({ className }) => {
    return (
        <>
            <div
                className={`dark:text-default-7 text-default-1-dark w-full 
                bg-[var(--main-bg-color-3)] transition-colors duration-700 ease-in-out
                font-['Noto_Sans_KR'] min-h-full flex flex-col md:px-8 lg:px-10 xl:px-0 ${className}`}
            >
                <main
                    className="bg-[var(--main-bg-color-1)] transition-colors duration-700 ease-in-out
                    sm:px-[1.875rem] lg:px-[3.75rem] xl:mx-auto max-w-[76.25rem] pt-[5.938rem]
                    border-x-[0.0625rem] dark:border-x-default-5-dark border-x-default-7 grow w-full"
                >
                    <Outlet />
                </main>

                <Footer
                    className="bg-[var(--main-bg-color-1)] transition-colors duration-700 ease-in-out
                    w-full max-w-[76.25rem] sm:px-[1.875rem] lg:px-[3.75rem] xl:mx-auto
                    border-x-[0.0625rem] dark:border-x-default-5-dark border-x-default-7"
                />
            </div>

            {/* Business logic */}
            <ScrollRestoration />
        </>
    );
};

export default BlogLayout;
