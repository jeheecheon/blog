import CommentInfo from "@/_types/Comment";
import { convertStringDateIntoDate, sortComments } from "@/_utils/comment";
import { throwError, throwResponse } from "@/_utils/responses";
import { QueryFunctionContext, QueryKey, UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

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
                convertStringDateIntoDate(comments.map((c) => c))
            );
            console.log("new");
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
        queryFn: getCommentsByPostId,
        staleTime: 1000 * 60 * 5,
    };

    return commentsQueryOption;
};

export const useComments = () => {
    const { id } = useParams();
    return useQuery(getCommentsQueryOption(id));
};
