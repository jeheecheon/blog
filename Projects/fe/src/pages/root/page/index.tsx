import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <Link to="blog/posts">
        To blog
      </Link>
      <Outlet />
    </>
  )
}

export default Root;
