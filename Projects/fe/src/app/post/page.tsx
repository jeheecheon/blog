import { useLoaderData } from "react-router-dom";

import ArticleViewWrapper from "@/post/_components/ArticleViewWrapper";
import { PostInfo } from "@/_types/Post";
import { useEffect, useMemo, useState } from "react";
import {
    CreateDummyPromiseAwaiter,
    wrapPromise,
} from "@/_utils/promiseWrapper";

import { useSelector } from "react-redux";
import { RootState } from "@/_redux/store";
import { flattenOutCategoriesV2 } from "../_utils/category";
import { Helmet } from "react-helmet-async";

const Post = () => {
    const post = useLoaderData() as PostInfo;
    const fetchUrl = useMemo(
        () =>
            `${import.meta.env.VITE_SERVER_URL}/api/blog/post/${
                post.Id
            }/comments`,
        [post.Id]
    );

    const [commentsAwaiter, setCommentsAwaiter] = useState(
        CreateDummyPromiseAwaiter()
    );

    useEffect(() => {
        setCommentsAwaiter(
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

    const leafCategories = useSelector(
        (state: RootState) => state.category.leafCategories
    );
    const categories = useMemo(
        () =>
            flattenOutCategoriesV2(
                leafCategories.find(
                    (category) => category.Id === post.CategoryId
                )
            ),
        [leafCategories, post.CategoryId]
    );

    return (
        <>
            <ArticleViewWrapper
                post={post}
                commentsAwaiter={commentsAwaiter}
                refreshComments={() =>
                    setCommentsAwaiter(
                        wrapPromise(
                            fetch(fetchUrl, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem(
                                        "jwt"
                                    )}`,
                                },
                            })
                        )!
                    )
                }
            />

            <Helmet>
                <title>
                    {post.Title} | {import.meta.env.VITE_SITE_NAME}
                </title>
                <link rel="canonical" href={`${import.meta.env.VITE_CLIENT_URL}/post/${post.Id}`} />
                <meta name="description" content={post.Title} />
                <meta
                    name="keywords"
                    content={`jeheecheon, tech, blog, ${categories}`}
                />
                <meta name="author" content="jeheecheon" />/
                <meta property="og:title" content={`${post.Title} | ${name}`} />
                <meta property="og:description" content={post.Title} />
                <meta
                    property="og:image"
                    content={post.Cover ? post.Cover : import.meta.env.VITE_DEFAULT_COVER_IMAGE}
                />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="jeheecheon" />
                <meta property="og:locale" content="ko_KR" />
                <meta
                    property="og:url"
                    content={`${import.meta.env.VITE_CLIENT_URL}/post/${post.Id}`}
                />
                <meta
                    name="twitter:title"
                    content={`${post.Title} | ${name}`}
                />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:description" content={post.Title} />
                <meta name="twitter:image" content={import.meta.env.VITE_DEFAULT_COVER_IMAGE} />
            </Helmet>
        </>
    );
};

export default Post;
