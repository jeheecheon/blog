import { Button } from "@/common/components/Button";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const ErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center min-h-[50vh] h-screen justify-center">
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
  );
}