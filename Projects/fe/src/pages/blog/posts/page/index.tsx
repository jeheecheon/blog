import { Link } from "react-router-dom";

import PostCard from "@/common/components/post/PostCard"
import { PostInfo } from "@/common/types/Post";
import { convertStringIntoDate, createSlug, sortPostsByUploadedAt } from "@/common/utils/post";
import { PromiseAwaiter } from "@/common/utils/promiseWrapper";
import React, { useMemo } from "react";

interface PostsProps {
  postsAwaiter: PromiseAwaiter;
}

const Posts: React.FC<PostsProps> = React.memo(({ postsAwaiter }) => {
  const posts = postsAwaiter.Await() as PostInfo[]
  const sortedPosts = useMemo(() => {
    return sortPostsByUploadedAt(convertStringIntoDate([...posts]) as PostInfo[]) as PostInfo[];
  }, [posts])

  return (
    <nav className="flex flex-col items-center mb-5 gap-[70px] w-full">
      {
        sortedPosts.map((p) => (
          <Link
            to={`/blog/post/${p.Id}/${createSlug(p.Title)}`}
            key={p.Id}
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
});

export default Posts;
