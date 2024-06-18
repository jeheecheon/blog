import Button from "@/blog/_components/Button";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { defaultCoverImage, url } from "@/_utils/siteInfo";
import { Helmet } from "react-helmet-async";

const Root = () => {
    // const navigate = useNavigate();

    useEffect(() => {
        // navigate("/blog/recent-posts/pages/1");
    }, []);

    return (
        <>
            <Helmet>
                <title>jeheecheon</title>
                <link rel="canonical" href={url} />
                <meta name="description" content="Jehee's Tech blog" />
                <meta name="keywords" content="tech, blog, jeheecheon" />
                <meta name="author" content="jeheecheon" />/
                <meta property="og:title" content="jeheecheon" />
                <meta property="og:description" content="Jehee's Tech blog" />
                <meta property="og:image" content={defaultCoverImage} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="jeheecheon" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="og:url" content={url} />
                <meta name="twitter:title" content="jeheecheon" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:description" content="Jehee's Tech blog" />
                <meta name="twitter:image" content={defaultCoverImage} />
            </Helmet>

            <div className="w-full h-[100dvh] flex justify-center items-center">
                <div
                    className="flex flex-col items-center 
                    text-default-15-dark dark:text-default-5"
                >
                    <p className="w-fit">포트폴리오 요약 페이지</p>
                    <p className="w-fit">페이지 공사중...</p>

                    <Button className="mt-3 font-semibold">
                        <Link to="/blog">블로그로 가기</Link>
                    </Button>
                </div>
            </div>

            <Outlet />
        </>
    );
};

export default Root;
