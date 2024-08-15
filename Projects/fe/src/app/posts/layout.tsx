import PageLoadingSpinner from "@/_components/spinner/PageLoadingSpinner";
import { selectCover } from "@/_redux/coverSlice";
import Footer from "@/_components/layout/Footer";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

interface LayoutProps {
    children?: ReactNode;
    className?: string;
}

const Layout = (props: LayoutProps) => {
    const { coverImageUrl, titleOnCover } = useSelector(selectCover);
    const location = useLocation();

    const [imageLoaded, setImageLoaded] = useState(false);

    const coverRef = useRef<HTMLDivElement>(null);
    const articleRef = useRef<HTMLDivElement>(null);
    const coverImageRef = useRef<HTMLImageElement>(null);

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

    useEffect(() => {
        if (coverImageUrl) {
            coverImageRef.current!.src = coverImageUrl;
        } else {
            setImageLoaded(true);
        }
    }, [coverImageUrl]);

    return (
        <>
            <img
                ref={coverImageRef}
                alt="Cover Image"
                style={{ display: "none" }}
                onLoad={() => {
                    setImageLoaded(true);
                    handleScroll();
                    document.addEventListener("scroll", handleScroll);
                }}
                onError={() => {
                    setImageLoaded(true);
                }}
            />

            <PageLoadingSpinner
                className={`transition-opacity duration-1000 ${
                    imageLoaded ? "opacity-0" : "opacity-100"
                }`}
            >
                Loading Post...
            </PageLoadingSpinner>

            <main
                className={`font-['Noto_Sans_KR'] dark:text-default-7 text-default-1-dark 
                h-full overflow-x-clip ${props.className}`}
            >
                {/* Content body */}
                <div className="absolute w-full h-[90%] overflow-hidden mask-bottom">
                    <div
                        ref={coverRef}
                        className={`h-full transition-opacity delay-[1000ms] duration-[1000ms] 
                            bg-center bg-cover ${
                                imageLoaded
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                        style={{
                            backgroundImage: `url(${coverImageUrl})`,
                        }}
                    />
                </div>

                <div className="absolute w-full h-[70%] flex items-center">
                    <h1
                        className={`w-full 
                        text-slate-100 dark:text-default-6 text-xl md:text-3xl text-pretty text-center font-medium
                        bg-stone-500/35 dark:bg-stone-800/60 backdrop-blur-md transition-opacity delay-[2000ms] duration-[1000ms] ${
                            titleOnCover && "p-3 sm:p-5"
                        } ${
                            imageLoaded
                                ? "opacity-100"
                                : "opacity-0"
                        }`}
                    >
                        {titleOnCover}
                    </h1>
                </div>

                <div className="h-[60%]" />

                <div className="bg-default-2 dark:bg-[#101010]">
                    <div
                        className={`transition-opacity delay-[1000ms] duration-[1000ms] ${
                            imageLoaded
                                ? "opacity-100 translate-y-[0]"
                                : "opacity-0 translate-y-[3000px]"
                        }`}
                    >
                        <section ref={articleRef} className="min-h-[100vh]">
                            <Outlet />
                        </section>

                        <Footer />
                    </div>
                </div>
            </main>
        </>
    );
};

export default Layout;
