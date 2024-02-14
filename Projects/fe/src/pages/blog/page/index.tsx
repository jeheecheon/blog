import Button from "@/common/components/Button";
import { Link } from "react-router-dom";

const Blog = () => {
  return (<>
    <section className="w-full min-h-screen flex flex-col items-center">
      <span className="text-4xl text-slate-700 italic my-5 font-bold">
        페이지 공사 중...
      </span>
      <Button>
        <Link to="/blog/recent-posts/pages/1" className="mt-5 pointer-events-auto">
          최근 게시물 보러 가기~
        </Link>
      </Button>
    </section>
  </>
  );
}

export default Blog;
