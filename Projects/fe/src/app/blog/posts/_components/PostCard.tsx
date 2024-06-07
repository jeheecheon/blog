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
            className={`max-w-[800px] h-fit w-full
            group hover:cursor-pointer mb-3 pb-2 border-b-2 
            dark:border-default-12-dark border-default-6
            ${className}`}
        >
            <div className="flex justify-between text-slate-400 text-sm">
                <span className="text-right text-xs">
                    Published: {post.UploadedAt.toLocaleDateString()}
                </span>
                {/* <span className='self-end'>23 views</span> */}
            </div>

            <div
                className="font-semibold text-xl md:text-2xl text-pretty 
            text-slate-600 dark:text-default-13 group-hover:text-sky-600 dark:group-hover:text-sky-600"
            >
                {post.Title}
            </div>

            <div className="flex flex-row justify-start items-end mt-2">
                {/* Likes */}
                <div className="flex flex-row items-center mr-4 gap-1">
                    <LikeFilled className="fill-red-500" />
                    <span className="text-base">{post.LikeCnt}</span>
                </div>

                {/* Comments */}
                <div className="flex flex-row items-center gap-1">
                    <CommentSvg className="fill-sky-700 dark:fill-sky-800" />
                    <span className="text-base">{post.CommentCnt}</span>
                </div>

                {/* Categories */}
                <div className="ml-auto text-orange-400 dark:text-orange-400 font-medium text-pretty text-sm md:text-lg">
                    {leafCategories &&
                        flattenOutCategoriesV1(
                            leafCategories.find(
                                (category) => category.Id === post.CategoryId
                            )
                        )}
                </div>
            </div>
        </article>
    );
};

export default PostCard;
