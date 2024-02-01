import { Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import { PostLoader, PostUploadLoader, PostsLoader } from '@/common/utils/loaders';
import { AuthenticateUser } from '@/common/utils/user';

const Root = lazy(() => import('@/pages/root/page/index'));
const Blog = lazy(() => import('@/pages/blog/page/index'));
const BlogLayout = lazy(() => import('@/pages/blog/page/components/Layout'));
const ErrorBoundary = lazy(() => import('@/common/components/ErrorBoundary'));
const BlogErrorBoundary = lazy(() => import('@/pages/blog/page/BlogErrorBoundary'));
const Posts = lazy(() => import('@/pages/blog/posts/page/index'));
const Post = lazy(() => import('@/pages/blog/post/page/index'));
const AboutMe = lazy(() => import('@/pages/blog/about-me/page'));
const PostEdit = lazy(() => import('@/pages/blog/post-edit/page'));
const PostUpload = lazy(() => import('@/pages/blog/post-upload/page'));
const TestPage = lazy(() => import('@/pages/test/page'));

const App = () => {
    const dispatch = useDispatch();

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route
                errorElement={<ErrorBoundary />}
                loader={async () => AuthenticateUser(dispatch)}>

                <Route
                    path='/'
                    element={<Suspense><Root /></Suspense>}
                />

                {/* Blog */}
                <Route
                    element={<Suspense><BlogLayout /></Suspense>}
                    errorElement={<BlogErrorBoundary />}
                >
                    <Route
                        path='blog'
                        element={<Blog />}
                    />
                    <Route
                        path='blog/:categories?/:category?/pages/:page'
                        element={<Posts />}
                        loader={PostsLoader}
                    />
                    <Route
                        path='blog/post/:uuid'
                        element={<Post />}
                        loader={PostLoader}
                    />
                    <Route
                        path='blog/post-upload'
                        element={<PostUpload />}
                        loader={PostUploadLoader}
                    />
                    <Route
                        path='blog/post-edit'
                        element={<PostEdit />}
                    />
                    <Route
                        path='blog/about-me'
                        element={<AboutMe />}
                    />
                    <Route
                        path='test'
                        element={<TestPage />}
                    />
                </Route>

                {/* Diary */}
                <Route
                    path='diary' >
                    {/* Page for writing an entry */}
                    < Route
                        path='upload-entry'
                    />

                    {/* Edit entry page */}
                    < Route
                        path='edit-entry'
                    />
                </Route>
            </Route >
        )
    )

    return <RouterProvider router={router} />
}

export default App;
