import { RootState } from "@/_redux/store";
import { useMemo } from "react";
import { useSelector } from "react-redux";

function useIsAuthenticated() {
    const user = useSelector((state: RootState) => state.user);
    const isAuthenticated = useMemo(
        () =>
            user.email !== null &&
            user.email !== undefined &&
            user.email !== "",
        [user.email]
    );
    return isAuthenticated;
}

export default useIsAuthenticated;
