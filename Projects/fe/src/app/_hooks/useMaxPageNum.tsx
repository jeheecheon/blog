import { throwError, throwResponse } from "@/_utils/responses";
import {
    QueryFunctionContext,
    QueryKey,
    UndefinedInitialDataOptions,
    useQuery,
} from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const getMaxPageNum = async ({ queryKey }: QueryFunctionContext) => {
    const [, category] = queryKey;

    if (!category) throwError("Category is null or undefined");

    return await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/blog/posts/page?${
            category !== "recently-published" ? `category=${category}` : ""
        }`,
        {
            method: "GET",
        }
    )
        .then((res) => {
            if (!res.ok) throwResponse(res);
            return res.json();
        })
        .then((maxPageNum: number) => {
            if (!maxPageNum) throwError("Page count is null or undefined");
            return maxPageNum;
        });
};

export const getMaxPageNumQueryOption = (category: string | undefined) => {
    const maxPageNumQueryOption: UndefinedInitialDataOptions<
        number,
        Error,
        number,
        QueryKey
    > = {
        queryKey: ["maxPageNum", category],
        queryFn: getMaxPageNum,
        staleTime: 1000 * 60 * 60 * 24 * 1,
        gcTime: 1000 * 60 * 60 * 24 * 1,
    };

    return maxPageNumQueryOption;
};

export const useMaxPageNum = () => {
    const { category } = useParams();

    const result = useQuery(getMaxPageNumQueryOption(category));
    return { ...result, maxPageNum: result.data };
};
