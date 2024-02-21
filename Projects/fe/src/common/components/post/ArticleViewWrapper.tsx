import React, { Suspense } from 'react'
import ArticleLayout from '@/common/components/post/ArticleLayout'
import ArticleContent from '@/common/components/post/ArticleContent'
import ErrorBoundary from '@/common/components/error/ErrorBoundary'
import Comments from '@/common/components/post/Comments'

import { PostInfo } from '@/common/types/Post'
import { PromiseAwaiter } from '@/common/utils/promiseWrapper'
import LoadingSpinner from '../LoadingSpinner'
import ErrorMessageWrapper from '../ErrorMessageWrapper'

interface ArticleViewWrapperProps {
    post: PostInfo;
    commentsAwaiter: PromiseAwaiter;
    refreshComments: () => void;
}

const ArticleViewWrapper: React.FC<ArticleViewWrapperProps> = React.memo(({
    post,
    commentsAwaiter,
    refreshComments
}) => {
    return (
        <ArticleLayout>
            <ArticleContent
                post={post}
            />
            {/* <PostsPagination /> */}
            <div className='max-w-[1024px] w-full px-2 relative top-[75px]'>
                <ErrorBoundary fallback={<ErrorMessageWrapper>Something went wrong...!</ErrorMessageWrapper>}>
                    <Suspense fallback={<LoadingSpinner>Comments Loading..!</LoadingSpinner>}>
                        <Comments
                            className=''
                            postId={post.Id}
                            commentsAwaiter={commentsAwaiter}
                            refreshComments={refreshComments}
                        />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </ArticleLayout>
    )
});

export default ArticleViewWrapper