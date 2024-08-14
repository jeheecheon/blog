import { Comment } from "@/post/_components/comment/Comment";
import CommentWriteArea from "@/post/_components/comment/CommentWriteArea";
import React from "react";
import { useComments } from "@/post/_hooks/useComments";
import LoadingSpinner from "@/_components/spinner/LoadingSpinner";
import ErrorMessageWrapper from "@/_components/error/ErrorMessageWrapper";

interface CommentsProps {
    postId: string;
}

const Comments: React.FC<CommentsProps> = React.memo(({ postId }) => {
    const { data, status, fetchStatus } = useComments();

    return (
        <>
            {status === "pending" && fetchStatus === "fetching" && (
                <LoadingSpinner>Loading Comments... 🐶</LoadingSpinner>
            )}

            {status === "success" && fetchStatus === "fetching" && (
                <LoadingSpinner>Refreshing Comments...</LoadingSpinner>
            )}

            {status === "success" && (
                <div className="w-full flex flex-col mb-4">
                    <div className="mb-2 border-b-2 pb-1 border-b-default-13 dark:border-b-default-18-dark">
                        <p className="pl-2 text-base md:text-xl text-orange-400 font-ligh">
                            {data.length} Comments
                        </p>
                    </div>

                    <CommentWriteArea
                        postId={postId}
                        className="mt-2 mb-[3.75rem]"
                    />

                    {data.map((comment) => (
                        <Comment
                            key={comment.Id}
                            comment={comment}
                            postId={postId}
                        />
                    ))}
                </div>
            )}

            {status === "error" && (
                <ErrorMessageWrapper>
                    Failed to fetch comments. Probably because the server is
                    currently down...🙄
                </ErrorMessageWrapper>
            )}
        </>
    );
});

export default Comments;
