import { Dispatch } from "@reduxjs/toolkit";
import { UserState, setUser } from "@/common/redux/userSlice";
import { HandleError, PropagateResponse } from "@/common/utils/responses";

export const AuthenticateUserAsync = async (dispatch: Dispatch) => {
    return fetch("/api/auth",
        {
            credentials: "same-origin"
        })
        .then((res) => {
            if (res.ok)
                return res.json()
            else if (res.status === 400)
                return null
            HandleError(res);
        })
        .then((json) => {
            dispatch(setUser({
                email: json.email,
                name: json.name.match(/^[^@]+/)[0],
                avatar: json.avatar
            } as UserState));

            return null;
        })
        .catch((res) => {
            if (res instanceof Response)
                PropagateResponse(res);
            return null;
        })
};

export const SignOut = async () => {
    fetch("/api/auth/sign-out", {
        credentials: "same-origin"
    })
        .catch((res) => console.error(res));
}

export const AuthTest = async () => {
    fetch("/api/test/auth", {
        credentials: "same-origin"
    })
        .catch((res) => console.error(res));
}