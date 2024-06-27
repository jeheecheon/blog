import { ReactNode } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

import Header from "@/_components/Header";
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
                <Header className="mt-[13px] max-w-[1050px] sm:mx-[30px] md:mx-[30px] lg:mx-[60px] xl:mx-auto px-3 md:px-10" />

                <main
                    className="sm:px-[30px] md:px-[30px] lg:px-[60px] xl:mx-auto max-w-[1220px] bg-body pt-[95px]
                    border-x-[1px] dark:border-x-default-5-dark border-x-default-7 grow w-full"
                >
                    <div className="px-6 md:px-10 ">
                        <Outlet />
                    </div>
                </main>

                <Footer className="w-full sm:px-[30px] md:px-[30px] lg:px-[60px] xl:mx-auto max-w-[1220px] bg-body" />
            </div>

            {/* Business logic */}
            <ScrollRestoration />
        </>
    );
};

export default BlogLayout;
