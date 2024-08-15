import { Comment } from "@/post/_components/comment/Comment";
import CommentWriteArea from "@/post/_components/comment/CommentWriteArea";
import React from "react";
import { useComments } from "@/post/_hooks/useComments";
import ErrorMessageWrapper from "@/_components/error/ErrorMessageWrapper";
import CommentSkeleton from "@/post/_components/comment/CommentSkeleton";

interface CommentsProps {
    postId: string;
}

const Comments: React.FC<CommentsProps> = React.memo(({ postId }) => {
    const { data, status, fetchStatus } = useComments();

    return (
        <div className="mb-4">
            <div className="mb-2 border-b-2 pb-1 border-b-default-13 dark:border-b-default-18-dark">
                <p className="pl-2 text-base md:text-xl text-orange-400 font-ligh">
                    {data ? data.length : "0"} Comments
                </p>
            </div>

            <CommentWriteArea postId={postId} className="mt-2 mb-[2rem]" />

            {fetchStatus === "fetching" &&
                [...Array(3)].map((_, i) => <CommentSkeleton key={i} />)}

            {status === "success" &&
                data.map((comment) => (
                    <Comment
                        key={comment.Id}
                        comment={comment}
                        postId={postId}
                    />
                ))}

            {status === "error" && (
                <ErrorMessageWrapper>
                    Failed to fetch comments. Probably because the server is
                    currently down...🙄
                </ErrorMessageWrapper>
            )}
        </div>
    );
});

export default Comments;
