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
            <main
                className={`font-['Noto_Sans_KR'] dark:text-default-7 text-default-1-dark ${props.className}`}
            >
                <Header />

                {/* Content body */}
                <div
                    className="absolute w-full h-[100vh] flex items-center"
                    style={{
                        backgroundImage: `url(${coverImageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <span
                        className={`w-full
                        text-slate-100 dark:text-default-6 text-xl md:text-3xl text-pretty text-center font-[500]
                        bg-gray-600/55 dark:bg-gray-800/65 ${
                            titleOnCover && "py-3 px-5"
                        }`}
                    >
                        {titleOnCover}
                    </span>
                </div>

                <div className="h-[80vh]" />

                <div className="bg-default-2 dark:bg-[#101010]">
                    <section>
                        <Outlet />
                    </section>

                    <Footer />
                </div>
            </main>

            <ScrollRestoration />
        </>
    );
};

export default Layout;
