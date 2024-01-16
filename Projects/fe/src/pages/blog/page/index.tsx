import { Outlet } from "react-router-dom";
import { Layout as BlogLayout } from "@blog/page/components/Layout";

export const Blog = () => {

  return (<>
    <BlogLayout>
      <Outlet />
    </BlogLayout>
  </>);
}
