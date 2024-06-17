import { handleError, throwError, throwResponse } from "@/_utils/responses";
import { serverUrl } from "@/_utils/site";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Page() {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const scope = searchParams.get("scope");

        fetch(`${serverUrl}/api/oauth/google/sign-in?code=${code}&state=${state}&scope=${scope}`, {
            method: "POST",
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throwResponse(res);
                }
            })
            .then((data: { jwt: string; prevUrl: string }) => {
                if (
                    data &&
                    data.jwt &&
                    data.jwt !== "" &&
                    data.prevUrl &&
                    data.prevUrl !== ""
                ) {
                    sessionStorage.setItem("jwt", data.jwt);
                    window.location.replace(data.prevUrl);
                } else {
                    throwError("Failed to sign-in with Google");
                }
            })
            .catch(handleError);
    }, []);

    return <div>Google Signing-in</div>;
}

export default Page;
