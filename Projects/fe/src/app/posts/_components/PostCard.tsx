import { PostInfo } from "@/_types/Post";
import { flattenOutCategoriesV1 } from "@/_utils/category";
import React from "react";
import Like from "@/post/_assets/images/like-filled.svg?react";
import CommentSvg from "@/post/_assets/images/comment.svg?react";
import useLeafCategories from "@/_hooks/useLeafCategories";

interface PostCardProps {
    className?: string;
    post: PostInfo;
}

const PostCard: React.FC<PostCardProps> = React.memo(({ className, post }) => {
    const { leafCategories } = useLeafCategories();

    return (
        <article
            className={`h-fit w-full cursor-pointer py-5 md:py-6 px-2 ${className}`}
        >
            <div
                className="flex justify-between text-slate-400 dark:text-slate-500 text-[0.69rem]
                group-hover:scale-[104%] transition-all duration-1000"
            >
                {new Date(post.UploadedAt).toLocaleDateString()}
            </div>

            <div
                className="font-medium text-md sm:text-lg break-all transition-all duration-1000 
                text-gray-600/80 dark:text-default-13 group-hover:scale-[104%] md:group-hover:scale-[106%] 
                group-hover:text-gray-600 dark:group-hover:text-default-5"
            >
                {post.Title}
            </div>

            <div
                className="flex flex-row justify-start items-end mt-2 text-stone-500 dark:text-default-14
                group-hover:scale-[104%] transition-all duration-1000"
            >
                {/* Categories */}
                <div className="text-orange-400/80 dark:text-orange-400 font-medium text-pretty text-[0.8rem]">
                    {leafCategories &&
                        flattenOutCategoriesV1(
                            leafCategories.find(
                                (category) => category.Id === post.CategoryId
                            )
                        )}
                </div>

                <div className="flex gap-2 ml-auto text-xs font-normal">
                    {/* Comments */}
                    <div className="flex flex-row items-center gap-1">
                        <CommentSvg className="fill-orange-400 dark:fill-orange-500" />
                        <span className="w-[1.0625rem]">{post.CommentCnt}</span>
                    </div>

                    {/* Likes */}
                    <div className="flex flex-row items-center gap-1">
                        <Like className="fill-orange-500 dark:fill-red-500" />
                        <span className="w-[1.0625rem]">{post.LikeCnt}</span>
                    </div>
                </div>
            </div>
        </article>
    );
});

export default PostCard;
