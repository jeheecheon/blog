import { useDispatch } from 'react-redux';

import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from "react-router-dom";

import { Root } from '@/pages/root/page/index'
import { ErrorBoundary } from '@/common/components/ErrorBoundary';
import { ErrorBoundary as BlogErrorBoundary } from '@/pages/blog/page/ErrorBoundary';
import { Blog } from '@/pages/blog/page/index';
import { Posts } from '@/pages/blog/posts/page/index';
import { Post } from '@/pages/blog/post/page/index';
import { AboutMe } from '@/pages/blog/about-me/page';
import { PostEdit } from '@/pages/blog/post-edit/page';
import { PostUpload } from '@/pages/blog/post-upload/page';
import { UserState, setUser } from '@/common/redux/userSlice';
import TestPage from '@/pages/test/page';

export const App = () => {
    const dispatch = useDispatch();

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route
                    errorElement={<ErrorBoundary />}
                    loader={async () => {
                        await fetch("/api/auth/authentication",
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
                    }}
                >
                    <Route
                        path='/'
                        element={<Root />}
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
                        <Route
                            path='test'
                            element={<TestPage />}
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
                </Route>
            </>
        )
    )

    return (
        <RouterProvider router={router} />
    )
}
