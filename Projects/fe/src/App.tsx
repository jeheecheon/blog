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
import { authenticateUserAsync } from "@/blog/_utils/user";
import { fetchLeafCategoriesAsync } from "@/blog/_utils/category";

import PageLoadingSpinner from "@/_components/PageLoadingSpinner";
const Root = lazy(() => import("@/page"));
const ErrorArea = lazy(() => import("@/_components/ErrorArea"));
const Blog = lazy(() => import("@/blog/page"));
const BlogLayout = lazy(() => import("@/blog/_components/Layout"));
const Post = lazy(() => import("@/blog/post/page"));
const PostLayout = lazy(() => import("@/blog/post/_components/Layout"));
const PostEdit = lazy(() => import("@/blog/post/edit/page"));
const PostsWrapper = lazy(
    () => import("@/blog/posts/_components/PostsWrapper")
);
const BlogInitialLoad = lazy(
    () => import("@/blog/_components/BlogInitialLoad")
);
import OauthGoogleSignin from "@/oauth/google/sign-in/page";

const App = () => {
    const dispatch = useDispatch();

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route errorElement={<ErrorArea />}>
                {/* Root */}
                <Route
                    path="/"
                    element={
                        <Suspense
                            fallback={
                                <PageLoadingSpinner boxColor="bg-transparent" />
                            }
                        >
                            <Root />
                        </Suspense>
                    }
                />

                {/* Blog */}
                <Route
                    element={
                        <Suspense
                            fallback={
                                <PageLoadingSpinner boxColor="bg-transparent" />
                            }
                        >
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
                            <Suspense
                                fallback={
                                    <PageLoadingSpinner boxColor="bg-transparent" />
                                }
                            >
                                <BlogLayout />
                            </Suspense>
                        }
                    >
                        <Route
                            path="/blog"
                            element={
                                <Suspense fallback={<PageLoadingSpinner />}>
                                    <Blog />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/blog/recent-posts/pages/:page"
                            element={
                                <Suspense fallback={<PageLoadingSpinner />}>
                                    <PostsWrapper />
                                </Suspense>
                            }
                            // loader={postPageCntLoader}
                        />
                        <Route
                            path="/blog/categories/:category/pages/:page"
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
                            <Suspense
                                fallback={
                                    <PageLoadingSpinner boxColor="bg-transparent" />
                                }
                            >
                                <PostLayout />
                            </Suspense>
                        }
                    >
                        <Route
                            path="/blog/post/:id/:slug?"
                            element={
                                <Suspense fallback={<PageLoadingSpinner />}>
                                    <Post />
                                </Suspense>
                            }
                            loader={postLoader}
                        />

                        {/* <Route
                            path="/blog/about-me"
                            element={
                                <Suspense fallback={<PageLoadingSpinner />}>
                                    <Post />
                                </Suspense>
                            }
                            loader={aboutMeLoader}
                        /> */}

                        <Route
                            path="/blog/privacy-policy"
                            element={
                                <Suspense fallback={<PageLoadingSpinner />}>
                                    <Post />
                                </Suspense>
                            }
                            loader={privacyPolicyLoader}
                        />

                        <Route
                            path="/blog/post/edit"
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
