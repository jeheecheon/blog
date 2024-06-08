import { PostInfo } from "@/blog/_types/Post";
import { useSelector } from "react-redux";
import { RootState } from "@/_redux/store";
import { flattenOutCategoriesV1 } from "@/blog/_utils/category";
import React from "react";
import Like from "@/blog/post/_assets/images/like-filled.svg?react";
import CommentSvg from "@/blog/post/_assets/images/comment.svg?react";

interface PostCardProps {
    className?: string;
    post: PostInfo;
}

const PostCard: React.FC<PostCardProps> = ({ className, post }) => {
    const leafCategories = useSelector(
        (state: RootState) => state.category.leafCategories
    );

    return (
        <article
            className={`h-fit w-full cursor-pointer py-3 px-2 
            transition-all duration-700
            ${className}`}
        >
            <div className="flex justify-between text-slate-400 dark:text-slate-500 text-[0.69rem]">
                {post.UploadedAt.toLocaleDateString()}
            </div>

            <div
                className="font-semibold text-base sm:text-lg md:text-xl break-all transition-all duration-700 
                text-gray-500/85 dark:text-default-13"
            >
                {post.Title}
            </div>

            <div className="flex flex-row justify-start items-end mt-2 text-stone-500 dark:text-default-14">
                {/* Categories */}
                <div className="text-orange-400 dark:text-orange-400 font-medium text-pretty text-[0.8rem]">
                    {leafCategories &&
                        flattenOutCategoriesV1(
                            leafCategories.find(
                                (category) => category.Id === post.CategoryId
                            )
                        )}
                </div>

                {/* Likes */}
                <div className="ml-auto flex flex-row items-center mr-2 gap-1 font-[500]">
                    <Like className="fill-orange-500" />
                    <span className="text-sm w-[17px]">{post.LikeCnt}</span>
                </div>

                {/* Comments */}
                <div className="flex flex-row items-center gap-1 font-[500]">
                    <CommentSvg className="fill-sky-700 dark:fill-sky-800" />
                    <span className="text-sm w-[17px]">{post.CommentCnt}</span>
                </div>
            </div>
        </article>
    );
};

export default PostCard;
