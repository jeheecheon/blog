import { Link, useLoaderData } from "react-router-dom";

import PostCard from "@/pages/blog/posts/page/components/PostCard"
import post from "@/common/types/post";

const Posts = () => {
  const posts = useLoaderData() as post[];

  return (
    <div className="flex flex-col items-center mx-3 mb-5">
      <h1 className="inline-block uppercase max-w-[800px] w-full text-3xl font-medium text-sky-700 
      mt-[60px] mb-[20px] text-left">
        Recently published
      </h1>
      <div className="flex flex-col items-center gap-[70px] w-full">
        {

          posts.map((p, idx) => (
            <Link
              to={`/blog/post/${p.id}`}
              key={idx}
              className="max-w-[800px] w-full"
            >
              <PostCard
                liked={false}
                title={p.title}
                content={p.content}
                uploadedAt={p.uploaded_at}
              >
                {p.content}
              </PostCard>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Posts;
