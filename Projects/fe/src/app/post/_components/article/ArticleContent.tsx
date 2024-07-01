import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import parse from "html-react-parser";

import DOMPurify from "isomorphic-dompurify";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/_redux/store";
import { setIsSignOnModalOpen } from "@/_redux/signInModalSlice";
import { selectIsSignedIn } from "@/_redux/userSlice";
import { setCoverImageUrl, setTitleOnCover } from "@/_redux/coverSlice";

import hljs from "@/_utils/highlightSettings";

import { PostInfo } from "@/_types/Post";

import { flattenOutCategoriesV1 } from "@/_utils/category";
import { handleError, throwError, throwResponse } from "@/_utils/responses";

import LikeFilled from "@/post/_assets/images/like-filled.svg?react";
import Like from "@/post/_assets/images/like.svg?react";
import Share from "@/post/_assets/images/share.svg?react";
import "@/post/_assets/css/Article.scss";

DOMPurify.addHook("beforeSanitizeElements", (node: Element) => {
    if (node.tagName === "IFRAME") {
        node.setAttribute("sandbox", "allow-same-origin allow-scripts");
    }
});

interface ArticleContentProps {
    className?: string;
    post: PostInfo;
}

const ArticleContent: React.FC<ArticleContentProps> = React.memo(
    ({ className, post }) => {
        const dispatch = useDispatch();
        const isSignedIn = useSelector(selectIsSignedIn);
        const location = useLocation();
        const leafCategories = useSelector(
            (state: RootState) => state.category.leafCategories
        );

        const content = useMemo<string | JSX.Element | JSX.Element[]>(
            () =>
                parse(
                    DOMPurify.sanitize(post.Content, {
                        ADD_TAGS: ["iframe"],
                        ADD_ATTR: ["allow", "allowfullscreen", "frameborder"],
                    })
                ),
            [post.Content]
        );
        const [hasLiked, setHasLiked] = useState(post.HasLiked);
        const isLoadingLikes = useRef(false);

        const [likes, setLikes] = useState(post.LikeCnt);

        useEffect(() => {
            if (post.Cover) {
                dispatch(setCoverImageUrl(post.Cover));
            } else {
                dispatch(
                    setCoverImageUrl(import.meta.env.VITE_DEFAULT_COVER_IMAGE)
                );
            }

            dispatch(setTitleOnCover(post.Title));

            const codes = document.getElementsByClassName("ql-syntax");
            for (const code of codes) {
                if (code instanceof HTMLElement) {
                    hljs.highlightElement(code);
                }
            }

            setLikes(post.LikeCnt);

            return () => {
                if (location.pathname === "/post/edit") {
                    dispatch(
                        setCoverImageUrl(
                            import.meta.env.VITE_DEFAULT_COVER_IMAGE
                        )
                    );
                } else {
                    dispatch(setCoverImageUrl(""));
                }
                dispatch(setTitleOnCover(""));
            };
        }, [post.Title, post.Cover, post.LikeCnt]);

        const handleLikeCliked = () => {
            if (isLoadingLikes.current === true) return;
            if (isSignedIn === false) {
                dispatch(setIsSignOnModalOpen(false));
                return;
            }

            isLoadingLikes.current = true;

            fetch(
                `${import.meta.env.VITE_SERVER_URL}/api/blog/post/${
                    post.Id
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
                    if (has_liked === null || has_liked === undefined) {
                        throwError("Failed to like the post");
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
            <div
                className={`flex flex-col items-center w-full sm:px-3 md:px-6 mb-10
                 ${className}`}
            >
                {/* blog content body */}
                <div
                    className="h-fit min-h-[40vh] text-pretty rounded-3xl px-3 lg:px-5 
                    w-full flex flex-col items-center xl:max-w-[56.25rem]
                    dark:bg-[#101010] bg-default-2"
                >
                    {/* Category card on top */}
                    <div
                        className="mr-auto px-3 w-fit relative top-[-1.9rem] left-[-0.625rem] z-[-1]
                        bg-gray-600/65 dark:bg-gray-800/65 rounded-md
                        ml-2 lg:ml-0
                        text-slate-100 font-medium pb-5 text-sm md:text-base"
                    >
                        {leafCategories &&
                            flattenOutCategoriesV1(
                                leafCategories.find(
                                    (category) =>
                                        category.Id === post.CategoryId
                                )
                            )}
                    </div>

                    {/* Bar on content body top */}
                    <div className="bg-default-18 dark:bg-default-11-dark h-[0.438rem] w-full max-w-[9.625rem] rounded-2xl absolute translate-y-[0.3rem]" />

                    <div className="absolute translate-y-[1rem] text-default-13-dark dark:text-default-12 font-light text-[0.75rem]">
                        {post.EditedAt !== undefined && post.EditedAt !== null
                            ? `Edited: ${post.EditedAt.toLocaleDateString()}`
                            : `Published: ${post.UploadedAt.toLocaleDateString()}`}
                    </div>

                    <div className="text-left w-full blog-post-content pb-5 md:pb-10 text-pretty">
                        {content}
                    </div>

                    <div className="mt-auto flex flex-row justify-center gap-2 items-center text-md fill-sky-700 pb-5">
                        <button
                            onClick={handleLikeCliked}
                            className="flex flex-row gap-2 justify-between items-center cursor-pointer
                            border-2 py-[0.375rem] px-3 fill-red-500
                            bg-default-1 dark:bg-default-3-dark dark:border-default-8-dark"
                        >
                            {hasLiked ? <LikeFilled /> : <Like />}
                            <span className="text-sm">{likes}</span>
                        </button>
                        <button
                            className="flex flex-row justify-center gap-1 cursor-pointer border-2 py-[0.375rem] px-3 
                            bg-default-1 dark:bg-default-3-dark dark:border-default-8-dark"
                            onClick={() => alert("미구현 기능...")}
                        >
                            <Share />
                            <span className="text-sm">공유</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
);

export default ArticleContent;
