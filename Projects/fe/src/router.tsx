import {
    Route,
    createBrowserRouter,
    createRoutesFromElements
} from "react-router-dom";

import { Root } from '@/pages/root/page/index'
import { ErrorBoundary as RootErrorBoundary } from '@/pages/root/page/ErrorBoundary';
import { ErrorBoundary as BlogErrorBoundary } from '@/pages/blog/page/ErrorBoundary';
import { Blog } from '@/pages/blog/page/index';
import { Posts } from '@/pages/blog/posts/page/index';
import { Post } from '@/pages/blog/post/page/index';
import { AboutMe } from './pages/blog/about-me/page';
import { PostEdit } from './pages/blog/post-edit/page';
import { PostUpload } from './pages/blog/post-upload/page';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path='/'
                element={<Root />}
                errorElement={<RootErrorBoundary />}
            />

            {/* Blog */}
            <Route
                path='/blog'
                element={<Blog />}
                errorElement={<BlogErrorBoundary />}
                // loader={async ({ params }) => {
                //     throw "error";
                // }}
            >
                {/* Page that shows a subset of all posts using the pagination feature */}
                <Route
                    path='posts'
                    element={<Posts />}
                />

                {/* Page that shows a specific post content */}
                <Route
                    path='post'
                    element={<Post />}
                />
                <Route
                    path='post-upload'
                    element={<PostUpload />}
                />
                <Route
                    path='post-edit'
                    element={<PostEdit />}
                />
                <Route
                    path='about-me'
                    element={<AboutMe />}
                />
            </Route>

            {/* Diary */}
            <Route
                path='diary'
            >
                {/* Page for writing an entry */}
                <Route
                    path='upload-entry'
                />

                {/* Edit entry page */}
                <Route
                    path='edit-entry'
                />
            </Route>
        </>
    )
)
