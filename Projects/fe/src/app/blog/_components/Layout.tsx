import { ReactNode } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

import Header from "@/blog/_components/Header";
import Footer from "@/blog/_components/Footer";

interface LayoutProps {
    children?: ReactNode;
    className?: string;
}

const BlogLayout: React.FC<LayoutProps> = ({ className }) => {
    return (
        <>
            {/* Upper bg color */}
            <div className="fixed w-screen h-screen bg-body -z-10" />

            <main
                className={`dark:bg-[#101010] bg-default-5 dark:text-default-7 text-default-1-dark 
                font-['Noto_Sans_KR'] ${className}`}
            >
                <Header />

                {/* Content body */}
                <div
                    className="sm:mx-[30px] md:mx-[30px] lg:mx-[60px] xl:mx-auto max-w-[1160px]
                    bg-body pt-[100px]"
                >
                    <section className="mx-6 md:mx-10 min-h-[70vh]">
                        <Outlet />
                    </section>

                    <Footer />
                </div>
            </main>

            {/* Bottom bg color */}
            <div className="fixed w-screen h-screen bg-body -z-10" />

            {/* Business logic */}
            <ScrollRestoration />
        </>
    );
};

export default BlogLayout;
