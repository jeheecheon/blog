import { Outlet } from "react-router-dom";
import { Layout as BlogLayout } from "@/pages/blog/page/components/Layout";

export const Blog = () => {

  return (<>
    <BlogLayout>
      <Outlet />
    </BlogLayout>
  </>);
}
