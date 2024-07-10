import ArticleViewWrapper from "@/post/_components/article/ArticleViewWrapper";

import Metadata from "./metadata";
import PageLoadingSpinner from "@/_components/spinner/PageLoadingSpinner";
import { usePost } from "@/post/_hooks/usePost";
import ErrorMessageWrapper from "@/_components/error/ErrorMessageWrapper";

const Post = () => {
    const { data, status } = usePost();

    return (
        <>
            {status === "pending" && <PageLoadingSpinner />}

            {status === "success" && <ArticleViewWrapper post={data} />}

            {status === "error" && (
                <ErrorMessageWrapper>
                    Failed to fetch a post. Probably because the server is
                    currently down...🙄
                </ErrorMessageWrapper>
            )}

            <Metadata post={data} />
        </>
    );
};

export default Post;
