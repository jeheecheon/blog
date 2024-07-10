import React from "react";
import { Link, useParams } from "react-router-dom";

import PostCard from "@/posts/_components/PostCard";
import { createSlug } from "@/_utils/post";
import MetaData from "@/posts/metadata";
import { getPostsQueryOption } from "@/posts/_hooks/usePosts";
import LoadingSpinner from "@/_components/spinner/LoadingSpinner";
import ErrorMessageWrapper from "@/_components/error/ErrorMessageWrapper";
import { useQueries } from "@tanstack/react-query";
import { getMaxPageNumQueryOption } from "@/_hooks/useMaxPageNum";

const PostsPage: React.FC = () => {
    const { category, page } = useParams();
    const [postsQuery, maxPageNumQuery] = useQueries({
        queries: [
            getPostsQueryOption(category, page),
            getMaxPageNumQueryOption(category),
        ],
    });

    return (
        <>
            <div className="mx-auto max-w-[800px]">
                <h1 className="w-full text-left text-balance animate-fade-in transition-opacity duration-1000">
                    <p className="text-gray-500/85 dark:text-default-8 text-sm md:text-base font-semibold">
                        {category !== "recently-published"
                            ? "CATEGORY"
                            : "POSTS"}
                    </p>
                    <p className="text-orange-400/70 dark:text-orange-400/90 text-lg sm:text-xl md:text-2xl uppercase font-medium">
                        {category}
                    </p>
                </h1>

                <nav
                    className="flex flex-col items-center mt-[1.875rem] md:mt-[3.125rem] w-full
                    transition-opacity duration-1000 animate-fade-in-bouncing"
                >
                    {postsQuery.isPending && maxPageNumQuery.isPending && (
                        <LoadingSpinner>Posts Loading...</LoadingSpinner>
                    )}

                    {postsQuery.isSuccess &&
                        maxPageNumQuery.isSuccess &&
                        !!postsQuery.data &&
                        postsQuery.data.map((p) => (
                            <Link
                                to={`/post/${p.Id}/${createSlug(p.Title)}`}
                                key={p.Id}
                                className="w-full border-b-[0.0625rem] dark:border-default-12-dark border-default-10 group"
                                preventScrollReset={false}
                            >
                                <PostCard post={p} />
                            </Link>
                        ))}

                    {postsQuery.isError ||
                        (maxPageNumQuery.isError && (
                            <ErrorMessageWrapper>
                                Failed to fetch posts. Probably because the
                                server is currently down...🙄
                            </ErrorMessageWrapper>
                        ))}
                </nav>
            </div>

            <MetaData />
        </>
    );
};

export default PostsPage;
