import { CreateDummyPromiseAwaiter, wrapPromise } from "@/common/utils/promiseWrapper";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorBoundary from "../error/ErrorBoundary";
import Posts from "@/pages/blog/posts/page";
import PostsFallback from "@/pages/blog/posts/page/components/Fallback";
import ErrorMessageWrapper from "../ErrorMessageWrapper";

const PostsWrapper = () => {
    const { category, page } = useParams();
    const [postsAwaiter, setPostsAwaiter] = useState(CreateDummyPromiseAwaiter())

    useEffect(() => {
        let url = '';
        if (category === undefined)
            url = `/api/blog/recent-posts/pages/${page}`
        else
            url = `/api/blog/categories/${category}/pages/${page}`
        setPostsAwaiter(wrapPromise(fetch(url)));
    }, [category, page])

    return (
        <div className="m-auto max-w-[800px] px-3">
            <h1 className="inline-block uppercase max-w-[800px] w-full text-3xl font-medium text-sky-700 
            mt-[60px] mb-[20px] text-left">
                Recently published
            </h1>
            <ErrorBoundary fallback={<ErrorMessageWrapper>Error occured while fetching posts...</ErrorMessageWrapper>}>
                <Suspense
                    fallback={<PostsFallback />}>
                    <Posts postsAwaiter={postsAwaiter} />
                </Suspense>
            </ErrorBoundary>
        </div>
    )
}

export default PostsWrapper