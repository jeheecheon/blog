import React from "react";
import ArticleLayout from "@/post/_components/article/ArticleLayout";
import ArticleContent from "@/post/_components/article/ArticleContent";
import Comments from "@/posts/_components/Comments";

import { PostInfo } from "@/_types/Post";

interface ArticleViewWrapperProps {
    post: PostInfo;
}

const ArticleViewWrapper: React.FC<ArticleViewWrapperProps> = React.memo(
    ({ post }) => {
        return (
            <ArticleLayout>
                <ArticleContent post={post} />
                <div className="max-w-[56.25rem] w-full px-3 md:px-5">
                    <Comments postId={post.Id} />
                </div>
            </ArticleLayout>
        );
    }
);

export default ArticleViewWrapper;
