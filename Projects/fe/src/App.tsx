import { Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import { UserState, setUser } from '@/common/redux/userSlice';
import { PropagateResponse, Throw500Response } from '@/common/utils/responses';
import { PostLoader, PostUploadLoader, PostsLoader } from '@/common/utils/loaders';

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
                loader={async () => {
                    // User authentication
                    await fetch("/api/auth/authentication",
                        {
                            credentials: "same-origin"
                        })
                        .then((res) => {
                            if (res.ok)
                                return res.json()
                            Throw500Response();
                        })
                        .then((json) => {
                            const user: UserState = {
                                email: json.email,
                                name: json.name.match(/^[^@]+/)[0]
                            };
                            dispatch(setUser(user));
                        })
                        .catch(PropagateResponse);

                    return null;
                }}>

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
                    // loader={async () => {
                    //     return null;
                    // }}
                    />
                    {/* Page that shows a subset of all posts using the pagination feature */}
                    <Route
                        path='blog/:categories?/:category?/pages/:page'
                        element={<Posts />}
                        loader={PostsLoader}
                    />

                    {/* Page that shows a specific post content */}
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
