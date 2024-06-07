import Button from "@/blog/_components/Button";
import { image, url } from "@/_utils/siteInfo";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

const Root = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/blog/recent-posts/pages/1");
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
                <meta property="og:image" content={image} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="jeheecheon" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="og:url" content={url} />
                <meta name="twitter:title" content="jeheecheon" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:description" content="Jehee's Tech blog" />
                <meta name="twitter:image" content={image} />
            </Helmet>

            <div
                className="w-full h-[100dvh] flex flex-col justify-center items-center gap-7
            text-default-1-dark"
            >
                <div>페이지 공사중...</div>
                <div>포트폴리오 요약 페이지</div>
                <Button className="">
                    <Link to="/blog">블로그로 가기</Link>
                </Button>
            </div>

            <Outlet />
        </>
    );
};

export default Root;
