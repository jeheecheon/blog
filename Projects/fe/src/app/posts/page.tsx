import Metadata from "@/posts/metadata";
import PageLoadingSpinner from "@/_components/spinner/PageLoadingSpinner";
import { usePost } from "@/posts/_hooks/usePost";
import ErrorMessageWrapper from "@/_components/error/ErrorMessageWrapper";
import useLeafCategories from "@/_hooks/useLeafCategories";
import Post from "@/posts/_components/Post";
import Comments from "@/categories/_components/Comments";
import { ScrollRestoration } from "react-router-dom";

const PostPage = () => {
    const postQuery = usePost();
    const leafCategoriesQuery = useLeafCategories();

    const isPending = postQuery.isPending || leafCategoriesQuery.isPending;
    const isSuccess = postQuery.isSuccess && leafCategoriesQuery.isSuccess;

    return (
        <>
            {isPending ? (
                <PageLoadingSpinner>Loading Post...</PageLoadingSpinner>
            ) : isSuccess ? (
                <>
                    <Post post={postQuery.post!} />
                    <Comments
                        className="max-w-[56.25rem] w-full mx-auto px-3 md:px-5"
                        postId={postQuery.post!.Id}
                    />
                    <ScrollRestoration />
                </>
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

export default PostPage;
