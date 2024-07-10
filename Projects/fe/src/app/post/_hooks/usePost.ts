import { PostInfo } from "@/_types/Post";
import { throwError, throwResponse } from "@/_utils/responses";
import { QueryFunctionContext, QueryKey, UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

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

    return postQueryOption
};

export const usePost = () => {
    const { id } = useParams();
    return useQuery(getPostQueryOption(id));
};
