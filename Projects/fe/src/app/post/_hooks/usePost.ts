import { PostInfo } from "@/_types/Post";
import { throwError, throwResponse } from "@/_utils/responses";
import {
    QueryFunctionContext,
    QueryKey,
    UndefinedInitialDataOptions,
    useQuery,
} from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";

export const getPostById = async ({ queryKey }: QueryFunctionContext) => {
    const [, postId] = queryKey;
    return await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/blog/post/${postId}`,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            },
        }
    )
        .then((res) => {
            if (!res.ok) throwResponse(res);
            return res.json();
        })
        .then((post: PostInfo) => {
            if (!post) throwError("Post is null or undefined");
            return post;
        });
};

export const getPostQueryOption = (id: string | undefined) => {
    const postQueryOption: UndefinedInitialDataOptions<
        PostInfo,
        Error,
        PostInfo,
        QueryKey
    > = {
        queryKey: ["post", id],
        queryFn: getPostById,
    };

    return postQueryOption;
};

export const usePost = () => {
    let { id } = useParams();
    const location = useLocation();

    if (!id) {
        if (location.pathname === "/privacy-policy")
            id = "670e46d5-4970-4e9b-b969-4a7272209367/static-like";
        else if (location.pathname === "/about-me")
            id = "f9fbf7bf-0e9a-4835-9b81-c37e7edcef7a/static-like";
    }

    return useQuery(getPostQueryOption(id));
};
