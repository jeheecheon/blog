import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Button from "@/blog/_components/Button";
import { useDispatch, useSelector } from "react-redux";
import { setCoverImageUrl } from "@/_redux/coverSlice";
import ArticleLayout from "@/blog/post/_components/ArticleLayout";
import ArticleContent from "@/blog/post/_components/ArticleContent";
import { RootState } from "@/_redux/store";
import CustomQuill from "@/blog/post/edit/_components/quill/CustomQuill";
import { PostInfo, PostSummary } from "@/blog/_types/Post";
import {
    convertStringIntoDate,
    sortPostsByUploadedAt,
} from "@/blog/_utils/post";
import { defaultCoverImage, url } from "@/_utils/siteInfo";
import { Helmet } from "react-helmet";
import { handleError, throwError, throwResponse } from "@/_utils/responses";

const PostEdit = () => {
    const dispatch = useDispatch();
    const leafCategories = useSelector(
        (state: RootState) => state.category.leafCategories
    );

    const [coverPriviewUrl, setCoverPreviewUrl] = useState<
        string | ArrayBuffer | null
    >(defaultCoverImage);
    const [postsList, setPostsList] = useState<PostSummary[]>();
    const [selectedPostIdToEdit, setSelectedPostIdToEdit] = useState("");
    const [postEditing, setPostEditing] = useState<PostInfo>();
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const [updateEditedDate, setUpdateEditedDate] = useState<boolean>(false);
    const [updateEditedDateAsNull, setUpdateEditedDateAsNull] =
        useState<boolean>(false);
    const [updateUploadedDate, setUpdateUploadedDate] =
        useState<boolean>(false);

    useEffect(() => {
        fetchPostsList();

        return () => {
            dispatch(setCoverImageUrl(defaultCoverImage));
        };
    }, []);

    const fetchPostsList = () =>
        fetch("/api/blog/posts/list", {
            credentials: "same-origin",
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throwResponse(res);
            })
            .then((PostSummary: PostSummary[]) => {
                if (PostSummary) {
                    convertStringIntoDate(PostSummary);
                    sortPostsByUploadedAt(PostSummary);
                    setPostsList(PostSummary);
                } else {
                    throwError("PostSummary is null or undefined");
                }
            })
            .catch((error) => {
                handleError(error);
                alert("Error occured while fecthing a list of posts..");
            });

    const handlePostIdSelected: React.ChangeEventHandler<HTMLSelectElement> = (
        e
    ) => {
        const selectedPostId = e.currentTarget.value;
        setSelectedPostIdToEdit(selectedPostId);
        setPostEditing({} as PostInfo);

        if (selectedPostId !== "")
            fetch(`/api/blog/post/${selectedPostId}/with-metadata`, {
                credentials: "same-origin",
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    throwResponse(res);
                })
                .then((post: PostInfo) => {
                    if (!post) {
                        throwError("Post is null or undefined");
                    } else {
                        convertStringIntoDate(post);
                        setPostEditing(post);
                        if (post.Cover !== undefined && post.Cover !== null) {
                            setCoverPreviewUrl(post.Cover);
                            dispatch(setCoverImageUrl(post.Cover));
                        } else {
                            setCoverPreviewUrl(defaultCoverImage);
                            dispatch(setCoverImageUrl(defaultCoverImage));
                        }
                    }
                })
                .catch((error) => {
                    handleError(error);
                    alert("Failed to fetch the post info...");
                });
        else {
            setCoverPreviewUrl(defaultCoverImage);
            dispatch(setCoverImageUrl(defaultCoverImage));
        }
    };

    const handleUpdateClicked: React.MouseEventHandler<
        HTMLButtonElement
    > = () => {
        if (confirm("You want to update the post, right?"))
            fetch(
                `/api/blog/post/update?set_edited_date_as_null=${updateEditedDateAsNull}&set_edited_date=${updateEditedDate}&set_uploaded_date=${updateUploadedDate}`,
                {
                    credentials: "same-origin",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(postEditing),
                }
            )
                .then((res) => {
                    if (res.ok) {
                        fetchPostsList();
                        setUpdateEditedDate(false);
                        setUpdateEditedDateAsNull(false);
                        setUpdateUploadedDate(false);
                    }
                    throwResponse(res);
                })
                .catch((err) => {
                    alert("Failed to update the current post");
                    handleError(err);
                });
    };

    const handleDeleteClicked: React.MouseEventHandler<
        HTMLButtonElement
    > = () => {
        if (confirm("Are you sure you wnat to delete this post?????!"))
            fetch(`/api/blog/post/${postEditing?.Id}`, {
                credentials: "same-origin",
                method: "DELETE",
            })
                .then((res) => {
                    if (res.ok) {
                        setSelectedPostIdToEdit("");
                        fetchPostsList();
                        setPostEditing({} as PostInfo);
                    }
                    throwResponse(res);
                })
                .catch((err) => {
                    alert("Failed to delete the selected post");
                    handleError(err);
                });
    };

    const handleUploadEmptyPostClicked = () => {
        fetch("/api/blog/post/upload-empty", {
            credentials: "same-origin",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) fetchPostsList();
                throwResponse(res);
            })
            .catch((e) => {
                alert("Failed to create an empty post");
                handleError(e);
            });
    };

    const handleCoverChosen: React.FormEventHandler<HTMLInputElement> = (e) => {
        if (
            e.currentTarget.files !== null &&
            e.currentTarget.files !== undefined
        ) {
            const cover = e.currentTarget.files[0];
            if (cover !== undefined && cover !== null) {
                // Prepare for file transter
                const formData = new FormData();
                formData.append("image", cover);
                fetch(`/api/blog/posts/${postEditing?.Id}/images/upload`, {
                    credentials: "same-origin",
                    method: "POST",
                    body: formData,
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        }
                        throwResponse(res);
                    })
                    .then((imageUrl) => {
                        if (imageUrl && postEditing) {
                            console.log(imageUrl);
                            dispatch(setCoverImageUrl(imageUrl));
                            setPostEditing({
                                ...postEditing,
                                Cover: imageUrl,
                            });
                            setCoverPreviewUrl(imageUrl);
                        } else {
                            throwError("Image URL is null or undefined");
                        }
                    })
                    .catch((error) => {
                        alert("Failed to upload the selected image to s3");
                        handleError(error);
                    });
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>Edit | jeheecheon</title>
                <link rel="canonical" href={url} />
                <meta name="description" content="Blog post edit page" />
                <meta name="keywords" content="tech, blog, jeheecheon" />
                <meta name="author" content="jeheecheon" />/
                <meta property="og:title" content="Edit | jeheecheon" />
                <meta property="og:description" content="Blog post edit page" />
                <meta property="og:image" content={defaultCoverImage} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="jeheecheon" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="og:url" content={url} />
                <meta name="twitter:title" content="Edit | jeheecheon" />
                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:description"
                    content="Blog post edit page"
                />
                <meta name="twitter:image" content={defaultCoverImage} />
            </Helmet>

            {showPreview && postEditing && (
                <ArticleLayout>
                    <ArticleContent post={{ ...postEditing, LikeCnt: 1004 }} />
                </ArticleLayout>
            )}

            <div
                className={`flex flex-col items-center mt-[10vh]
                ${showPreview && "hidden"}`}
            >
                <div className="max-w-[780px] flex flex-col items-center w-full gap-5 my-10 p-3 text-default-13">
                    <p className="text-2xl font-medium">글 쓰기</p>

                    {/* selection for posts to edit */}
                    <label className="flex overflow-x-hidden">
                        Post:&#160;
                        <select
                            id="post-id-select"
                            value={selectedPostIdToEdit}
                            onChange={handlePostIdSelected}
                            className="max-w-[50vw] text-default-18-dark dark:text-default-18
                            bg-default-3 dark:bg-default-3-dark border-[1px] border-slate-200 dark:border-slate-500"
                        >
                            {postsList &&
                                postsList.map((p) => (
                                    <option key={p.Id} value={p.Id}>
                                        {/* {`Title: ${p.Title} | Date: ${p.UploadedAt.toLocaleString()}`} */}
                                        {/* {`Title: ${p.Title} | Date: ${p.UploadedAt.toLocaleString()} | ID: ${p.Id}`} */}
                                        {`ID: ${p.Id} | Title: ${
                                            p.Title
                                        } | Date: ${p.UploadedAt.toLocaleString()}`}
                                    </option>
                                ))}
                            <option value={""}>Select a post</option>
                        </select>
                    </label>

                    {/* Create Empty post button */}
                    <Button
                        onClick={handleUploadEmptyPostClicked}
                        className="text-default-16-dark dark:text-default-16"
                    >
                        Make an empty post
                    </Button>

                    {postEditing?.Id && (
                        <div className="flex flex-col gap-3">
                            {/* Separator */}
                            <div className="block h-1 mb-5 w-full border-b-2 border-dashed border-b-slate-500" />

                            {/* input for inserting images */}
                            <input
                                id="IdOfPostEditing"
                                type="text"
                                value={postEditing.Id}
                                onChange={() => {}}
                                className="hidden"
                            />

                            {/* Cover Image Upload */}
                            <div className="flex flex-col gap-2 items-center mb-3">
                                <img
                                    src={
                                        typeof coverPriviewUrl === "string"
                                            ? coverPriviewUrl
                                            : undefined
                                    }
                                    className="w-[70vw] md:w-[50vw]"
                                />
                                <Button>
                                    <label className="flex items-center gap-3 text-default-16-dark dark:text-default-16">
                                        Upload Cover
                                        <input
                                            type="file"
                                            className="border-2 hidden"
                                            onInput={handleCoverChosen}
                                        />
                                    </label>
                                </Button>
                            </div>

                            {/* Category selection */}
                            <label className="flex justify-end">
                                <span className="text-lg">Category:&#160;</span>
                                <select
                                    className="text-default-18-dark dark:text-default-18
                                    bg-default-3 dark:bg-default-3-dark border-[1px] border-slate-200 dark:border-slate-500"
                                    value={
                                        postEditing.CategoryId
                                            ? postEditing.CategoryId
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setPostEditing({
                                            ...postEditing,
                                            CategoryId: e.currentTarget.value,
                                        })
                                    }
                                >
                                    {leafCategories.map((cate) => {
                                        return (
                                            <option
                                                key={cate.Id}
                                                value={cate.Id}
                                            >
                                                {cate.Id}
                                            </option>
                                        );
                                    })}
                                    <option value={""}>
                                        Select a category
                                    </option>
                                </select>
                            </label>

                            {/* Title input */}
                            <input
                                value={postEditing.Title}
                                onChange={(e) =>
                                    setPostEditing({
                                        ...postEditing,
                                        Title: e.currentTarget.value,
                                    })
                                }
                                className="w-full pl-2 text-default-18-dark dark:text-default-18
                                bg-default-3 dark:bg-default-3-dark border-[1px] border-slate-200 dark:border-slate-500"
                            />

                            <div className="max-w-[780px]">
                                <CustomQuill
                                    setContent={(value) => {
                                        setPostEditing({
                                            ...postEditing,
                                            Content: value,
                                        });
                                    }}
                                    content={postEditing.Content}
                                    className="bg-white text-default-1-dark"
                                />
                            </div>

                            <label>
                                Public:&#160;
                                <input
                                    type="checkbox"
                                    checked={postEditing.IsPublic}
                                    onChange={() =>
                                        setPostEditing({
                                            ...postEditing,
                                            IsPublic: !postEditing.IsPublic,
                                        })
                                    }
                                />
                            </label>

                            <label>
                                Reset uploaded date:&#160;
                                <input
                                    type="checkbox"
                                    checked={updateUploadedDate}
                                    onChange={() => {
                                        if (!updateUploadedDate)
                                            setUpdateEditedDateAsNull(true);
                                        setUpdateUploadedDate(
                                            !updateUploadedDate
                                        );
                                        setUpdateEditedDate(false);
                                    }}
                                />
                            </label>

                            <label>
                                Update edited date:&#160;
                                <input
                                    type="checkbox"
                                    checked={updateEditedDate}
                                    onChange={() => {
                                        if (updateUploadedDate) return;
                                        if (!updateEditedDate)
                                            setUpdateEditedDateAsNull(false);
                                        setUpdateEditedDate(!updateEditedDate);
                                    }}
                                />
                            </label>

                            <label>
                                Set edited date as null:&#160;
                                <input
                                    type="checkbox"
                                    checked={updateEditedDateAsNull}
                                    onChange={() => {
                                        if (updateUploadedDate) return;
                                        if (!updateEditedDateAsNull)
                                            setUpdateEditedDate(false);
                                        setUpdateEditedDateAsNull(
                                            !updateEditedDateAsNull
                                        );
                                    }}
                                />
                            </label>
                        </div>
                    )}
                </div>
            </div>

            {selectedPostIdToEdit && (
                <div className="flex flex-row flex-wrap justify-center gap-3 pb-10">
                    <Button
                        onClick={handleDeleteClicked}
                        className="text-red-500 dark:text-red-500"
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={handleUpdateClicked}
                        className="text-blue-500 dark:text-blue-500"
                    >
                        Update
                    </Button>
                    <Button
                        onClick={() => {
                            setShowPreview(!showPreview);
                        }}
                    >
                        {showPreview ? "Edit" : "Preview"}
                    </Button>
                </div>
            )}
        </>
    );
};

export default PostEdit;
