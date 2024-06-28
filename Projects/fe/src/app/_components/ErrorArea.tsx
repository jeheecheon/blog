import {
    ScrollRestoration,
    isRouteErrorResponse,
    useRouteError,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Button from "@/_components/Button";

interface ErrorAreaProps {
    className?: string;
}

const ErrorArea = ({ className }: ErrorAreaProps) => {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <>
            <div
                className={`flex flex-col items-center h-[100dvh] justify-center ${className} bg-body`}
            >
                <div
                    className="flex flex-col items-center gap-5 rounded-2xl shadow-xl dark:shadow-black/40 p-5 max-w-[18.75rem] w-full
                bg-default-3 dark:bg-slate-200/50 border-2 dark:border-[0.0625rem] border-default-5 dark:border-slate-200/30"
                >
                    <h1 className="text-5xl italic dark:text-default-5-dark text-default-17 font-semibold">
                        😭Oops...
                    </h1>

                    <div className="text-sm md:text-base dark:text-default-2-dark text-default-18-dark">
                        <p className="text-center">요청하신 페이지가 없거나,</p>
                        <p className="text-center">
                            서버에 문제가 발생했습니다.
                        </p>
                    </div>

                    {isRouteErrorResponse(error) && (
                        <i className="text-red-700 text-xs flex flex-col items-center">
                            <span>{error.status}</span>
                            <span>{error.statusText}</span>
                        </i>
                    )}

                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(-1);
                        }}
                    >
                        뒤로가기
                    </Button>
                </div>
            </div>

            <ScrollRestoration />
        </>
    );
};

export default ErrorArea;
