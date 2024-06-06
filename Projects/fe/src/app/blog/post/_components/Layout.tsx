import { selectCover } from "@/_redux/coverSlice";
import Footer from "@/blog/_components/Footer";
import Header from "@/blog/_components/Header";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Outlet, ScrollRestoration } from "react-router-dom";

interface LayoutProps {
    children?: ReactNode;
    className?: string;
}
const Layout = (props: LayoutProps) => {
    const { coverImageUrl, titleOnCover } = useSelector(selectCover);

    return (
        <>
            {/* Upper bg color */}
            <div className="fixed w-screen h-screen bg-body -z-10" />

            <main
                className={`font-['Noto_Sans_KR'] dark:text-default-7 text-default-1-dark ${props.className}`}
            >
                <Header />

                {/* Content body */}
                <div
                    className="absolute w-full h-[80vh] flex items-center"
                    style={{
                        backgroundImage: `url(${coverImageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <span
                        className={`w-full
                        text-slate-100 text-xl md:text-3xl text-pretty text-center 
                        bg-gray-600/55 dark:bg-gray-800/65 ${
                            titleOnCover && "py-3"
                        }`}
                    >
                        {titleOnCover}
                    </span>
                </div>

                <div className="h-[60vh]" />

                <div className="bg-default-2 dark:bg-[#101010]">
                    <section>
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

export default Layout;
