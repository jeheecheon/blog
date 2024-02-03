import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <Link to="/blog/recent-posts/pages/1">
        To blog
      </Link>
      <Outlet />
    </>
  )
}

export default Root;
