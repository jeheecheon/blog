import Button from "@/common/components/Button";
import { url } from "@/common/utils/siteInfo";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Blog = () => {
  return (<>
    <section className="w-full min-h-screen flex flex-col items-center">
      <span className="text-4xl italic my-5 font-bold">
        페이지 공사 중...
      </span>
      <Button>
        <Link to="/blog/recent-posts/pages/1" className="mt-5 pointer-events-auto ">
          최근 게시물 보러 가기~
        </Link>
      </Button>
    </section>

    <Helmet>
      <title>blog | jeheecheon</title>
      <link rel="canonical" href={`${url}/blog/`} />
      <meta name="description" content='blog' />
      <meta name="keywords" content='jeheecheon, blog, tech' />

      <meta property="og:url" content={`${url}/blog`} />

      <meta name="twitter:title" content="blog | jeheecheon" />
    </Helmet>
  </>
  );
}

export default Blog;
