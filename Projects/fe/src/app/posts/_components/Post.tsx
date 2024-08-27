import React, { ReactNode, useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";

import parse from "html-react-parser";

import DOMPurify from "isomorphic-dompurify";

import { useDispatch, useSelector } from "react-redux";
import { setIsSignInModalOpen } from "@/_redux/signInModalSlice";
import { selectIsSignedIn } from "@/_redux/userSlice";
import { setCoverImageUrl, setTitleOnCover } from "@/_redux/coverSlice";

import hljs from "@/_utils/highlightSettings";

import { PostInfo } from "@/_types/Post";

import { flattenOutCategoriesV1 } from "@/_utils/category";
import { handleError, throwError, throwResponse } from "@/_utils/responses";

import LikeFilled from "@/posts/_assets/images/like-filled.svg?react";
import Like from "@/posts/_assets/images/like.svg?react";
import Share from "@/posts/_assets/images/share.svg?react";
import "@/posts/_assets/css/Article.scss";
import useLeafCategories from "@/_hooks/useLeafCategories";
import { useQueryClient } from "@tanstack/react-query";
import CategoryInfo from "@/_types/Category";

DOMPurify.addHook("beforeSanitizeElements", (node: Element) => {
    if (node.tagName === "IFRAME") {
        node.setAttribute("sandbox", "allow-same-origin allow-scripts");
    }
});

interface PostProps {
    className?: string;
    post: PostInfo;
}

const Post = ({ className, post }: PostProps) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const queryClient = useQueryClient();

    const isSignedIn = useSelector(selectIsSignedIn);
    const { leafCategories } = useLeafCategories();

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
    const isLoadingLikes = useRef(false);

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

        return () => {
            if (location.pathname === "/post/edit") {
                dispatch(
                    setCoverImageUrl(import.meta.env.VITE_DEFAULT_COVER_IMAGE)
                );
            } else {
                dispatch(setCoverImageUrl(""));
            }
            dispatch(setTitleOnCover(""));
        };
    }, [post.Cover, post.Title]);

    const handleLikeCliked = () => {
        if (isLoadingLikes.current === true) return;
        if (isSignedIn === false) {
            dispatch(setIsSignInModalOpen(true));
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
                    Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
                },
                body: JSON.stringify(!post.HasLiked),
            }
        )
            .then((res) => {
                if (!res.ok) {
                    throwResponse(res);
                }
                return res.json();
            })
            .then((has_liked: boolean) => {
                if (has_liked === undefined || has_liked === null) {
                    throwError("Failed to like the post");
                }

                // Remove the caches for the category pages
                // queryClient.removeQueries({
                //     queryKey: ["posts", "recently-published"]
                // })
                // queryClient.removeQueries({
                //     queryKey: ["posts", post.CategoryId]
                // })

                queryClient.setQueryData(["post", post.Id], {
                    ...post,
                    HasLiked: has_liked,
                    LikeCnt: has_liked ? post.LikeCnt + 1 : post.LikeCnt - 1,
                });
            })
            .catch(handleError)
            .finally(() => {
                isLoadingLikes.current = false;
            });
    };

    return (
        <div
            className={`sm:px-3 md:px-6 mb-10
                 ${className}`}
        >
            {/* Post body */}
            <article
                className="mx-auto h-fit min-h-[40vh] text-pretty rounded-3xl px-3 sm:px-6 
                    w-full flex flex-col items-center max-w-[56.25rem]
                    bg-[var(--main-bg-color-2)] transition-colors duration-700 ease-in-out 
                    border-[0.095rem] dark:border-default-4-dark border-default-6 shadow-sm"
            >
                <Post.CategoryCard
                    leafCategories={leafCategories}
                    postCategory={post.CategoryId}
                />

                {/* Bar on content body top */}
                <div className="bg-default-18 dark:bg-default-11-dark h-[0.35rem] w-full max-w-[9rem] rounded-2xl absolute translate-y-[0.3rem]" />

                <Post.Date
                    uploadedDate={post.UploadedAt}
                    editedDate={post.EditedAt}
                />

                <Post.Content content={content} />

                {/* Button for like and share */}
                <div className="mt-auto flex flex-row justify-center gap-2 items-center text-md fill-sky-700 pb-6">
                    <Post.Button
                        onClick={handleLikeCliked}
                        className="gap-2 fill-red-500"
                    >
                        <LikeFilled
                            className={`${!post.HasLiked && "hidden"}`}
                        />
                        <Like className={`${post.HasLiked && "hidden"}`} />
                        <span className="text-sm">{post.LikeCnt}</span>
                    </Post.Button>

                    <Post.Button
                        onClick={() => alert("미구현 기능...")}
                        className="gap-1"
                    >
                        <Share />
                        <span className="text-sm">공유</span>
                    </Post.Button>
                </div>
            </article>
        </div>
    );
};

Post.CategoryCard = ({
    leafCategories,
    postCategory,
}: {
    leafCategories: CategoryInfo[];
    postCategory?: string;
}) => {
    return (
        <div
            className="mr-auto px-3 w-fit relative top-[-1.9rem] left-[-0.625rem] z-[-1]
        bg-gray-600/65 dark:bg-gray-800/65 rounded-md
        ml-2 lg:ml-0
        text-slate-100 font-medium pb-5 text-sm md:text-base"
        >
            {leafCategories &&
                flattenOutCategoriesV1(
                    leafCategories.find(
                        (category) => category.Id === postCategory
                    )
                )}
        </div>
    );
};

Post.Date = ({
    editedDate,
    uploadedDate,
}: {
    editedDate?: string;
    uploadedDate: string;
}) => {
    return (
        <div className="absolute translate-y-[1rem] text-default-13-dark dark:text-default-12 font-light text-[0.75rem]">
            {editedDate
                ? `Edited: ${new Date(editedDate).toLocaleDateString()}`
                : `Published: ${new Date(uploadedDate).toLocaleDateString()}`}
        </div>
    );
};

Post.Content = ({ content }: { content: string | ReactNode }) => {
    return (
        <div className="text-left w-full blog-post-content pb-5 md:pb-10 text-pretty">
            {content}
        </div>
    );
};

Post.Button = ({
    onClick,
    children,
    className,
}: {
    onClick: () => void;
    children: ReactNode;
    className: string;
}) => {
    return (
        <button
            className={`flex justify-center items-center border-[0.095rem] rounded-sm py-[0.375rem] px-3
            bg-default-1 dark:bg-default-3-dark border-default-7 dark:border-default-5-dark ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default React.memo(Post);
