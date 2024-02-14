import { Link } from "react-router-dom";

import PostCard from "@/common/components/post/PostCard"
import { PostInfo } from "@/common/types/Post";
import { convertStringDateIntoDate, createSlug, sortPostsByUploadedAt } from "@/common/utils/post";
import { PromiseAwaiter } from "@/common/utils/promiseWrapper";

interface PostsProps {
  postsAwaiter: PromiseAwaiter;
}

const Posts: React.FC<PostsProps> = ({ postsAwaiter }) => {
  let posts = postsAwaiter.Await() as PostInfo[]
  convertStringDateIntoDate(posts);
  posts = sortPostsByUploadedAt(posts);

  return (
    <nav className="flex flex-col items-center mb-5 gap-[70px] w-full">
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
    </nav>
  )
}

export default Posts;
