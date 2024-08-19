import { Suspense, lazy } from "react";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import { postEditLoader } from "@/_utils/loaders";

import PageLoadingSpinner from "@/_components/spinner/PageLoadingSpinner";

const ErrorArea = lazy(() => import("@/_components/error/ErrorArea"));
const InitialLoad = lazy(() => import("@/_components/layout/InitialLoad"));

const BlogLayout = lazy(() => import("@/layout"));
const PostLayout = lazy(() => import("@/posts/layout"));

import BlogPage from "@/page";
const PostPage = lazy(() => import("@/posts/page"));
const PostsPage = lazy(() => import("@/categories/page"));
const PostEditPage = lazy(() => import("@/posts/edit/page"));

import OauthGoogleSignin from "@/oauth/google/sign-in/page";
import { ErrorBoundary } from "react-error-boundary";

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route
                errorElement={
                    <Suspense fallback={<PageLoadingSpinner />}>
                        <ErrorArea />
                    </Suspense>
                }
            >
                <Route
                    element={
                        <ErrorBoundary fallback={<ErrorArea />}>
                            <Suspense fallback={<PageLoadingSpinner />}>
                                <InitialLoad />
                            </Suspense>
                        </ErrorBoundary>
                    }
                >
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

    return (
        <RouterProvider
            router={router}
            fallbackElement={<PageLoadingSpinner />}
        />
    );
};

export default App;
