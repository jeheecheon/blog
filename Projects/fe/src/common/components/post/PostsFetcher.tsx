import { PromiseAwaiter, wrapPromise } from "@/common/utils/promiseWrapper";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorBoundary from "../error/ErrorBoundary";
import Posts from "@/pages/blog/posts/page";
import { useIsMounted } from "@/common/hooks/useIsMounted";

const PostsFetcher = () => {
    const { category, page } = useParams();
    const isMounted = useIsMounted();

    let url = '';
    if (isMounted === false) {
        if (category === undefined)
            url = `/api/blog/recent-posts/pages/${page}`
        else
            url = `/api/blog/categories/${category}/pages/${page}`
    }
    const [postsAwaiter, setPostsAwaiter] = useState<PromiseAwaiter>(wrapPromise(fetch(url)))

    useEffect(() => {
        if (category === undefined)
            url = `/api/blog/recent-posts/pages/${page}`
        else
            url = `/api/blog/categories/${category}/pages/${page}`

        console.log(url)
        setPostsAwaiter(wrapPromise(fetch(url)))
    }, [category])

    return (
        <ErrorBoundary fallback={<div>Error occured while fetching posts...</div>}>
            <Suspense fallback={<div>Fetching posts...</div>}>
                <Posts postsAwaiter={postsAwaiter} />
            </Suspense>
        </ErrorBoundary>
    )
}

export default PostsFetcher