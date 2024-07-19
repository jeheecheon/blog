import { useIsFetching } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const useIsFetchingPost = () => {
    const isFetching = useIsFetching({ queryKey: ["post"] });
    const location = useLocation();

    if (location.pathname.startsWith("/post/edit")) return true;

    return isFetching > 0;
};

export default useIsFetchingPost;
