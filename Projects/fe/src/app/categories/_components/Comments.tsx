import { Comment } from "@/posts/_components/comment/Comment";
import CommentWriteArea from "@/posts/_components/comment/CommentWriteArea";
import React from "react";
import { useComments } from "@/posts/_hooks/useComments";
import ErrorMessageWrapper from "@/_components/error/ErrorMessageWrapper";
import CommentSkeleton from "@/posts/_components/comment/CommentSkeleton";

interface CommentsProps {
    postId: string;
    className?: string;
}

const Comments: React.FC<CommentsProps> = React.memo(
    ({ postId, className }) => {
        const { data, status, fetchStatus } = useComments();

        return (
            <div className={`mb-7 ${className}`}>
                <div className="mb-2 border-b-[0.09rem] pb-1 border-b-default-9 dark:border-b-default-9-dark">
                    <p className="pl-2 text-base md:text-lg text-orange-400 font-normal md:font-light dark:font-normal">
                        {data ? data.length : "0"} Comments
                    </p>
                </div>

                <CommentWriteArea postId={postId} className="mt-2 mb-[1rem]" />

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
    }
);

export default Comments;
