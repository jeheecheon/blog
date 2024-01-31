import { Link } from "react-router-dom";

const Blog = () => {
  return (<>
    <div className="w-screen h-screen flex flex-col items-center">
      <span className="text-4xl text-slate-700 italic my-5 font-bold">
        페이지 공사 중...
      </span>
      <Link to="/blog/recent-posts/pages/1" className="mt-5 pointer-events-auto">
        Latest posts
      </Link>
    </div>
  </>
  );
}

export default Blog;
