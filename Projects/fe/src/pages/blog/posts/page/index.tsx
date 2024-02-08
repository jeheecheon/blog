import { Link, useLoaderData } from "react-router-dom";

import PostCard from "@/pages/blog/posts/page/components/PostCard"
import Post from "@/common/types/PostInfo";
import { createSlug } from "@/common/utils/post";

const Posts = () => {
  const posts = useLoaderData() as Post[];

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
              to={`/blog/post/${p.Id}/${createSlug(p.Title)}`}
              key={idx}
              className="max-w-[800px] w-full"
              preventScrollReset={false}
            >
              <PostCard
                post={p}
              />
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Posts;
