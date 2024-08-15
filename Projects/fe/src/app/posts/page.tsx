import React from "react";
import { Link, useParams } from "react-router-dom";

import PostCard from "@/posts/_components/PostCard";
import { createSlug } from "@/_utils/post";
import MetaData from "@/posts/metadata";
import { getPostsQueryOption } from "@/posts/_hooks/usePosts";
import ErrorMessageWrapper from "@/_components/error/ErrorMessageWrapper";
import { useQueries } from "@tanstack/react-query";
import { getMaxPageNumQueryOption } from "@/_hooks/useMaxPageNum";
import { getLeafCategoryQueryOption } from "@/_hooks/useLeafCategories";
import PageNav from "@/posts/_components/PageNav";
import PostCardSkeleton from "./_components/PostCardSkeleton";
import PageLoadingSpinner from "@/_components/spinner/PageLoadingSpinner";
import PageNavSkeleton from "./_components/PageNavSkeleton";

const PostsPage: React.FC = () => {
    const { category, page } = useParams();
    const [postsQuery, maxPageNumQuery, leafCategoriesQuery] = useQueries({
        queries: [
            getPostsQueryOption(category, page),
            getMaxPageNumQueryOption(category),
            getLeafCategoryQueryOption(),
        ],
    });

    const isPending =
        postsQuery.isPending ||
        maxPageNumQuery.isPending ||
        leafCategoriesQuery.isPending;

    const isSuccess =
        postsQuery.isSuccess &&
        maxPageNumQuery.isSuccess &&
        leafCategoriesQuery.isSuccess;

    return (
        <>
            <div className="mx-auto max-w-[800px]">
                <h1
                    className="w-fit text-left text-balance animate-fade-in transition-opacity duration-1000 
                    pl-4 sm:pl-0"
                >
                    <p className="text-gray-500/90 dark:text-default-10 text-sm md:text-base font-semibold w-fit">
                        {category !== "recently-published"
                            ? "CATEGORY"
                            : "POSTS"}
                    </p>
                    <p className="text-orange-400 dark:text-orange-400/90 text-xl md:text-2xl uppercase font-medium w-fit">
                        {category} 👨🏻‍💻
                    </p>
                </h1>

                <nav
                    className="flex flex-col items-center mt-[4rem] md:mt-[6rem] w-full
                    transition-opacity duration-1000"
                >
                    {isPending ? (
                        <>
                            <PageLoadingSpinner>
                                Loading Posts...
                            </PageLoadingSpinner>

                            {[...Array(3)].map((_, i) => (
                                <PostCardSkeleton
                                    key={i}
                                    className="last-of-type:border-b-0 border-b-[0.0925rem]
                                    border-b-gray-500/10 dark:border-b-gray-200/10 first-of-type:pt-0 py-10"
                                />
                            ))}

                            <PageNavSkeleton className="mt-5 mb-10" />
                        </>
                    ) : isSuccess ? (
                        <>
                            {!!postsQuery.data &&
                                postsQuery.data.map((p) => (
                                    <Link
                                        to={`/post/${p.Id}/${createSlug(
                                            p.Title
                                        )}`}
                                        key={p.Id}
                                        className="w-full animate-fade-in-bouncing 
                                        dark:border-default-12-dark border-b-default-10 last-of-type:border-b-0 border-b-[0.0925rem]
                                        first-of-type:pt-0 py-10 pointer-events-none"
                                        preventScrollReset={false}
                                    >
                                        <PostCard post={p} />
                                    </Link>
                                ))}

                            <PageNav className="mt-5 mb-10" />
                        </>
                    ) : (
                        <ErrorMessageWrapper>
                            Failed to fetch posts. Probably because the server
                            is currently down...🙄
                        </ErrorMessageWrapper>
                    )}
                </nav>
            </div>

            <MetaData />
        </>
    );
};

export default PostsPage;
