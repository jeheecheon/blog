import { useLoaderData } from 'react-router-dom';

import ArticleViewWrapper from '@/common/components/post/ArticleViewWrapper';
import PostInfo from '@/common/types/PostInfo';
import { useState } from 'react';
import { wrapPromise } from '@/common/utils/promiseWrapper';

const Post = () => {
    const post = useLoaderData() as PostInfo;
    const [commentsAwaiter, setCommentsAwaiter] = useState(wrapPromise(fetch(`/api/blog/post/${post.id}/comments`)))

    return (
        <ArticleViewWrapper
            post={post}
            commentsAwaiter={commentsAwaiter}
            setCommentsAwaiter={setCommentsAwaiter}
        />
    )
}

export default Post;
