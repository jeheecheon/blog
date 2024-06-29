import { handleError, throwError, throwResponse } from "@/_utils/responses";
import LoadingSpinner from "@/_components/spinner/LoadingSpinner";
import { convertFromBase64Url } from "@/_utils/oauth";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Page() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const scope = searchParams.get("scope");

        fetch(
            `${
                import.meta.env.VITE_SERVER_URL
            }/api/oauth/google/sign-in?code=${code}&state=${state}&scope=${scope}`,
            {
                method: "POST",
            }
        )
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throwResponse(res);
                }
            })
            .then((jwt) => {
                if (jwt && jwt !== "") {
                    sessionStorage.setItem("jwt", jwt);

                    const prevUrl = convertFromBase64Url(state || "");
                    if (prevUrl && prevUrl !== "") {
                        navigate(prevUrl);
                    } else {
                        navigate("/");
                    }
                } else {
                    throwError("Failed to sign-in with Google");
                }
            })
            .catch(handleError);
    }, []);

    return (
        <div className="flex justify-center items-center h-[100dvh]">
            <LoadingSpinner>Signing in...🙃</LoadingSpinner>
        </div>
    );
}

export default Page;
