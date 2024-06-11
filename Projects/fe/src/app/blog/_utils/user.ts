import { Dispatch } from "@reduxjs/toolkit";
import { UserState, setUser } from "@/_redux/userSlice";
import { handleError, throwResponse } from "@/_utils/responses";
import { serverUrl } from "@/_utils/site";

export const authenticateUserAsync = async (dispatch: Dispatch) => {
    return fetch(`${serverUrl}/api/auth`, {
        credentials: "same-origin",
    })
        .then((res) => {
            if (res.ok) return res.json();
            else if (res.status === 401) return null;
            throwResponse(res);
        })
        .then((json) => {
            if (json) {
                dispatch(
                    setUser({
                        email: json.email,
                        name: json.name.match(/^[^@]+/)[0],
                        avatar: json.avatar,
                    } as UserState)
                );
            }

            return null;
        })
        .catch(handleError);
};

export const signOut = () => {
    fetch(`${serverUrl}/api/auth/sign-out`, {
        credentials: "same-origin",
    })
        .then((res) => {
            if (res.ok) {
                window.location.reload();
            } else {
                throwResponse(res);
            }
        })
        .catch(handleError);
};
