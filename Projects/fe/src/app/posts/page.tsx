import { Link } from "react-router-dom";

import PostCard from "@/posts/_components/PostCard";
import { PostInfo } from "@/_types/Post";
import {
    convertStringIntoDate,
    createSlug,
    sortPostsByUploadedAt,
} from "@/_utils/post";
import { PromiseAwaiter } from "@/_utils/promiseWrapper";
import React, { useMemo } from "react";

interface PostsProps {
    postsAwaiter: PromiseAwaiter;
    className?: string;
}

const Posts: React.FC<PostsProps> = React.memo(
    ({ postsAwaiter, className }) => {
        const posts = postsAwaiter.Await() as PostInfo[];

        const sortedPosts = useMemo(() => {
            return sortPostsByUploadedAt(
                convertStringIntoDate([...posts]) as PostInfo[]
            ) as PostInfo[];
        }, [posts]);

        return (
            <nav
                className={`flex flex-col items-center mt-[1.875rem] md:mt-[3.125rem] w-full
                    transition-opacity duration-1000 animate-fade-in-bouncing ${className}`}
            >
                {sortedPosts.map((p) => (
                    <Link
                        to={`/post/${p.Id}/${createSlug(p.Title)}`}
                        key={p.Id}
                        className="w-full border-b-[0.0625rem] dark:border-default-12-dark border-default-10 group"
                        preventScrollReset={false}
                    >
                        <PostCard post={p} />
                    </Link>
                ))}
            </nav>
        );
    }
);

export default Posts;
