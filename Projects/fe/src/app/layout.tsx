import { ReactNode } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

import Footer from "@/_components/Footer";

interface LayoutProps {
    children?: ReactNode;
    className?: string;
}

const BlogLayout: React.FC<LayoutProps> = ({ className }) => {
    return (
        <>
            <div
                className={`dark:bg-[#101010] bg-default-5 dark:text-default-7 text-default-1-dark w-full
                font-['Noto_Sans_KR'] min-h-full flex flex-col ${className}`}
            >
                <main
                    className="sm:px-[1.875rem] lg:px-[3.75rem] xl:mx-auto max-w-[121.25rem] bg-body pt-[5.938rem]
                    border-x-[0.0625rem] dark:border-x-default-5-dark border-x-default-7 grow w-full"
                >
                    <div className="px-6 md:px-10 ">
                        <Outlet />
                    </div>
                </main>

                <Footer className="w-full sm:px-[1.875rem] lg:px-[3.75rem] xl:mx-auto max-w-[121.25rem] bg-body" />
            </div>

            {/* Business logic */}
            <ScrollRestoration />
        </>
    );
};

export default BlogLayout;
