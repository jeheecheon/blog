import defaultAvatar from "@/_assets/images/avatar.png";
import CommentInfo from "@/_types/Comment";
import React, { useRef, useState } from "react";
import CommentWriteArea from "@/posts/_components/comment/CommentWriteArea";
import { getTimeAgo } from "@/_utils/comment";
import { useDispatch, useSelector } from "react-redux";
import LikeFilled from "@/posts/_assets/images/like-filled.svg?react";
import Like from "@/posts/_assets/images/like.svg?react";
import CommentSvg from "@/posts/_assets/images/comment.svg?react";

import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import { setIsSignInModalOpen } from "@/_redux/signInModalSlice";
import Avatar from "@/_components/ui/Avatar";
import ButtonInCommentBox from "@/posts/_components/comment/ButtonInCommentBox";
import { handleError, throwError, throwResponse } from "@/_utils/responses";
import { selectIsSignedIn } from "@/_redux/userSlice";

interface CommentProps {
    postId: string;
    comment: CommentInfo;
    className?: string;
}

export const Comment: React.FC<CommentProps> = React.memo(
    ({ postId, comment, className }) => {
        const dispatch = useDispatch();
        const isSignedIn = useSelector(selectIsSignedIn);
        const content = useRef<string | JSX.Element | JSX.Element[]>(
            parse(DOMPurify.sanitize(comment.Content))
        );
        const [hasLiked, setHasLiked] = useState(comment.HasLiked);
        const [isReplying, setIsReplying] = useState<boolean>(false);
        const isLoadingLikes = useRef(false);

        const [likes, setLikes] = useState(comment.LikeCnt);

        const handleLikeCliked = () => {
            if (isLoadingLikes.current === true) return;
            if (isSignedIn === false) {
                dispatch(setIsSignInModalOpen(true));
                return;
            }

            isLoadingLikes.current = true;

            fetch(
                `${import.meta.env.VITE_SERVER_URL}/api/blog/comment/${
                    comment.Id
                }/has-liked`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "jwt"
                        )}`,
                    },
                    body: JSON.stringify(!hasLiked),
                }
            )
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    throwResponse(res);
                })
                .then((has_liked) => {
                    if (hasLiked === null || hasLiked === undefined) {
                        throwError("has_liked is null or undefined");
                    }
                    setHasLiked(has_liked);
                    setLikes(likes + (has_liked ? 1 : -1));
                })
                .catch(handleError)
                .finally(() => {
                    isLoadingLikes.current = false;
                });
        };

        return (
            <>
                <div className={`flex flex-row auto-cols-min ${className}`}>
                    {comment.ParentCommentId && (
                        <div className="flex flex-row">
                            {Array.from({ length: comment.depth }).map(
                                (_, idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            className="w-0 border-r-[0.1125rem] mr-[0.8rem] md:mr-4 lg:mr-6 border-default-5 dark:border-default-10-dark"
                                        />
                                    );
                                }
                            )}
                        </div>
                    )}

                    <div className={`py-4 w-full space-y-2`}>
                        <div className="w-full flex flex-row flex-nowrap">
                            {/* 댓글 작성자 정보 */}
                            <Avatar
                                avatar={
                                    comment.Avatar
                                        ? comment.Avatar
                                        : defaultAvatar
                                }
                                size={38}
                            />
                            <div className="flex flex-col ml-2 justify-center text-sm md:text-base">
                                <div className="flex flex-row flex-wrap items-center">
                                    <span
                                        className={`w-fit border rounded-2xl mr-1 px-[0.4375rem] text-[0.7rem] break-all
                                        text-center
                                    ${
                                        comment.Email !==
                                            "jeheecheon@gmail.com" && "hidden"
                                    } border-orange-400 text-orange-400`}
                                    >
                                        Site Owner
                                    </span>
                                    <span className="text-default-18-dark text-xs break-all">
                                        {getTimeAgo(comment.UploadedAt)}
                                    </span>
                                </div>
                                <p className="dark:text-default-14 text-[0.8rem] break-all">
                                    {comment.Email}
                                </p>
                            </div>
                        </div>

                        <div
                            className="min-h-[3.125rem] py-2 px-3 rounded-lg text-[0.875rem] md:text-[1rem] break-all leading-6 md:leading-7
                            bg-default-1 dark:bg-body text-default-14-dark dark:text-default-14 w-full
                            border-[0.09rem] border-default-7 dark:border-default-5-dark"
                        >
                            {content.current}
                        </div>

                        <div className="flex flex-row flex-wrap gap-3">
                            <ButtonInCommentBox
                                onClick={handleLikeCliked}
                                className="fill-red-500"
                            >
                                {hasLiked ? <LikeFilled /> : <Like />}
                                <span>{likes}</span>
                            </ButtonInCommentBox>

                            <ButtonInCommentBox
                                onClick={() => {
                                    if (isSignedIn === false) {
                                        dispatch(setIsSignInModalOpen(true));
                                        return;
                                    }
                                    setIsReplying(!isReplying);
                                }}
                            >
                                <CommentSvg
                                    className={`transition-colors duration-500 ${
                                        isReplying
                                            ? "fill-orange-500"
                                            : "fill-gray-500 dark:fill-gray-500"
                                    }`}
                                />
                                <span>Reply</span>
                            </ButtonInCommentBox>
                        </div>
                    </div>
                </div>
                <CommentWriteArea
                    postId={postId}
                    replyingTo={comment.Id}
                    handleCancelClicked={() => setIsReplying(false)}
                    className={`my-2 ${
                        isReplying
                            ? "opacity-100 block"
                            : "opacity-0 absolute left-0 w-fit invisible"
                    } transition-opacity duration-1000`}
                />
            </>
        );
    }
);
