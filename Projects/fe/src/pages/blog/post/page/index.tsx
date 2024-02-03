import { useLoaderData } from 'react-router-dom';

import ArticleViewWrapper from '@/common/components/post/ArticleViewWrapper';
import Post from '@/common/types/post';
import PromiseWrapper from '@/common/utils/wrapPromise';
import { useIsMounted } from '@/common/hooks/useIsMounted';

const Post = () => {
    const post = useLoaderData() as Post;
    const commentsPromise: PromiseWrapper = new PromiseWrapper()
    const isMounted = useIsMounted();

    if (isMounted === false)
        commentsPromise.wrapPromise(fetch(`/api/blog/post/${post.id}/comments`));

    return (
        <ArticleViewWrapper
            post={post}
            commentsPromise={commentsPromise}
        />
    )
}

export default Post;
