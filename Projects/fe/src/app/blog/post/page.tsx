import { useLoaderData } from "react-router-dom";

import ArticleViewWrapper from "@/blog/post/_components/ArticleViewWrapper";
import { PostInfo } from "@/blog/_types/Post";
import { useEffect, useMemo, useState } from "react";
import {
    CreateDummyPromiseAwaiter,
    wrapPromise,
} from "@/_utils/promiseWrapper";
import { Helmet } from "react-helmet";
import { defaultCoverImage, name, url } from "@/_utils/siteInfo";

import { serverUrl } from "@/_utils/site";
import { useSelector } from "react-redux";
import { RootState } from "@/_redux/store";
import { flattenOutCategoriesV2 } from "../_utils/category";

const Post = () => {
    const post = useLoaderData() as PostInfo;
    const fetchUrl = useMemo(
        () => `${serverUrl}/api/blog/post/${post.Id}/comments`,
        [post.Id]
    );

    const [commentsAwaiter, setCommentsAwaiter] = useState(
        CreateDummyPromiseAwaiter()
    );

    useEffect(() => {
        setCommentsAwaiter(
            wrapPromise(fetch(fetchUrl, { credentials: "include" }))
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
                            fetch(fetchUrl, { credentials: "include" })
                        )!
                    )
                }
            />

            <Helmet>
                <title>
                    {post.Title} | {name}
                </title>
                <link rel="canonical" href={`${url}/blog/post/${post.Id}`} />
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
                    content={post.Cover ? post.Cover : defaultCoverImage}
                />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="jeheecheon" />
                <meta property="og:locale" content="ko_KR" />
                <meta
                    property="og:url"
                    content={`${url}/blog/post/${post.Id}`}
                />
                <meta
                    name="twitter:title"
                    content={`${post.Title} | ${name}`}
                />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:description" content={post.Title} />
                <meta name="twitter:image" content={defaultCoverImage} />
            </Helmet>
        </>
    );
};

export default Post;
