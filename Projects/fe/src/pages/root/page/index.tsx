import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>

      <Link to="/">Home</Link>
      <Link to="blog">Blog</Link>

      <button
        onClick={(e) => {
          e.preventDefault();

          window.location.replace("/api/oauth/sign-in?provider=google");
        }}
      >Google Sign in</button>
      <Outlet />
    </>
  )
}

export default Root;
