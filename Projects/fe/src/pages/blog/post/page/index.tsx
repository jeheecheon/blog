import { useLoaderData } from 'react-router-dom';

import ArticleViewWrapper from '@/common/components/post/ArticleViewWrapper';
import PostInfo from '@/common/types/PostInfo';
import PromiseWrapper from '@/common/utils/wrapPromise';
import { useIsMounted } from '@/common/hooks/useIsMounted';

const Post = () => {
    const post = useLoaderData() as PostInfo;
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
