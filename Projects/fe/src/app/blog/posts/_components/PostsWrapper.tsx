import {
    CreateDummyPromiseAwaiter,
    wrapPromise,
} from "@/_utils/promiseWrapper";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorBoundary from "../../../_components/ErrorBoundary";
import Posts from "@/blog/posts/page";
import ErrorMessageWrapper from "@/blog/_components/ErrorMessageWrapper";
import { Helmet } from "react-helmet";
import { defaultCoverImage, name, url } from "@/_utils/siteInfo";
import LoadingSpinner from "@/blog/_components/LoadingSpinner";

const PostsWrapper = () => {
    const { category, page } = useParams();
    // const loaderData = useLoaderData();

    const fetchUrl = useMemo(() => {
        if (category === undefined)
            return `/api/blog/recent-posts/pages/${page}`;
        else return `/api/blog/categories/${category}/pages/${page}`;
    }, [category, page]);

    const [postsAwaiter, setPostsAwaiter] = useState(
        CreateDummyPromiseAwaiter()
    );

    useEffect(() => {
        setPostsAwaiter(wrapPromise(fetch(fetchUrl)));
    }, [fetchUrl]);

    return (
        <>
            <div className="mx-auto max-w-[800px] min-h-[35vh]">
                <h1 className="w-full text-left text-balance pt-[0px]">
                    <p className="text-gray-500/85 dark:text-default-8 text-sm md:text-base font-[600]">
                        {category ? "CATEGORY" : "POSTS"}
                    </p>
                    <p className="text-orange-400 text-xl sm:text-2xl md:text-3xl uppercase font-[600]">
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
                <div className="h-[50px]"></div>
            </div>

            {/* Business logic */}
            <Helmet>
                <title>
                    {category ? category : "Recent posts"} | {name}
                </title>
                <link
                    rel="canonical"
                    href={`${url}/blog/${
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
                <meta property="og:image" content={defaultCoverImage} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="jeheecheon" />
                <meta property="og:locale" content="ko_KR" />
                <meta
                    property="og:url"
                    content={`${url}/blog/${
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
                <meta name="twitter:image" content={defaultCoverImage} />
            </Helmet>
        </>
    );
};

export default PostsWrapper;
