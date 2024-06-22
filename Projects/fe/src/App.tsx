import { Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import {
    postLoader,
    postEditLoader,
    privacyPolicyLoader,
} from "@/_utils/loaders";
import { authenticateUserAsync } from "@/_utils/user";
import { fetchLeafCategoriesAsync } from "@/_utils/category";

import PageLoadingSpinner from "@/_components/PageLoadingSpinner";
const ErrorArea = lazy(() => import("@/_components/ErrorArea"));
const Blog = lazy(() => import("@/page"));
const BlogLayout = lazy(() => import("@/_components/Layout"));
const Post = lazy(() => import("@/post/page"));
const PostLayout = lazy(() => import("@/post/_components/Layout"));
const PostEdit = lazy(() => import("@/post/edit/page"));
const PostsWrapper = lazy(() => import("@/posts/_components/PostsWrapper"));
const BlogInitialLoad = lazy(() => import("@/_components/BlogInitialLoad"));
import OauthGoogleSignin from "@/oauth/google/sign-in/page";

const App = () => {
    const dispatch = useDispatch();

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route errorElement={<ErrorArea />}>
                <Route
                    element={
                        <Suspense fallback={<PageLoadingSpinner />}>
                            <BlogInitialLoad />
                        </Suspense>
                    }
                    loader={async () => {
                        authenticateUserAsync(dispatch);
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
                            path="/"
                            element={
                                <Suspense fallback={<PageLoadingSpinner />}>
                                    <Blog />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/recent-posts/pages/:page"
                            element={
                                <Suspense fallback={<PageLoadingSpinner />}>
                                    <PostsWrapper />
                                </Suspense>
                            }
                            // loader={postPageCntLoader}
                        />
                        <Route
                            path="/categories/:category/pages/:page"
                            element={
                                <Suspense fallback={<PageLoadingSpinner />}>
                                    <PostsWrapper />
                                </Suspense>
                            }
                            // loader={postPageCntLoader}
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
                            path="/post/:id/:slug?"
                            element={
                                <Suspense fallback={<PageLoadingSpinner />}>
                                    <Post />
                                </Suspense>
                            }
                            loader={postLoader}
                        />

                        {/* <Route
                            path="/about-me"
                            element={
                                <Suspense fallback={<PageLoadingSpinner />}>
                                    <Post />
                                </Suspense>
                            }
                            loader={aboutMeLoader}
                        /> */}

                        <Route
                            path="/privacy-policy"
                            element={
                                <Suspense fallback={<PageLoadingSpinner />}>
                                    <Post />
                                </Suspense>
                            }
                            loader={privacyPolicyLoader}
                        />

                        <Route
                            path="/post/edit"
                            element={
                                <Suspense fallback={<PageLoadingSpinner />}>
                                    <PostEdit />
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
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
