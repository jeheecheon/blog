import { Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import {
    PostLoader,
    PostEditLoader,
    AboutMeLoader,
    PrivacyPolicyLoader,
} from "@/_utils/loaders";
import { AuthenticateUserAsync } from "@/blog/_utils/user";
import PageLoadingSpinner from "@/_components/PageLoadingSpinner";
import { fetchLeafCategoriesAsync } from "@/blog/_utils/category";

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

const App = () => {
    const dispatch = useDispatch();

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route errorElement={<ErrorArea />}>
                {/* Root */}
                <Route
                    path="/"
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
                            <BlogInitialLoad />
                        </Suspense>
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
                        />
                        <Route
                            path="/blog/categories/:category/pages/:page"
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
                            path="/blog/post/:id/:slug?"
                            element={
                                <Suspense fallback={<PageLoadingSpinner />}>
                                    <Post />
                                </Suspense>
                            }
                            loader={PostLoader}
                        />

                        <Route
                            path="/blog/about-me"
                            element={
                                <Suspense fallback={<PageLoadingSpinner />}>
                                    <Post />
                                </Suspense>
                            }
                            loader={AboutMeLoader}
                        />

                        <Route
                            path="/blog/privacy-policy"
                            element={
                                <Suspense fallback={<PageLoadingSpinner />}>
                                    <Post />
                                </Suspense>
                            }
                            loader={PrivacyPolicyLoader}
                        />

                        <Route
                            path="/blog/post/edit"
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
    );

    return <RouterProvider router={router} />;
};

export default App;
