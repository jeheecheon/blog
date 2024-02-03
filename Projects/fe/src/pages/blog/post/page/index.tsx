import Comments from '@/common/components/post/Comments'
import Article from '@/common/components/post/Article';
import PostsPagination from '@/common/components/post/PostsPagination';
import ArticleLayout from '@/common/components/post/ArticleLayout';

import exampleImg from '@/common/assets/images/default/banner.jpg';
import { useLoaderData } from 'react-router-dom';
import Post from '@/common/types/post';
import { Suspense } from 'react';
import ErrorBoundary from '@/common/components/ErrorBoundary';
import wrapPromise from '@/common/utils/wrapPromise';
import PromiseWrapper from '@/common/types/PromiseWrapper';

const Post = () => {
    const post = useLoaderData() as Post;
    const commentsPromise: PromiseWrapper = wrapPromise(fetch(`/api/blog/post/${post.id}/comments`, {
        credentials: "same-origin",
    }));

    return (
        <ArticleLayout className='flex flex-col items-center relative -top-[150px] z-10'>
            <Article
                liked={false}
                headerImage={exampleImg}
                publisedDate={post.uploaded_at}
                categories={['Algorithm', 'DP']}>
                {post.content}
            </Article>
            <PostsPagination />
            <ErrorBoundary fallback={<div>Something went wrong...!</div>}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Comments
                        className='px-2 relative top-[75px]'
                        id={post.id}
                        commentsPromise={commentsPromise}
                    />
                </Suspense>
            </ErrorBoundary>
        </ArticleLayout>
    )
}

export default Post;
