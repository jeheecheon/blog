import React, { Suspense } from "react";
import ArticleLayout from "@/post/_components/article/ArticleLayout";
import ArticleContent from "@/post/_components/article/ArticleContent";
import ErrorBoundary from "@/_components/error/ErrorBoundary";
import Comments from "@/posts/_components/Comments";

import { PostInfo } from "@/_types/Post";
import { PromiseAwaiter } from "@/_utils/promiseWrapper";
import LoadingSpinner from "@/_components/spinner/LoadingSpinner";
import ErrorMessageWrapper from "@/_components/error/ErrorMessageWrapper";

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
                <div className="max-w-[56.25rem] w-full px-3 md:px-5">
                    <ErrorBoundary
                        fallback={
                            <ErrorMessageWrapper>
                                Failed to load comments for this post...
                            </ErrorMessageWrapper>
                        }
                    >
                        <Suspense
                            fallback={
                                <LoadingSpinner>
                                    Loading Comments... 🐶
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
