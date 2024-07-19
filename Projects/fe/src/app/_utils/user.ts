import { Dispatch } from "@reduxjs/toolkit";
import { UserState, setUser } from "@/_redux/userSlice";
import { handleError, throwResponse } from "@/_utils/responses";

export const authenticateUser = (dispatch: Dispatch) => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
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
                        isSignedIn: true,
                    } as UserState)
                );
            }

            return null;
        })
        .catch(handleError);
};

export const signOut = () => {
    sessionStorage.removeItem("jwt");
    location.reload();
};
