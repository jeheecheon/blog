import { PostInfo } from "@/blog/_types/Post";
import { useSelector } from "react-redux";
import { RootState } from "@/_redux/store";
import { flattenOutCategoriesV1 } from "@/blog/_utils/category";
import React from "react";
import LikeFilled from "@/blog/post/_assets/images/like-filled.svg?react";
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
            className={`h-fit w-full group cursor-pointer py-3 px-2 
            transition-all duration-700 hover:bg-default-4 dark:hover:bg-default-5-dark
            ${className}`}
        >
            <div className="flex justify-between text-slate-400 dark:text-slate-500">
                <span className="text-right text-[0.7rem]">
                    {post.UploadedAt.toLocaleDateString()}
                </span>
                {/* <span className='self-end'>23 views</span> */}
            </div>

            <div
                className="font-[500] text-lg md:text-xl break-all transition-all duration-700
                text-gray-500 dark:text-default-5 group-hover:text-orange-400 dark:group-hover:text-default-1"
            >
                {post.Title}
            </div>

            <div className="flex flex-row justify-start items-end mt-1 text-stone-500 dark:text-default-14 font-[500]">
                {/* Categories */}
                <div className="text-orange-400 dark:text-orange-400 text-pretty text-xs md:text-sm">
                    {leafCategories &&
                        flattenOutCategoriesV1(
                            leafCategories.find(
                                (category) => category.Id === post.CategoryId
                            )
                        )}
                </div>

                {/* Likes */}
                <div className="ml-auto flex flex-row items-center mr-2 gap-1">
                    <LikeFilled className="fill-red-500" />
                    <span className="text-sm w-[17px]">{post.LikeCnt}</span>
                </div>

                {/* Comments */}
                <div className="flex flex-row items-center gap-1">
                    <CommentSvg className="fill-sky-700 dark:fill-sky-800" />
                    <span className="text-sm w-[17px]">{post.CommentCnt}</span>
                </div>
            </div>
        </article>
    );
};

export default PostCard;
