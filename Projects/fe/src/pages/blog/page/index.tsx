import { Outlet } from "react-router-dom";

import BlogLayout from "@/pages/blog/page/components/Layout";
import SignInModal from '@/common/components/SignInModal';

import('@/pages/blog/page/css/font.css');
import('@/pages/blog/page/css/scrollbar.css');

const Blog = () => {
  return (<>
    <SignInModal />
    
    <BlogLayout>
      <Outlet />
    </BlogLayout>
  </>);
}

export default Blog;
