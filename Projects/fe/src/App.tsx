import { Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import { PostLoader, PostEditLoader, AboutMeLoader, PrivacyPolicyLoader } from '@/common/utils/loaders';
import { AuthenticateUserAsync } from '@/common/utils/user';
import PageLoadingSpinner from './common/components/PageLoadingSpinner';
import { fetchLeafCategoriesAsync } from './common/utils/category';
import InitialSetUp from './pages/blog/page/components/InitialSetUp';

const Root = lazy(() => import('@/pages/root/page/index'));
const Blog = lazy(() => import('@/pages/blog/page/index'));
const BlogLayout = lazy(() => import('@/pages/blog/page/components/Layout'));
const ErrorArea = lazy(() => import('@/common/components/error/ErrorArea'));
const BlogErrorArea = lazy(() => import('@/pages/blog/page/BlogErrorArea'));
const Post = lazy(() => import('@/pages/blog/post/page/index'));
const PostEdit = lazy(() => import('@/pages/blog/post/edit/page'));
const PostsWrapper = lazy(() => import('@/common/components/post/PostsWrapper'));

const App = () => {
    const dispatch = useDispatch();

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route
                element={<InitialSetUp />}
                errorElement={<ErrorArea />}
                loader={async () => {
                    AuthenticateUserAsync(dispatch);
                    fetchLeafCategoriesAsync(dispatch);
                    return null;
                }}
            >
                <Route
                    path='/'
                    element={
                        <Suspense fallback={<PageLoadingSpinner />}>
                            <Root />
                        </Suspense>
                    }
                />

                {/* Blog */}
                <Route
                    element={
                        <Suspense fallback={<PageLoadingSpinner />}>
                            <BlogLayout />
                        </Suspense>
                    }
                    errorElement={<BlogErrorArea />}
                >
                    <Route
                        path='blog'
                        element={
                            <Suspense fallback={<PageLoadingSpinner />}>
                                <Blog />
                            </Suspense>
                        }
                    />
                    <Route
                        path='blog/recent-posts/pages/:page'
                        element={
                            <Suspense fallback={<PageLoadingSpinner />}>
                                <PostsWrapper />
                            </Suspense>
                        }
                    />
                    <Route
                        path='blog/categories/:category/pages/:page'
                        element={
                            <Suspense fallback={<PageLoadingSpinner />}>
                                <PostsWrapper />
                            </Suspense>
                        }
                    />
                    <Route
                        path='blog/post/:id/:slug?'
                        element={
                            <Suspense fallback={<PageLoadingSpinner />}>
                                <Post />
                            </Suspense>
                        }
                        loader={PostLoader}
                    />
                    <Route
                        path='blog/about-me'
                        element={
                            <Suspense fallback={<PageLoadingSpinner />}>
                                <Post />
                            </Suspense>
                        }
                        loader={AboutMeLoader}
                    />
                    <Route
                        path='blog/privacy-policy'
                        element={
                            <Suspense fallback={<PageLoadingSpinner />}>
                                <Post />
                            </Suspense>
                        }
                        loader={PrivacyPolicyLoader}
                    />
                    <Route
                        path='blog/post/edit'
                        element={
                            <Suspense fallback={<PageLoadingSpinner />}>
                                <PostEdit />
                            </Suspense>
                        }
                        loader={PostEditLoader}
                    />
                </Route>

                {/* Diary */}
                <Route
                    path='diary' >
                    <Route
                        path='entry/upload'
                    />
                    <Route
                        path='entry/edit'
                    />
                </Route>
            </Route>
        )
    )

    return <RouterProvider router={router} />
}

export default App;
