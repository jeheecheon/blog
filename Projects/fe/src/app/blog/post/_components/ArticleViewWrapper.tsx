import React, { Suspense } from "react";
import ArticleLayout from "@/blog/post/_components/ArticleLayout";
import ArticleContent from "@/blog/post/_components/ArticleContent";
import ErrorBoundary from "@/_components/ErrorBoundary";
import Comments from "@/blog/posts/_components/Comments";

import { PostInfo } from "@/blog/_types/Post";
import { PromiseAwaiter } from "@/_utils/promiseWrapper";
import LoadingSpinner from "@/blog/_components/LoadingSpinner";
import ErrorMessageWrapper from "@/blog/_components/ErrorMessageWrapper";

interface ArticleViewWrapperProps {
    post: PostInfo;
    commentsAwaiter: PromiseAwaiter;
    refreshComments: () => void;
}

const ArticleViewWrapper: React.FC<ArticleViewWrapperProps> = React.memo(
    ({ post, commentsAwaiter, refreshComments }) => {
        return (
            <ArticleLayout>
                <ArticleContent post={post} />
                {/* <PostsPagination /> */}
                <div className="max-w-[1024px] w-full px-3">
                    <ErrorBoundary
                        fallback={
                            <ErrorMessageWrapper>
                                Something went wrong...!
                            </ErrorMessageWrapper>
                        }
                    >
                        <Suspense
                            fallback={
                                <LoadingSpinner>
                                    Comments Loading..!
                                </LoadingSpinner>
                            }
                        >
                            <Comments
                                className=""
                                postId={post.Id}
                                commentsAwaiter={commentsAwaiter}
                                refreshComments={refreshComments}
                            />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </ArticleLayout>
        );
    }
);

export default ArticleViewWrapper;
