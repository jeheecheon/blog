import { LoaderFunction, redirect } from "react-router-dom";
import {
    HandleError,
    PropagateResponse,
    Throw400Response,
    Throw404Response,
} from "@/_utils/responses";
import { convertStringIntoDate } from "@/blog/_utils/post";

export const PostLoader: LoaderFunction = async ({ params }) => {
    return fetch(`/api/blog/post/${params.id}`, {
        credentials: "same-origin",
    })
        .then((res) => {
            if (res.ok) return res.json();
            else if (res.status === 400) Throw404Response();
            else HandleError(res);
        })
        .then((post) => {
            if (post !== undefined && post !== null)
                convertStringIntoDate(post);
            return post;
        })
        .catch(PropagateResponse);
};

export const AboutMeLoader: LoaderFunction = async () => {
    return fetch(
        `/api/blog/post/f9fbf7bf-0e9a-4835-9b81-c37e7edcef7a/static-like`
    )
        .then((res) => {
            if (res.ok) return res.json();
            else if (res.status === 400) Throw404Response();
            else HandleError(res);
        })
        .then((post) => {
            if (post !== undefined && post !== null)
                convertStringIntoDate(post);
            return post;
        })
        .catch(PropagateResponse);
};

export const PrivacyPolicyLoader: LoaderFunction = async () => {
    return fetch(
        `/api/blog/post/670e46d5-4970-4e9b-b969-4a7272209367/static-like`
    )
        .then((res) => {
            if (res.ok) return res.json();
            else if (res.status === 400) Throw404Response();
            else HandleError(res);
        })
        .then((post) => {
            if (post !== undefined && post !== null)
                convertStringIntoDate(post);
            return post;
        })
        .catch(PropagateResponse);
};

export const PostEditLoader: LoaderFunction = async () => {
    return fetch("/api/auth/admin", { 
        credentials: "same-origin",
    })
        .then((res) => {
            if (res.ok) return null;
            else if (res.status === 401 || res.status === 403) {
                return redirect("/asd");
            } else if (res.status === 400) Throw400Response();
            else HandleError(res);
        })
        .catch(PropagateResponse);
};
