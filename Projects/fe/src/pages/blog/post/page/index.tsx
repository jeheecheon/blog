import { useLoaderData } from 'react-router-dom';

import ArticleViewWrapper from '@/common/components/post/ArticleViewWrapper';
import PostInfo from '@/common/types/PostInfo';
import PromiseWrapper from '@/common/utils/wrapPromise';
import { useEffect } from 'react';

const Post = () => {
    const post = useLoaderData() as PostInfo;
    const commentsPromise: PromiseWrapper = new PromiseWrapper()

    useEffect(() => {
        commentsPromise.wrapPromise(fetch(`/api/blog/post/${post.id}/comments`));
    }, []);
    
    return (
        <ArticleViewWrapper
            post={post}
            commentsPromise={commentsPromise}
        />
    )
}

export default Post;
