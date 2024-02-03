import { useLoaderData } from 'react-router-dom';

import Post from '@/common/types/post';
import wrapPromise from '@/common/utils/wrapPromise';
import PromiseWrapper from '@/common/types/PromiseWrapper';
import ArticleViewWrapper from '@/common/components/post/ArticleViewWrapper';

const Post = () => {
    const post = useLoaderData() as Post;
    const commentsPromise: PromiseWrapper = wrapPromise(fetch(`/api/blog/post/${post.id}/comments`));

    return (
        <ArticleViewWrapper
            post={post}
            commentsPromise={commentsPromise}
        />
    )
}

export default Post;
