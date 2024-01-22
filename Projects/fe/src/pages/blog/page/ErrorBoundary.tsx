import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Layout from "./components/Layout";
import { Button } from "@/common/components/Button";

const ErrorBoundary = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <Layout>
            <div className="flex flex-col items-center min-h-[50vh] relative -top-[50vh]">
                <span className="flex flex-col items-center gap-5 rounded-2xl bg-slate-50 bg-opacity-50 p-5">
                    <h1 className="text-5xl italic text-slate-700">😒Oops...</h1>
                    <p className="text-lg ">Sorry, an unexpected error has occurred.</p>
                    <p>
                        <i className="text-red-700 text-lg">{isRouteErrorResponse(error) ?
                            error.status || error.statusText
                            : "Unknown Error"
                        }</i>
                    </p>
                    <Button>Previous page</Button>
                </span>
            </div>

            <div className="flex flex-col items-center justify-center relative -top-[25vh]">
                <span className="flex flex-col justify-center items-center mb-3">
                    <span>오류났다니까요?</span>
                    <span>뒤로 가세요!</span>
                </span>
                <Button>뒤로 가기✌️</Button>
            </div>
        </Layout>
    );
}

export default ErrorBoundary;
