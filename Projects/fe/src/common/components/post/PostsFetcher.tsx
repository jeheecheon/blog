import { wrapPromise } from "@/common/utils/promiseWrapper";
import { Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorBoundary from "../error/ErrorBoundary";
import Posts from "@/pages/blog/posts/page";

const PostsFetcher = () => {
    const { category, page } = useParams();

    let url = '';
    if (category === undefined)
        url = `/api/blog/recent-posts/pages/${page}`
    else
        url = `/api/blog/categories/${category}/pages/${page}`

    const [postsAwaiter] = useState(wrapPromise(fetch(url)))

    return (
        <ErrorBoundary fallback={<div>Error occured while fetching posts...</div>}>
            <Suspense fallback={<div>Fetching posts...</div>}>
                <Posts postsAwaiter={postsAwaiter} />
            </Suspense>
        </ErrorBoundary>
    )
}

export default PostsFetcher