import CommentInfo from "@/_types/Comment";
import { sortComments } from "@/_utils/comment";
import { throwError, throwResponse } from "@/_utils/responses";
import {
    QueryFunctionContext,
    QueryKey,
    UndefinedInitialDataOptions,
    useQuery,
} from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";

export const getCommentsByPostId = async ({
    queryKey,
}: QueryFunctionContext) => {
    const [, postId] = queryKey;

    return await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/blog/post/${postId}/comments`,
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
        .then((comments: CommentInfo[]) => {
            if (!comments) throwError("Comments are null or undefined");

            const sortedComments: CommentInfo[] = sortComments(
                comments
            );
            return sortedComments;
        });
};

export const getCommentsQueryOption = (id: string | undefined) => {
    const commentsQueryOption: UndefinedInitialDataOptions<
        CommentInfo[],
        Error,
        CommentInfo[],
        QueryKey
    > = {
        queryKey: ["comments", id],
        queryFn: getCommentsByPostId
    };

    return commentsQueryOption;
};

export const useComments = () => {
    let { id } = useParams();
    const location = useLocation();

    if (!id) {
        switch (location.pathname) {
            case "/privacy-policy":
                id = "670e46d5-4970-4e9b-b969-4a7272209367";
                break;
            case "/about-me":
                id = "f9fbf7bf-0e9a-4835-9b81-c37e7edcef7a";
                break;
            case "/woowacourse":
                id = "12157f42-d334-4a4c-b3c0-2270edaa070f";
                break;
        }
    }

    return useQuery(getCommentsQueryOption(id));
};
