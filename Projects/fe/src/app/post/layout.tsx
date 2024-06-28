import PageLoadingSpinner from "@/_components/PageLoadingSpinner";
import { selectCover } from "@/_redux/coverSlice";
import Footer from "@/_components/Footer";
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

        const blur = parseFloat((scrollPercent * 0.2).toFixed(2));
        let scale = 1 + scrollPercent / 100;
        scale = scale > 1.3 ? 1.3 : scale;

        if (
            coverRef.current &&
            coverRef.current.style.filter !== `blur(${blur}px)`
        ) {
            coverRef.current.style.filter = `blur(${blur}px)`;
            coverRef.current.style.scale = `${scale}`;
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
        if (location.pathname.startsWith("/post/edit")) {
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
                Loading...🐶
            </PageLoadingSpinner>

            <main
                className={`font-['Noto_Sans_KR'] dark:text-default-7 text-default-1-dark 
                h-full overflow-x-clip ${props.className}`}
            >
                {/* Content body */}
                <div className="absolute w-full h-[90%] overflow-hidden mask-bottom">
                    <div
                        ref={coverRef}
                        className={`h-full transition-opacity duration-1000 
                        bg-center bg-cover ${
                            imageLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                            backgroundImage: `url(${coverImageUrl})`,
                        }}
                    />
                </div>

                <div
                    className={`absolute w-full h-[70%] flex items-center transition-opacity duration-1000 ${
                        imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <h1
                        className={`w-full 
                        text-slate-100 dark:text-default-6 text-xl md:text-3xl text-pretty text-center font-[500]
                        bg-gray-600/55 dark:bg-gray-800/65 ${
                            titleOnCover && "py-3 px-5"
                        }`}
                    >
                        {titleOnCover}
                    </h1>
                </div>

                <div className="h-[60%]" />

                <div
                    className="bg-default-2 dark:bg-[#101010]"
                    style={{
                        visibility: imageLoaded ? "visible" : "hidden",
                    }}
                >
                    <section ref={articleRef}>
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
