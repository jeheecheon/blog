import Button from "@/_components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const Blog = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/categories/recently-published/pages/1");
    }, []);

    return (
        <>
            <section className="w-full flex flex-col items-center gap-5">
                <span className="text-4xl">홈 페이지 공사 중...</span>
                <Button className="">
                    <Link
                        to="/categproes/recently-published/pages/1"
                        className="mt-5 pointer-events-auto "
                    >
                        최근 게시물 보기
                    </Link>
                </Button>
            </section>

            {/* Business logic */}
            <Helmet>
                <title>blog | jeheecheon</title>

                <link
                    rel="canonical"
                    href={`${import.meta.env.VITE_CLIENT_URL}`}
                />

                <meta name="description" content="blog" />
                <meta name="keywords" content="jeheecheon, blog, tech" />
                <meta name="author" content="jeheecheon" />

                <meta property="og:title" content="jeheecheon" />
                <meta property="og:description" content="Jehee's Tech blog" />
                <meta
                    property="og:image"
                    content={import.meta.env.VITE_DEFAULT_COVER_IMAGE}
                />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="jeheecheon" />
                <meta property="og:locale" content="ko_KR" />
                <meta
                    property="og:url"
                    content={`${import.meta.env.VITE_CLIENT_URL}`}
                />

                <meta name="twitter:title" content="blog | jeheecheon" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:description" content="Jehee's Tech blog" />
                <meta
                    name="twitter:image"
                    content={import.meta.env.VITE_DEFAULT_COVER_IMAGE}
                />
            </Helmet>
        </>
    );
};

export default Blog;
