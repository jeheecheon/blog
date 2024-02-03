import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import Button from "@/common/components/Button";

interface ErrorAreaProps {
  className?: string
}

const ErrorArea = ({ className }: ErrorAreaProps) => {
  const error = useRouteError();
  const navigate = useNavigate();
  
  return (
    <div className={`flex flex-col items-center min-h-[50vh] h-screen justify-center ${className}`}>
      <span className="flex flex-col items-center gap-5 rounded-2xl bg-slate-50 bg-opacity-50 p-5">
        <h1 className="text-5xl italic text-slate-700">😒Oops...</h1>
        <p className="text-lg ">Sorry, an unexpected error has occurred.</p>
        <p>
          <i className="text-red-700 text-lg">{isRouteErrorResponse(error) &&
            (
              <span className="flex flex-col items-center">
                <span>{error.status}</span>
                <span>{error.statusText}</span>
              </span>
            )
          }</i>
        </p>
        <Button onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}>Previous page</Button>
      </span>
    </div>
  );
}

export default ErrorArea;
