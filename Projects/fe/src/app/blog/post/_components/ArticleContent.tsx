import React, { useEffect, useMemo, useRef, useState } from "react";

import parse from "html-react-parser";

import DOMPurify from "isomorphic-dompurify";
import { PostInfo } from "@/blog/_types/Post";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/_redux/store";
import { makeVisible } from "@/_redux/signInModalSlice";
import { flattenOutCategoriesV1 } from "@/blog/_utils/category";
import { setCoverImageUrl, setTitleOnCover } from "@/_redux/coverSlice";
import { image } from "@/_utils/siteInfo";
import LikeFilled from "@/blog/post/_assets/images/like-filled.svg?react";
import Like from "@/blog/post/_assets/images/like.svg?react";
import Share from "@/blog/post/_assets/images/share.svg?react";

import "@/blog/post/_assets/css/Article.scss";
import hljs from "@/blog/_utils/highlightSettings";

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
        const user = useSelector((state: RootState) => state.user);
        const isAuthenticated = useRef(
            user.email !== undefined && user.email !== null && user.email !== ""
        );

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
            if (post.Cover !== null && post.Cover !== undefined)
                dispatch(setCoverImageUrl(post.Cover));

            dispatch(setTitleOnCover(post.Title));

            const codes = document.getElementsByClassName("ql-syntax");
            for (const code of codes) {
                if (code instanceof HTMLElement) {
                    hljs.highlightElement(code);
                }
            }

            setLikes(post.LikeCnt);

            return () => {
                dispatch(setCoverImageUrl(image));
                dispatch(setTitleOnCover(""));
            };
        }, [post.Title, post.Cover, post.LikeCnt]);

        const handleLikeCliked = () => {
            if (isLoadingLikes.current === true) return;
            if (isAuthenticated.current === false) {
                dispatch(makeVisible());
                return;
            }

            isLoadingLikes.current = true;

            fetch(`/api/blog/post/${post.Id}/has-liked`, {
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
            <div className={`flex flex-col items-center w-full ${className}`}>
                <div className="text-slate-50 max-w-[900px] w-full text-left pl-2 text-xl h-fit">
                    <span
                        className="bg-gray-600/65 dark:bg-gray-800/65 px-3 rounded-md 
                        text-slate-100 font-medium pb-3"
                    >
                        {leafCategories &&
                            flattenOutCategoriesV1(
                                leafCategories.find(
                                    (category) =>
                                        category.Id === post.CategoryId
                                )
                            )}
                    </span>
                </div>

                {/* blog content body */}
                <div
                    className="sm:mx-[30px] md:mx-[30px] lg:mx-[60px] xl:mx-auto max-w-[900px]
                    text-pretty h-fit min-h-[40vh] rounded-2xl shadow-md dark:shadow-lg dark:drop-shadow-lg
                    overflow-hidden mb-10 whitespace-pre-line w-full flex flex-col items-center justify-between
                    bg-body"
                >
                    <div className="w-full flex flex-col items-center">
                        <div className="bg-default-18 dark:bg-default-11-dark h-[10px] w-[170px] rounded-2xl relative bottom-1" />
                        <span className="block text-center text-default-18 font-medium text-[0.64rem] mb-3">
                            {
                                post.EditedAt !== undefined &&
                                post.EditedAt !== null
                                    ? `Edited: ${post.EditedAt.toLocaleDateString()}`
                                    : `Published: ${post.UploadedAt.toLocaleDateString()}`
                                // `Published: ${post.EditedAt.toLocaleDateString()}` :
                                // `Published: ${post.UploadedAt.toLocaleDateString()}`
                            }
                        </span>
                        <div className="text-left w-full blog-post-content  px-3 md:px-10 pb-5 md:pb-10 dark:text-default-13">
                            {content}
                        </div>
                    </div>

                    <div className="flex flex-row justify-center gap-2 items-center text-md fill-sky-700 pb-5">
                        <button
                            onClick={handleLikeCliked}
                            className="flex flex-row gap-2 justify-between items-center cursor-pointer
                            border-2 py-[6px] px-3 fill-red-500
                            bg-default-1 dark:bg-default-3-dark dark:border-default-8-dark"
                        >
                            {hasLiked ? <LikeFilled /> : <Like />}
                            <span className="text-sm">{likes}</span>
                        </button>
                        <button
                            className="flex flex-row justify-center gap-1 cursor-pointer border-2 py-[6px] px-3 
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
