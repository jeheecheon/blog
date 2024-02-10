import { Link } from "react-router-dom";

import PostCard from "@/common/components/post/PostCard"
import PostInfo from "@/common/types/PostInfo";
import { convertStringDateIntoDate, createSlug } from "@/common/utils/post";
import { PromiseAwaiter } from "@/common/utils/promiseWrapper";

interface PostsProps {
  postsAwaiter: PromiseAwaiter;
}

const Posts: React.FC<PostsProps> = ({ postsAwaiter }) => {
  const posts = postsAwaiter.Await() as PostInfo[]
  convertStringDateIntoDate(posts);
  
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
