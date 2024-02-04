import { useLoaderData } from 'react-router-dom';

import ArticleViewWrapper from '@/common/components/post/ArticleViewWrapper';
import PostInfo from '@/common/types/PostInfo';

const Post = () => {
    const post = useLoaderData() as PostInfo;
    return (
        <ArticleViewWrapper
            post={post}
        />
    )
}

export default Post;
