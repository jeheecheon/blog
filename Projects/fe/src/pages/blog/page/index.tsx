import { Outlet } from "react-router-dom";
import { Layout as BlogLayout } from "@/pages/blog/page/components/Layout";

import '@/pages/blog/page/css/font.css';
import '@/pages/blog/page/css/scrollbar.css';

export const Blog = () => {
  return (<>
    <BlogLayout>
      <Outlet />
    </BlogLayout>
  </>);
}
