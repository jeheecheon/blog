import { PostInfo } from "@/_types/Post";
import { sortPostsByUploadedAt } from "@/_utils/post";
import { throwError, throwResponse } from "@/_utils/responses";
import {
    QueryFunctionContext,
    QueryKey,
    UndefinedInitialDataOptions,
    useQuery,
} from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const getPostsByCategoryAndPageNumber = async ({
    queryKey,
}: QueryFunctionContext) => {
    const [, category, page] = queryKey as [
        string,
        string: string | undefined,
        string: string | undefined
    ];

    if (!page) {
        throwError("Invalid query key");
    }

    const fetchUrl = `${import.meta.env.VITE_SERVER_URL}/api/blog/${
        category === "recently-published"
            ? "recent-posts"
            : `categories/${category}`
    }/pages/${page}`;

    const posts: PostInfo[] = await fetch(fetchUrl, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
    })
        .then((res) => {
            if (!res.ok) throwResponse(res);
            return res.json();
        })
        .then((posts: PostInfo[]) => {
            if (!posts) throwError("No data found");

            const sortedPosts: PostInfo[] = sortPostsByUploadedAt(
                posts
            ) as PostInfo[];

            return sortedPosts;
        });

    return posts;
};

export const getPostsQueryOption = (
    category: string | undefined,
    page: string | undefined
) => {
    const postsQueryOption: UndefinedInitialDataOptions<
        PostInfo[],
        Error,
        PostInfo[],
        QueryKey
    > = {
        queryKey: ["posts", category, page],
        queryFn: getPostsByCategoryAndPageNumber,
    };

    return postsQueryOption;
};

export const usePosts = () => {
    const { category, page } = useParams();
    return useQuery(getPostsQueryOption(category, page));
};
