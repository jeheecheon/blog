import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <>
      <Link to="blog/posts">
        blog
      </Link>
      <Outlet />
    </>
  )
}
