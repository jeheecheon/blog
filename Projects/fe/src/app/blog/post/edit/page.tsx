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
import { handleError, throwError, throwResponse } from "@/_utils/responses";
import CustomQuillToolbar from "@/blog/post/edit/_components/quill/CustomQuillToolbar";
import { serverUrl } from "@/_utils/site";
import { Helmet } from "react-helmet-async";

const PostEdit = () => {
    const dispatch = useDispatch();
    const leafCategories = useSelector(
        (state: RootState) => state.category.leafCategories
    );

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
        dispatch(setCoverImageUrl(defaultCoverImage));

        return () => {
            dispatch(setCoverImageUrl(""));
        };
    }, []);

    const fetchPostsList = () =>
        fetch(`${serverUrl}/api/blog/posts/list`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throwResponse(res);
            })
            .then((PostSummary: PostSummary[]) => {
                if (PostSummary && PostSummary.length > 0) {
                    convertStringIntoDate(PostSummary);
                    sortPostsByUploadedAt(PostSummary);
                    setPostsList(PostSummary);
                    // handlePostIdSelected(PostSummary[0].Id);
                }
            })
            .catch((error) => {
                handleError(error);
                alert("Error occured while fecthing a list of posts..");
            });

    const handlePostIdSelected = (selectedPostId: string) => {
        setSelectedPostIdToEdit(selectedPostId);
        setPostEditing({} as PostInfo);

        if (selectedPostId !== "")
            fetch(
                `${serverUrl}/api/blog/post/${selectedPostId}/with-metadata`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "jwt"
                        )}`,
                    },
                }
            )
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
                            dispatch(setCoverImageUrl(post.Cover));
                        } else {
                            dispatch(setCoverImageUrl(defaultCoverImage));
                        }
                    }
                })
                .catch((error) => {
                    handleError(error);
                    alert("Failed to fetch the post info...");
                });
        else {
            dispatch(setCoverImageUrl(defaultCoverImage));
        }
    };

    const handleUpdateClicked: React.MouseEventHandler<
        HTMLButtonElement
    > = () => {
        if (confirm("You want to update the post, right?"))
            fetch(
                `${serverUrl}/api/blog/post/update?set_edited_date_as_null=${updateEditedDateAsNull}&set_edited_date=${updateEditedDate}&set_uploaded_date=${updateUploadedDate}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "jwt"
                        )}`,
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
                    } else {
                        throwResponse(res);
                    }
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
            fetch(`${serverUrl}/api/blog/post/${postEditing?.Id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
                },
                method: "DELETE",
            })
                .then((res) => {
                    if (res.ok) {
                        setSelectedPostIdToEdit("");
                        fetchPostsList();
                        setPostEditing({} as PostInfo);
                    } else {
                        throwResponse(res);
                    }
                })
                .catch((err) => {
                    alert("Failed to delete the selected post");
                    handleError(err);
                });
    };

    const handleUploadEmptyPostClicked = () => {
        fetch(`${serverUrl}/api/blog/post/upload-empty`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    fetchPostsList();
                } else {
                    throwResponse(res);
                }
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
                fetch(
                    `${serverUrl}/api/blog/posts/${postEditing?.Id}/images/upload`,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem(
                                "jwt"
                            )}`,
                        },
                        method: "POST",
                        body: formData,
                    }
                )
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        } else {
                            throwResponse(res);
                        }
                    })
                    .then((imageUrl) => {
                        if (imageUrl && postEditing) {
                            console.log(imageUrl);
                            dispatch(setCoverImageUrl(imageUrl));
                            setPostEditing({
                                ...postEditing,
                                Cover: imageUrl,
                            });
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
                className={`flex flex-col items-center mt-[20vh] text-default-15-dark dark:text-default-15 max-w-[768px] mx-auto
                ${showPreview && "hidden"}`}
            >
                <p className="text-2xl font-medium mt-2">글 작성</p>

                {/* selection for posts to edit */}
                <select
                    id="post-id-select"
                    value={selectedPostIdToEdit}
                    onChange={(e) =>
                        handlePostIdSelected(e.currentTarget.value)
                    }
                    className="mt-2 text-default-18-dark dark:text-default-18 outline-none focus:outline-none w-full
                            bg-default-3 dark:bg-default-3-dark border-[1px] border-default-10 dark:border-default-6-dark"
                >
                    <option value={""}>Select a post</option>
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
                </select>

                <div className="flex my-2 gap-2 justify-end w-full">
                    {postEditing?.Id && (
                        <div>
                            {/* input tag for inserting images */}
                            <input
                                id="IdOfPostEditing"
                                type="text"
                                value={postEditing?.Id}
                                onChange={() => {}}
                                className="invisible absolute"
                            />

                            {/* Cover Image Upload button */}
                            <Button>
                                <label className="flex items-center gap-3 text-default-16-dark dark:text-default-16 text-nowrap">
                                    Change Cover
                                    <input
                                        type="file"
                                        className="border-2 hidden"
                                        onInput={handleCoverChosen}
                                    />
                                </label>
                            </Button>
                        </div>
                    )}

                    {/* Create post button */}
                    <Button
                        onClick={handleUploadEmptyPostClicked}
                        className="text-default-16-dark dark:text-default-16 text-nowrap"
                    >
                        Create Post
                    </Button>
                </div>
                {postEditing?.Id && (
                    <>
                        <div className="sticky top-0 z-[50] mt-2">
                            <div className="flex">
                                {/* Title input */}
                                <input
                                    value={postEditing.Title}
                                    onChange={(e) =>
                                        setPostEditing({
                                            ...postEditing,
                                            Title: e.currentTarget.value,
                                        })
                                    }
                                    className="w-full pl-2 text-default-10-dark py-2 focus:outline-none outline-none
                                        bg-white border-[1px] border-default-10"
                                />

                                {/* Category selection */}
                                <select
                                    className="text-default-10-dark focus:outline-none outline-none
                                        bg-white border-[1px] border-default-10"
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
                                </select>
                            </div>

                            <CustomQuillToolbar className="w-full bg-white opacity-100" />
                        </div>
                        <CustomQuill
                            setContent={(value) => {
                                setPostEditing({
                                    ...postEditing,
                                    Content: value,
                                });
                            }}
                            content={postEditing.Content}
                            className="bg-white text-default-1-dark w-full"
                        />
                    </>
                )}
            </div>
            {postEditing?.Id && (
                <div
                    className={`flex flex-col w-full gap-3 pb-10 mx-auto px-1 mt-2
                    text-default-18-dark dark:text-default-18
                    ${showPreview ? "max-w-[768px]" : "max-w-[768px]"}`}
                >
                    <label>
                        Public:&#160;
                        <input
                            type="checkbox"
                            checked={postEditing!.IsPublic}
                            onChange={() =>
                                setPostEditing({
                                    ...postEditing!,
                                    IsPublic: !postEditing!.IsPublic,
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
                                setUpdateUploadedDate(!updateUploadedDate);
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

                    <div className="flex justify-center gap-3 flex-wrap mt-2">
                        <Button
                            onClick={handleUpdateClicked}
                            className="text-sky-500 dark:text-sky-600 font-medium"
                        >
                            Update
                        </Button>

                        <Button
                            onClick={handleDeleteClicked}
                            className="text-red-500 dark:text-red-500 font-medium"
                        >
                            Delete
                        </Button>

                        <Button
                            onClick={() => {
                                setShowPreview(!showPreview);
                            }}
                            className="font-medium"
                        >
                            {showPreview ? "Edit" : "Preview"}
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default PostEdit;
