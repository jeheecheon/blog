import ArticleViewWrapper from "@/post/_components/article/ArticleViewWrapper";

import Metadata from "./metadata";
import PageLoadingSpinner from "@/_components/spinner/PageLoadingSpinner";
import { usePost } from "@/post/_hooks/usePost";
import ErrorMessageWrapper from "@/_components/error/ErrorMessageWrapper";
import useLeafCategories from "@/_hooks/useLeafCategories";

const Post = () => {
    const postQuery = usePost();
    const leafCategoriesQuery = useLeafCategories();

    return (
        <>
            {postQuery.isPending || leafCategoriesQuery.isPending ? (
                <PageLoadingSpinner>Loading Post...</PageLoadingSpinner>
            ) : postQuery.isSuccess && leafCategoriesQuery.isSuccess ? (
                postQuery.post && <ArticleViewWrapper post={postQuery.post} />
            ) : (
                <ErrorMessageWrapper>
                    Failed to fetch a post. Probably because the server is
                    currently down...🙄
                </ErrorMessageWrapper>
            )}

            <Metadata post={postQuery.post} />
        </>
    );
};

export default Post;
