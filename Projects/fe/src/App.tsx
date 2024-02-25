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

const Root = lazy(() => import('@/pages/root/page/index'));
const Blog = lazy(() => import('@/pages/blog/page/index'));
const BlogLayout = lazy(() => import('@/pages/blog/page/components/Layout'));
const PostLayout = lazy(() => import('@/pages/blog/post/page/components/Layout'));
const ErrorArea = lazy(() => import('@/common/components/error/ErrorArea'));
const Post = lazy(() => import('@/pages/blog/post/page/index'));
const PostEdit = lazy(() => import('@/pages/blog/post/edit/page'));
const PostsWrapper = lazy(() => import('@/common/components/post/PostsWrapper'));
const BlogLoad = lazy(() => import('@/common/components/BlogLoad'));

import '@/main.css'

const App = () => {
    const dispatch = useDispatch();

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route
                errorElement={<ErrorArea />}
            >
                <Route
                    path='/'
                    element={
                        <Suspense fallback={<PageLoadingSpinner />}>
                            <Root />
                        </Suspense>
                    }
                />
                <Route
                    element={
                        <BlogLoad />
                    }
                    loader={async () => {
                        AuthenticateUserAsync(dispatch);
                        fetchLeafCategoriesAsync(dispatch);
                        return null;
                    }}
                >
                    <Route
                        element={
                            <Suspense fallback={<PageLoadingSpinner />}>
                                <BlogLayout />
                            </Suspense>
                        }

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
                    </Route>

                    <Route
                        element={
                            <Suspense fallback={<PageLoadingSpinner />}>
                                <PostLayout />
                            </Suspense>
                        }
                    >
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
                </Route>
            </Route>
        )
    )

    return <RouterProvider router={router} />
}

export default App;
