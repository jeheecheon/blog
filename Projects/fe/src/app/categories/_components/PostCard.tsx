import React, { useMemo } from "react";

import parse, { Element } from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";

import useLeafCategories from "@/_hooks/useLeafCategories";

import { PostInfo } from "@/_types/Post";
import { flattenOutCategoriesV1 } from "@/_utils/category";

import Like from "@/posts/_assets/images/like-filled.svg?react";
import CommentSvg from "@/posts/_assets/images/comment.svg?react";
import { extractTextFromTags } from "@/_utils/post";
import CategoryInfo from "@/_types/Category";

interface PostCardProps {
    className?: string;
    post: PostInfo;
}

const PostCard = ({ className, post }: PostCardProps) => {
    const { leafCategories } = useLeafCategories();

    const contentElements = parse(DOMPurify.sanitize(post.Content), {
        replace: (domNode) => {
            if (domNode instanceof Element && domNode.attribs) {
                if (["h2", "h3", "h4", "ul", "pre"].includes(domNode.name))
                    return <></>;
            }
        },
    }) as JSX.Element[];

    const content = useMemo(() => {
        return extractTextFromTags(contentElements);
    }, [post.Id]);

    return (
        <article
            className={`group pointer-events-auto h-fit w-full cursor-pointer flex flex-col gap-y-4 md:gap-y-0 md:flex-row-reverse gap-x-3 px-1 ${className}`}
        >
            <PostCard.Image src={post.Cover!} />

            <div className="w-full flex flex-col justify-start px-3 md:px-0">
                <div className="flex flex-col md:flex-col-reverse">
                    <PostCard.Title title={post.Title} />
                    <PostCard.Date
                        date={new Date(post.UploadedAt).toLocaleDateString()}
                    />
                </div>

                <PostCard.Content content={content} />

                <div className="flex flex-row justify-start items-end mt-2 text-stone-500 dark:text-default-14">
                    <PostCard.Categories
                        leafCategories={leafCategories}
                        postCategory={post.CategoryId ?? ""}
                    />

                    <div className="flex gap-2 ml-auto text-xs font-normal">
                        <PostCard.Comments commentCnt={post.CommentCnt} />
                        <PostCard.Likes likeCnt={post.LikeCnt} />
                    </div>
                </div>
            </div>
        </article>
    );
};

PostCard.Image = ({ src }: { src: string }) => {
    return (
        <div
            className="md:w-[15rem] h-[13rem] bg-cover bg-center rounded-2xl"
            style={{
                backgroundImage: `url(${src})`,
            }}
        />
    );
};

PostCard.Title = ({ title }: { title: string }) => {
    return (
        <div
            className="font-semibold text-lg md:text-xl break-all transition-all duration-1000
            text-orange-400 group-hover:scale-[104%] md:group-hover:scale-[106%]"
        >
            {title}
        </div>
    );
};

PostCard.Date = ({ date }: { date: string }) => {
    return (
        <div
            className="text-slate-500 dark:text-slate-400 text-[0.69rem]
            group-hover:scale-[104%] transition-all duration-1000"
        >
            {date}
        </div>
    );
};

PostCard.Content = ({ content }: { content: string }) => {
    return (
        <div className="h-full overflow-clip pt-3">
            <div
                className="line-clamp-4 whitespace-break-spaces 
                text-[0.8rem] md:text-[0.875rem] leading-5 md:leading-6
                font-[335] text-default-3-dark dark:text-default-9"
            >
                {content}
            </div>
        </div>
    );
};

PostCard.Categories = ({
    leafCategories,
    postCategory,
}: {
    leafCategories: CategoryInfo[];
    postCategory: string;
}) => {
    return (
        <div className="text-orange-400 font-medium text-pretty text-[0.8rem]">
            {leafCategories &&
                flattenOutCategoriesV1(
                    leafCategories.find(
                        (category) => category.Id === postCategory
                    )
                )}
        </div>
    );
};

PostCard.Comments = ({ commentCnt }: { commentCnt: number }) => {
    return (
        <div className="flex flex-row items-center gap-1">
            <CommentSvg className="fill-orange-400 dark:fill-orange-500" />
            <span className="w-[1.0625rem]">{commentCnt}</span>
        </div>
    );
};

PostCard.Likes = ({ likeCnt }: { likeCnt: number }) => {
    return (
        <div className="flex flex-row items-center gap-1">
            <Like className="fill-orange-500 dark:fill-red-500" />
            <span className="w-[1.0625rem]">{likeCnt}</span>
        </div>
    );
};

export default React.memo(PostCard);
