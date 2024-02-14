import React, { Suspense } from 'react'
import ArticleLayout from '@/common/components/post/ArticleLayout'
import ArticleContent from '@/common/components/post/ArticleContent'
import PostsPagination from '@/common/components/post/PostsPagination'
import ErrorBoundary from '@/common/components/error/ErrorBoundary'
import Comments from '@/common/components/post/Comments'

import { PostInfo } from '@/common/types/Post'
import { PromiseAwaiter } from '@/common/utils/promiseWrapper'
import CommentsLoadingSpinner from './CommentsLoadingSpinner'
import ErrorMessageWrapper from '../ErrorMessageWrapper'

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
            <ArticleContent
                post={post}
            />
            <PostsPagination />
            <div className='max-w-[1024px] w-full px-2 relative top-[75px]'>
                <ErrorBoundary fallback={<ErrorMessageWrapper>Something went wrong...!</ErrorMessageWrapper>}>
                    <Suspense fallback={<CommentsLoadingSpinner />}>
                        <Comments
                            className=''
                            postId={post.Id}
                            commentsAwaiter={commentsAwaiter}
                            setCommentsAwaiter={setCommentsAwaiter}
                        />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </ArticleLayout>
    )
});

export default ArticleViewWrapper