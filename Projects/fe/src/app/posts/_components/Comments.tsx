import { Comment } from "@/post/_components/Comment";
import CommentWriteArea from "@/post/_components/CommentWriteArea";
import CommentInfo from "@/_types/Comment";
import { PromiseAwaiter } from "@/_utils/promiseWrapper";
import { convertStringDateIntoDate, sortComments } from "@/_utils/comment";
import React, { useMemo } from "react";

interface CommentsProps {
    className?: string;
    postId: string;
    commentsAwaiter: PromiseAwaiter;
    refreshComments: () => void;
}

const Comments: React.FC<CommentsProps> = React.memo(
    ({ className, postId, commentsAwaiter, refreshComments }) => {
        const sortedComments: CommentInfo[] = useMemo(() => {
            const awaitedComments: CommentInfo[] =
                commentsAwaiter.Await() as CommentInfo[];
            return sortComments(
                convertStringDateIntoDate(awaitedComments.map((c) => c))
            );
        }, [commentsAwaiter]);

        return (
            <div
                className={`w-full flex flex-col mb-4
                ${className}`}
            >
                <div className="mb-2 border-b-2 pb-1 border-b-default-13 dark:border-b-default-18-dark">
                    <p className="pl-2 text-base md:text-xl text-orange-400 font-ligh">
                        {sortedComments.length} Comments
                    </p>
                </div>

                <CommentWriteArea
                    postId={postId}
                    refreshComments={refreshComments}
                    className="mt-2 mb-[3.75rem]"
                />

                {sortedComments.map((comment) => (
                    <Comment
                        key={comment.Id}
                        comment={comment}
                        postId={postId}
                        refreshComments={refreshComments}
                    />
                ))}
            </div>
        );
    }
);

export default Comments;
