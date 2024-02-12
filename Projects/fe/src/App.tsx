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
const ErrorArea = lazy(() => import('@/common/components/error/ErrorArea'));
const BlogErrorArea = lazy(() => import('@/pages/blog/page/BlogErrorArea'));
const Post = lazy(() => import('@/pages/blog/post/page/index'));
const AboutMe = lazy(() => import('@/pages/blog/about-me/page'));
const PostEdit = lazy(() => import('@/pages/blog/post/edit/page'));
const TestPage = lazy(() => import('@/pages/test/page'));
const PostsFetcher = lazy(() => import('@/common/components/post/PostsFetcher'));

const App = () => {
    const dispatch = useDispatch();

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route
                errorElement={<ErrorArea />}
                loader={async () => {
                    AuthenticateUserAsync(dispatch);
                    return null;
                }}>

                <Route
                    path='/'
                    element={
                        <Suspense fallback={<PageLoadingSpinner />}>
                            <Root />
                        </Suspense>}
                />

                {/* Blog */}
                <Route
                    element={
                        <Suspense fallback={<PageLoadingSpinner />}>
                            <BlogLayout />
                        </Suspense>
                    }
                    errorElement={<BlogErrorArea />}
                    loader={async () => {
                        fetchLeafCategoriesAsync(dispatch);
                        return null;
                    }}
                >
                    <Route
                        path='blog'
                        element={<Blog />}
                    />
                    <Route
                        path='blog/recent-posts/pages/:page'
                        element={<PostsFetcher />}
                    />
                    <Route
                        path='blog/categories/:category/pages/:page'
                        element={<PostsFetcher />}
                    />
                    <Route
                        path='blog/post/:id/:slug?'
                        element={<Post />}
                        loader={PostLoader}
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
                    <Route
                        path='blog/about-me'
                        element={<AboutMe />}
                        loader={AboutMeLoader}
                    />
                    <Route
                        path='blog/privacy-policy'
                        element={<AboutMe />}
                        loader={PrivacyPolicyLoader}
                    />
                    <Route
                        path='test'
                        element={<TestPage />}
                    />
                </Route>

                {/* Diary */}
                <Route
                    path='diary' >
                    < Route
                        path='entry/upload'
                    />
                    < Route
                        path='entry/edit'
                    />
                </Route>
            </Route >
        )
    )

    return <RouterProvider router={router} />
}

export default App;
