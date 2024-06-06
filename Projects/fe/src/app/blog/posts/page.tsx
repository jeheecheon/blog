import { Link } from "react-router-dom";

import PostCard from "@/blog/posts/_components/PostCard";
import { PostInfo } from "@/blog/_types/Post";
import {
    convertStringIntoDate,
    createSlug,
    sortPostsByUploadedAt,
} from "@/blog/_utils/post";
import { PromiseAwaiter } from "@/_utils/promiseWrapper";
import React, { useMemo } from "react";

interface PostsProps {
    postsAwaiter: PromiseAwaiter;
}

const Posts: React.FC<PostsProps> = React.memo(({ postsAwaiter }) => {
    const posts = postsAwaiter.Await() as PostInfo[];
    const sortedPosts = useMemo(() => {
        return sortPostsByUploadedAt(
            convertStringIntoDate([...posts]) as PostInfo[]
        ) as PostInfo[];
    }, [posts]);

    return (
        <nav className="flex flex-col items-center mb-5 gap-[40px] w-full">
            {sortedPosts.map((p) => (
                <Link
                    to={`/blog/post/${p.Id}/${createSlug(p.Title)}`}
                    key={p.Id}
                    className="max-w-[800px] w-full"
                    preventScrollReset={false}
                >
                    <PostCard post={p} />
                </Link>
            ))}
        </nav>
    );
});

export default Posts;
