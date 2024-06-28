import {
    CreateDummyPromiseAwaiter,
    wrapPromise,
} from "@/_utils/promiseWrapper";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorBoundary from "@/_components/ErrorBoundary";
import Posts from "@/posts/page";
import ErrorMessageWrapper from "@/_components/ErrorMessageWrapper";
import LoadingSpinner from "@/_components/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const PostsWrapper = () => {
    const { category, page } = useParams();

    const fetchUrl = useMemo(() => {
        if (category === undefined)
            return `${
                import.meta.env.VITE_SERVER_URL
            }/api/blog/recent-posts/pages/${page}`;
        else
            return `${
                import.meta.env.VITE_SERVER_URL
            }/api/blog/categories/${category}/pages/${page}`;
    }, [category, page]);

    const [postsAwaiter, setPostsAwaiter] = useState(
        CreateDummyPromiseAwaiter()
    );

    useEffect(() => {
        setPostsAwaiter(
            wrapPromise(
                fetch(fetchUrl, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "jwt"
                        )}`,
                    },
                })
            )
        );
    }, [fetchUrl]);

    return (
        <>
            <div className="mx-auto max-w-[800px]">
                <h1 className="w-full text-left text-balance animate-fade-in transition-opacity duration-1000">
                    <p className="text-gray-500/85 dark:text-default-8 text-sm md:text-base font-[600]">
                        {category ? "CATEGORY" : "POSTS"}
                    </p>
                    <p className="text-orange-400/70 dark:text-orange-400/90 text-xl sm:text-2xl md:text-3xl uppercase font-[600]">
                        {category ? category : "recently published"}
                    </p>
                </h1>
                <ErrorBoundary
                    fallback={
                        <ErrorMessageWrapper>
                            404 Not Found Page
                        </ErrorMessageWrapper>
                    }
                >
                    <Suspense
                        fallback={
                            <LoadingSpinner>Posts Loading..!</LoadingSpinner>
                        }
                    >
                        <Posts postsAwaiter={postsAwaiter} />
                    </Suspense>
                </ErrorBoundary>

                {/* Pagination is not implemented yet. It will be implemented in the future. */}
                <div className="h-[3.125rem]"></div>
            </div>

            {/* Business logic */}
            <Helmet>
                <title>
                    {category ? category : "Recent posts"} |{" "}
                    {import.meta.env.VITE_SITE_NAME}
                </title>
                <link
                    rel="canonical"
                    href={`${import.meta.env.VITE_CLIENT_URL}/${
                        category ? "categories/" + category : "recent-posts"
                    }/pages/${page}`}
                />
                <meta
                    name="description"
                    content={`${
                        category ? category + " posts" : "Recent posts"
                    }`}
                />
                <meta
                    name="keywords"
                    content={`jeheecheon, tech, blog, posts, ${category}`}
                />
                <meta name="author" content="jeheecheon" />

                <meta
                    property="og:title"
                    content={`${
                        category ? category + " posts" : "Recent posts"
                    } | ${name}`}
                />
                <meta
                    property="og:description"
                    content={`${
                        category ? category + " posts" : "Recent posts"
                    } | ${name}`}
                />
                <meta
                    property="og:image"
                    content={import.meta.env.VITE_DEFAULT_COVER_IMAGE}
                />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="jeheecheon" />
                <meta property="og:locale" content="ko_KR" />
                <meta
                    property="og:url"
                    content={`${import.meta.env.VITE_CLIENT_URL}/${
                        category ? "categories/" + category : "recent-posts"
                    }/pages/${page}`}
                />

                <meta
                    name="twitter:title"
                    content={
                        category ? category : "Recent posts" + ` | ${name}`
                    }
                />
                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:description"
                    content={`${
                        category ? category + " posts" : "Recent posts"
                    }`}
                />
                <meta
                    name="twitter:image"
                    content={import.meta.env.VITE_DEFAULT_COVER_IMAGE}
                />
            </Helmet>
        </>
    );
};

export default PostsWrapper;
