import { Suspense, lazy } from "react";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import { postEditLoader } from "@/_utils/loaders";

/**
 * Layouts
 */
const BlogLayout = lazy(() => import("@/layout"));
const PostLayout = lazy(() => import("@/posts/layout"));

/**
 * Pages
 */
import BlogPage from "@/page";
const PostPage = lazy(() => import("@/posts/page"));
const PostsPage = lazy(() => import("@/categories/page"));
const PostEditPage = lazy(() => import("@/posts/edit/page"));

/**
 * Other Components
 */
import ErrorArea from "@/_components/error/ErrorArea";
import InitialLoad from "@/_components/layout/InitialLoad";
import OauthGoogleSignin from "@/oauth/google/sign-in/page";
import PageLoadingSpinner from "@/_components/spinner/PageLoadingSpinner";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route errorElement={<ErrorArea />}>
            <Route element={<InitialLoad />}>
                <Route path="/" element={<BlogPage />} />

                <Route
                    element={
                        <Suspense fallback={<PageLoadingSpinner />}>
                            <BlogLayout />
                        </Suspense>
                    }
                >
                    <Route
                        path="/categories/:category"
                        element={
                            <Suspense fallback={<PageLoadingSpinner />}>
                                <PostsPage />
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
                        path="/posts/:id/:slug?"
                        element={
                            <Suspense fallback={<PageLoadingSpinner />}>
                                <PostPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/privacy-policy"
                        element={
                            <Suspense fallback={<PageLoadingSpinner />}>
                                <PostPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/woowacourse"
                        element={
                            <Suspense fallback={<PageLoadingSpinner />}>
                                <PostPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/post/edit"
                        element={
                            <Suspense fallback={<PageLoadingSpinner />}>
                                <PostEditPage />
                            </Suspense>
                        }
                        loader={postEditLoader}
                    />
                </Route>
            </Route>

            <Route
                path="/oauth/google/sign-in"
                element={<OauthGoogleSignin />}
            />
        </Route>
    )
);

export default router;
