import { selectCover } from "@/_redux/coverSlice";
import Footer from "@/blog/_components/Footer";
import Header from "@/blog/_components/Header";
import LoadingSpinner from "@/blog/_components/LoadingSpinner";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

interface LayoutProps {
    children?: ReactNode;
    className?: string;
}
const Layout = (props: LayoutProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const { coverImageUrl, titleOnCover } = useSelector(selectCover);
    const coverRef = useRef<HTMLDivElement>(null);
    const articleRef = useRef<HTMLDivElement>(null);
    const coverImageRef = useRef<HTMLImageElement>(null);
    const location = useLocation();

    useEffect(() => {
        function handleScroll() {
            let scrollPercent = parseFloat(
                ((window.scrollY / window.innerHeight) * 100).toFixed(2)
            );
            if (scrollPercent > 100) {
                scrollPercent = 100;
            }

            const blur = parseFloat((scrollPercent / 7).toFixed(2));
            const scale = scrollPercent > 30 ? 30 : scrollPercent;

            if (coverRef.current!.style.filter !== `blur(${blur}px)`) {
                coverRef.current!.style.filter = `blur(${blur}px)`;

                if (
                    coverImageRef.current!.naturalWidth >
                    coverImageRef.current!.naturalHeight
                ) {
                    coverRef.current!.style.backgroundSize = `auto ${
                        100 + scale
                    }%`;
                } else {
                    coverRef.current!.style.backgroundSize = `${
                        100 + scale
                    }% auto`;
                }
            }
        }

        function attachBounceAnimation() {
            if (location.pathname.startsWith("/blog/post/edit")) {
                articleRef.current!.classList.remove("animate-bounce-sm");
                return;
            }

            if ((window.scrollY / window.innerHeight) * 100 < 30) {
                articleRef.current!.classList.add("animate-bounce-sm");
            } else {
                articleRef.current!.classList.remove("animate-bounce-sm");
            }
        }

        document.addEventListener("scroll", handleScroll);
        document.addEventListener("scroll", attachBounceAnimation);
        return () => {
            document.removeEventListener("scroll", handleScroll);
            document.removeEventListener("scroll", attachBounceAnimation);
        };
    }, []);

    return (
        <>
            <img
                ref={coverImageRef}
                src={coverImageUrl}
                alt="Cover Image"
                style={{ display: "none" }}
                onLoad={() => setImageLoaded(true)}
            />

            <main
                className={`font-['Noto_Sans_KR'] dark:text-default-7 text-default-1-dark ${props.className}`}
            >
                <Header />

                {/* Content body */}
                <div
                    ref={coverRef}
                    className="absolute w-full h-[100vh] flex justify-center items-center"
                    style={{
                        backgroundImage: `url(${coverImageUrl})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }}
                >
                    <LoadingSpinner
                        className={`transition-opacity duration-1000 ${
                            imageLoaded ? "opacity-0" : "opacity-100"
                        }`}
                    >
                        Loading...
                    </LoadingSpinner>
                </div>

                <div
                    className={`absolute w-full h-[100vh] flex items-center transition-opacity duration-1000 ${
                        imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
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

                <div className="h-[70vh]" />

                <div className="bg-default-2 dark:bg-[#101010]">
                    <section
                        ref={articleRef}
                        className={`animate-bounce-sm transition-opacity duration-1000 ${
                            imageLoaded ? "opacity-100" : "opacity-0"
                        }`}
                    >
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
