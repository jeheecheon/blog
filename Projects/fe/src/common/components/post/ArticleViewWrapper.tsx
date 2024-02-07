import React, { Suspense } from 'react'
import ArticleLayout from '@/common/components/post/ArticleLayout'
import Article from '@/common/components/post/Article'
import PostsPagination from '@/common/components/post/PostsPagination'
import ErrorBoundary from '@/common/components/ErrorBoundary'
import Comments from '@/common/components/post/Comments'

import PostInfo from '@/common/types/PostInfo'
import { PromiseAwaiter } from '@/common/utils/promiseWrapper'

interface ArticleViewWrapperProps {
    post: PostInfo;
    commentsAwaiter: PromiseAwaiter;
    setCommentsAwaiter: React.Dispatch<React.SetStateAction<PromiseAwaiter>>;
}

const ArticleViewWrapper: React.FC<ArticleViewWrapperProps> = React.memo(({
    post,
    commentsAwaiter,
    setCommentsAwaiter
}) => {
    return (
        <ArticleLayout className='flex flex-col items-center relative -top-[150px] z-10'>
            <Article
                post={post}
            />
            <PostsPagination />
            <ErrorBoundary fallback={<div>Something went wrong...!</div>}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Comments
                        className='px-2 relative top-[75px]'
                        postId={post.id}
                        commentsAwaiter={commentsAwaiter}
                        setCommentsAwaiter={setCommentsAwaiter}
                    />
                </Suspense>
            </ErrorBoundary>
        </ArticleLayout>
    )
});

export default ArticleViewWrapper