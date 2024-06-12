import Button from "@/blog/_components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { defaultCoverImage, url } from "@/_utils/siteInfo";
import { Helmet } from "react-helmet-async";

const Blog = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/blog/recent-posts/pages/1");
    }, []);

    return (
        <>
            <section className="w-full flex flex-col items-center gap-5 min-h-[40dvh]">
                <span className="text-4xl">홈 페이지 공사 중...</span>
                <Button className="">
                    <Link
                        to="/blog/recent-posts/pages/1"
                        className="mt-5 pointer-events-auto "
                    >
                        최근 게시물 보기
                    </Link>
                </Button>
            </section>

            {/* Business logic */}
            <Helmet>
                <title>blog | jeheecheon</title>

                <link rel="canonical" href={`${url}/blog/`} />

                <meta name="description" content="blog" />
                <meta name="keywords" content="jeheecheon, blog, tech" />
                <meta name="author" content="jeheecheon" />

                <meta property="og:title" content="jeheecheon" />
                <meta property="og:description" content="Jehee's Tech blog" />
                <meta property="og:image" content={defaultCoverImage} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="jeheecheon" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="og:url" content={`${url}/blog`} />

                <meta name="twitter:title" content="blog | jeheecheon" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:description" content="Jehee's Tech blog" />
                <meta name="twitter:image" content={defaultCoverImage} />
            </Helmet>
        </>
    );
};

export default Blog;
