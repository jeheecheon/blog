import { Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from "react-router-dom";

import { UserState, setUser } from '@/common/redux/userSlice';

const Root = lazy(() => import('@/pages/root/page/index'));
const Blog = lazy(() => import('@/pages/blog/page/index'));
const BlogLayout = lazy(() => import('@/pages/blog/page/components/Layout'));
const ErrorBoundary = lazy(() => import('@/common/components/ErrorBoundary'));
const BlogErrorBoundary = lazy(() => import('@/pages/blog/page/ErrorBoundary'));
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
                    fetch("/api/auth/authentication",
                        {
                            credentials: "same-origin"
                        })
                        .then((response) => response.json())
                        .then((json) => {
                            const user: UserState = {
                                email: json.email,
                                name: json.name.match(/^[^@]+/)[0]
                            };
                            dispatch(setUser(user));
                        })
                        .catch((error) => console.log(error));

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
                    />
                    {/* Page that shows a subset of all posts using the pagination feature */}
                    <Route
                        path='blog/posts'
                        element={<Posts />}
                    />

                    {/* Page that shows a specific post content */}
                    <Route
                        path='blog/post'
                        element={<Post />}
                    />
                    <Route
                        path='blog/post-upload'
                        element={<PostUpload />}
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
