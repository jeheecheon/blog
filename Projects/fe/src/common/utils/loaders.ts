import { LoaderFunction } from "react-router-dom";
import { HandleError, PropagateResponse, Throw403Response, Throw404Response } from "@/common/utils/responses";
import { convertStringDateIntoDate } from "@/common/utils/post";

export const PostLoader: LoaderFunction = async ({ params }) => {
    return fetch(`/api/blog/post/${params.id}`,
        {
            credentials: "same-origin"
        })
        .then(res => {
            if (res.ok)
                return res.json();
            else if (res.status === 400)
                Throw404Response();
            else
                HandleError(res);
        })
        .then(post => {
            if (post !== undefined && post !== null)
                convertStringDateIntoDate(post)
            return post;
        })
        .catch(PropagateResponse);
}

export const AboutMeLoader: LoaderFunction = async () => {
    return fetch(`/api/blog/post/342007d9-1838-4d13-ae75-fe7adcafcc37/with-metadata`,
        {
            credentials: "same-origin"
        })
        .then(res => {
            if (res.ok)
                return res.json();
            else if (res.status === 400)
                Throw404Response();
            else
                HandleError(res);
        })
        .then(post => {
            if (post !== undefined && post !== null)
                convertStringDateIntoDate(post)
            return post;
        })
        .catch(PropagateResponse);
}


export const PostEditLoader: LoaderFunction = async () => {
    return fetch("/api/auth/admin",
        {
            credentials: "same-origin"
        })
        .then(res => {
            if (res.ok)
                return null
            else if (res.status === 400)
                Throw403Response();
            else
                HandleError(res);
        })
        .catch(PropagateResponse)
}