import React, { Suspense } from 'react'
import ArticleLayout from '@/common/components/post/ArticleLayout'
import Article from '@/common/components/post/Article'
import PostsPagination from '@/common/components/post/PostsPagination'
import ErrorBoundary from '@/common/components/ErrorBoundary'
import Comments from '@/common/components/post/Comments'

import exampleImg from '@/common/assets/images/default/banner.jpg';
import PostInfo from '@/common/types/PostInfo'
import PromiseWrapper from '@/common/utils/wrapPromise'

interface ArticleViewWrapperProps {
    commentsPromise: PromiseWrapper,
    post: PostInfo
}

const ArticleViewWrapper: React.FC<ArticleViewWrapperProps> = ({
    commentsPromise,
    post
}) => {
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

export default ArticleViewWrapper