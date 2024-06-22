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
                className={`dark:bg-[#101010] bg-default-5 dark:text-default-7 text-default-1-dark
                font-['Noto_Sans_KR'] ${className}`}
            >
                <Header />

                <main
                    className="sm:mx-[30px] md:mx-[30px] lg:mx-[60px] xl:mx-auto max-w-[1220px] bg-body pt-[95px]
                    border-x-[1px] dark:border-x-default-5-dark border-x-default-7 min-h-[70vh]"
                >
                    <div className="mx-6 md:mx-10">
                        <Outlet />
                    </div>
                </main>

                <Footer className="sm:mx-[30px] md:mx-[30px] lg:mx-[60px] xl:mx-auto max-w-[1220px] bg-body" />
            </div>

            {/* Business logic */}
            <ScrollRestoration />
        </>
    );
};

export default BlogLayout;
