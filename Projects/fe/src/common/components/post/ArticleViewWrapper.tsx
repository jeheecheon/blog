import React, { Suspense } from 'react'
import ArticleLayout from './ArticleLayout'
import Article from './Article'
import PostsPagination from './PostsPagination'
import ErrorBoundary from '../ErrorBoundary'
import Comments from './Comments'

import exampleImg from '@/common/assets/images/default/banner.jpg';
import PromiseWrapper from '@/common/types/PromiseWrapper'
import Post from '@/common/types/post'

interface ArticleViewWrapperProps {
    commentsPromise: PromiseWrapper,
    post: Post
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