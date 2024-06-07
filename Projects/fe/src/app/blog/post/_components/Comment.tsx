import defaultAvatar from "@/blog/_assets/images/avatar.png";
import CommentInfo from "@/blog/_types/Comment";
import React, { useRef, useState } from "react";
import CommentWriteArea from "./CommentWriteArea";
import { getTimeAgo } from "@/blog/_utils/comment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/_redux/store";
import LikeFilled from "@/blog/post/_assets/images/like-filled.svg?react";
import Like from "@/blog/post/_assets/images/like.svg?react";
import CommentSvg from "@/blog/post/_assets/images/comment.svg?react";

import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import { makeVisible } from "@/_redux/signInModalSlice";
import Avatar from "@/blog/_components/Avatar";

interface CommentProps {
    postId: string;
    comment: CommentInfo;
    refreshComments: () => void;
}

export const Comment: React.FC<CommentProps> = React.memo(
    ({ postId, comment, refreshComments }) => {
        const dispatch = useDispatch();
        const user = useSelector((state: RootState) => state.user);
        const isAuthenticated = useRef(
            user.email !== undefined && user.email !== null && user.email !== ""
        );

        const content = useRef<string | JSX.Element | JSX.Element[]>(
            parse(DOMPurify.sanitize(comment.Content))
        );
        const [hasLiked, setHasLiked] = useState(comment.HasLiked);
        const [isReplying, setIsReplying] = useState<boolean>(false);
        const isLoadingLikes = useRef(false);

        const [likes, setLikes] = useState(comment.LikeCnt);

        const handleLikeCliked = () => {
            if (isLoadingLikes.current === true) return;
            if (isAuthenticated.current === false) {
                dispatch(makeVisible());
                return;
            }

            isLoadingLikes.current = true;

            fetch(`/api/blog/comment/${comment.Id}/has-liked`, {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(!hasLiked),
            })
                .then((res) => {
                    if (res.ok) return res.json();
                })
                .then((res) => {
                    setHasLiked(res.has_liked);
                    setLikes(likes + (res.has_liked ? 1 : -1));
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    isLoadingLikes.current = false;
                });
        };

        return (
            <div className={`flex flex-row auto-cols-min rounded-lg`}>
                {comment.ParentCommentId && (
                    <div className="flex flex-row">
                        {Array.from({ length: comment.depth }).map((_, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className="w-[5px] border-r-[1px] ml-2 mr-5 border-default-18"
                                />
                            );
                        })}
                    </div>
                )}

                <div className={`flex flex-col py-4 w-full gap-3`}>
                    <div className="flex flex-row flex-wrap">
                        {/* 댓글 작성자 정보 */}
                        <Avatar
                            avatar={
                                comment.Avatar ? comment.Avatar : defaultAvatar
                            }
                            width={45}
                        />
                        <div className="flex flex-col ml-2 justify-center text-sm md:text-base">
                            <div className="flex flex-row flex-wrap items-center">
                                <span
                                    className={`w-fit border rounded-2xl mr-1 px-[7px] py-[1px] text-xs 
                                ${
                                    comment.Email !== "jeheecheon@gmail.com" &&
                                    "hidden"
                                } border-orange-400 text-orange-400`}
                                >
                                    Site Owner
                                </span>
                                <span className="text-default-18-dark text-sm">
                                    {getTimeAgo(comment.UploadedAt as Date)}
                                </span>
                            </div>
                            <p className="dark:text-default-14">
                                {comment.Email}
                            </p>
                        </div>
                    </div>

                    <div
                        className="text-pretty min-h-[50px] py-2 px-3 rounded-lg text-sm md:text-base
                        bg-default-4 dark:bg-body dark:text-default-14 w-full"
                    >
                        {content.current}
                    </div>

                    <div className="flex flex-row flex-wrap gap-3">
                        <button
                            onClick={handleLikeCliked}
                            className="flex flex-row rounded justify-between items-center w-fit cursor-pointer
                            border-2 py-[3px] px-2 text-sm border-blue-200 gap-1 fill-red-500
                            bg-default-1 dark:bg-default-3-dark dark:border-default-8-dark"
                        >
                            {hasLiked ? <LikeFilled /> : <Like />}
                            <span>{likes}</span>
                        </button>

                        <button
                            type="button"
                            className="border-2 rounded text-sm py-[3px] px-2 w-fit
                            flex flex-row items-center justify-center gap-1
                            bg-default-1 dark:bg-default-3-dark dark:border-default-8-dark"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsReplying(!isReplying);
                            }}
                        >
                            <CommentSvg />
                            <span>Reply</span>
                        </button>
                    </div>

                    {isReplying && (
                        <CommentWriteArea
                            postId={postId}
                            replyingTo={comment.Id}
                            handleCancelClicked={() => setIsReplying(false)}
                            refreshComments={refreshComments}
                            className="mt-2"
                        />
                    )}
                </div>
            </div>
        );
    }
);
