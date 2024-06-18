import PageLoadingSpinner from "@/_components/PageLoadingSpinner";
import { selectCover } from "@/_redux/coverSlice";
import Footer from "@/blog/_components/Footer";
import Header from "@/blog/_components/Header";
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

    function handleScroll() {
        if (window.scrollY < 0) return;

        let scrollPercent = parseFloat(
            ((window.scrollY / window.innerHeight) * 100).toFixed(2)
        );
        if (scrollPercent > 100) {
            scrollPercent = 100;
        }

        const blur = parseFloat((scrollPercent / 5).toFixed(2));
        const scale = scrollPercent > 30 ? 30 : scrollPercent;

        if (
            coverRef.current &&
            coverRef.current.style.filter !== `blur(${blur}px)`
        ) {
            coverRef.current.style.filter = `blur(${blur}px)`;

            if (
                coverImageRef.current &&
                coverImageRef.current.naturalWidth >
                    coverImageRef.current.naturalHeight
            ) {
                coverRef.current.style.backgroundSize = `auto ${100 + scale}%`;
            } else {
                coverRef.current.style.backgroundSize = `${100 + scale}% auto`;
            }
        }
    }

    function toggleBounceAnimation() {
        if ((window.scrollY / window.innerHeight) * 100 < 30) {
            articleRef.current!.classList.add("animate-bounce-sm");
        } else {
            articleRef.current!.classList.remove("animate-bounce-sm");
        }
    }

    useEffect(() => {
        if (location.pathname.startsWith("/blog/post/edit")) {
            articleRef.current?.classList.remove("animate-bounce-sm");
        } else {
            toggleBounceAnimation();
            document.addEventListener("scroll", toggleBounceAnimation);
        }
        return () => {
            document.removeEventListener("scroll", handleScroll);
            document.removeEventListener("scroll", toggleBounceAnimation);
        };
    }, [location.pathname]);

    return (
        <>
            <img
                ref={coverImageRef}
                src={coverImageUrl}
                alt="Cover Image"
                style={{ display: "none" }}
                onLoad={() => {
                    setImageLoaded(true);
                    handleScroll();
                    document.addEventListener("scroll", handleScroll);
                }}
            />

            <PageLoadingSpinner
                className={`transition-opacity duration-1000 ${
                    imageLoaded ? "opacity-0" : "opacity-100"
                }`}
            >
                Loading...
            </PageLoadingSpinner>

            <main
                className={`font-['Noto_Sans_KR'] dark:text-default-7 text-default-1-dark ${props.className}`}
            >
                <Header />

                {/* Content body */}
                <div
                    ref={coverRef}
                    className={`absolute w-full h-[90vh] transition-opacity duration-1000 ${
                        imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                        backgroundImage: `url(${coverImageUrl})`,
                        backgroundPosition: "top center",
                    }}
                />

                <div
                    className={`absolute w-full h-[70vh] flex items-center transition-opacity duration-1000 ${
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

                <div className="h-[60vh]" />

                <div className="bg-default-2 dark:bg-[#101010]">
                    <section
                        ref={articleRef}
                        style={{
                            visibility: imageLoaded ? "visible" : "hidden",
                        }}
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
