import { LoaderFunction, redirect } from "react-router-dom";
import { handleError } from "@/_utils/responses";

export const postEditLoader: LoaderFunction = async () => {
    return fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/admin`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
    })
        .then((res) => {
            if (res.ok) {
                return null;
            } else if (res.status === 401 || res.status === 403) {
                return redirect("/asd");
            }
            handleError(res);
        })
        .catch(handleError);
};
