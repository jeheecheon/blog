import { useLoaderData } from 'react-router-dom';

import ArticleViewWrapper from '@/common/components/post/ArticleViewWrapper';
import { PostInfo } from '@/common/types/Post';
import React, { useEffect, useMemo, useState } from 'react';
import { CreateDummyPromiseAwaiter, wrapPromise } from '@/common/utils/promiseWrapper';
import { Helmet } from "react-helmet";
import { image, name, url } from '@/common/utils/siteInfo';
import { RootState } from '@/common/redux/store';
import { useSelector } from 'react-redux';
import { flattenOutCategoriesV2 } from '@/common/utils/category';

const Post = () => {
    const post = useLoaderData() as PostInfo;
    const fetchUrl = useMemo(
        () => `/api/blog/post/${post.Id}/comments`,
        [post.Id]
    );

    const [commentsAwaiter, setCommentsAwaiter] = useState(CreateDummyPromiseAwaiter())

    useEffect(() => {
        setCommentsAwaiter(wrapPromise(fetch(fetchUrl)));
    }, [fetchUrl])

    const leafCategories = useSelector((state: RootState) => state.category.leafCategories);
    const categories = useMemo(
        () => flattenOutCategoriesV2(leafCategories.find(category => category.Id === post.CategoryId)),
        [leafCategories, post.CategoryId]
    )

    return (
        <>
            <ArticleViewWrapper
                post={post}
                commentsAwaiter={commentsAwaiter}
                refreshComments={() => setCommentsAwaiter(wrapPromise(fetch(fetchUrl))!)}
            />

            <Helmet>
                <title>{post.Title} | {name}</title>
                <link rel="canonical" href={`${url}/blog/post/${post.Id}`} />
                <meta name="description" content={post.Title} />
                <meta name="keywords" content={`jeheecheon, tech, blog, ${categories}`} />

                <meta property="og:title" content={`${post.Title} | ${name}`} />
                <meta property="og:description" content={post.Title} />
                <meta property="og:image" content={post.Cover ? post.Cover : image} />
                <meta property="og:url" content={`${url}/blog/post/${post.Id}`} />

                <meta name="twitter:title" content={`${post.Title} | ${name}`} />
                <meta name="twitter:description" content={post.Title} />
            </Helmet>
        </>
    )
};

export default Post;
