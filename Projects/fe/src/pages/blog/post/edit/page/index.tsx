import { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import Button from '@/common/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setCoverImageUrl } from '@/common/redux/bannerSlice';
import ArticleLayout from '@/common/components/post/ArticleLayout';
import ArticleContent from '@/common/components/post/ArticleContent';
import { RootState } from '@/common/redux/store';
import CustomQuill from '@/pages/blog/post/edit/page/components/quill/CustomQuill';
import { PostInfo, PostSummary } from '@/common/types/Post';
import { convertStringIntoDate, sortPostsByUploadedAt } from '@/common/utils/post';
import { image } from '@/common/utils/siteInfo';
import { PropagateResponse } from '@/common/utils/responses';

const PostEdit = () => {
  const dispatch = useDispatch();
  const leafCategories = useSelector((state: RootState) => state.category.leafCategories);

  const [coverPriviewUrl, setCoverPreviewUrl] = useState<string | ArrayBuffer | null>(image);
  const [postsList, setPostsList] = useState<PostSummary[]>();
  const [selectedPostIdToEdit, setSelectedPostIdToEdit] = useState("");
  const [postEditing, setPostEditing] = useState<PostInfo>();
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [updatePublishedDate, setUpdatePublishedDate] = useState<boolean>(false);

  useEffect(() => {
    fetchPostsList();

    return () => {
      dispatch(setCoverImageUrl(image))
    }
  }, []);

  const fetchPostsList = () =>
    fetch("/api/blog/posts/list", {
      credentials: "same-origin"
    })
      .then(res => {
        if (res.ok)
          return res.json();
        else
          PropagateResponse(res)
      })
      .then((res: PostSummary[]) => {
        if (res !== null && res !== undefined) {
          convertStringIntoDate(res);
          sortPostsByUploadedAt(res);
          setPostsList(res);
        }
        else {
          PropagateResponse(res);
        }
      })
      .catch(error => {
        alert("Error occured while fecthing a list of posts..");
        console.error(error)
      })

  const handlePostIdSelected: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedPostId = e.currentTarget.value;
    setSelectedPostIdToEdit(selectedPostId);
    setPostEditing({} as PostInfo);

    if (selectedPostId !== "")
      fetch(`/api/blog/post/${selectedPostId}/with-metadata`, {
        credentials: "same-origin"
      })
        .then(res => {
          if (res.ok)
            return res.json();
          else
            PropagateResponse(res);
        })
        .then(res => {
          if (res === null)
            PropagateResponse(res);
          else {
            const post = res as PostInfo;
            convertStringIntoDate(post)
            setPostEditing(post);
            if (post.Cover !== undefined && post.Cover !== null) {
              setCoverPreviewUrl(post.Cover);
              dispatch(setCoverImageUrl(post.Cover));
            }
            else {
              setCoverPreviewUrl(image);
              dispatch(setCoverImageUrl(image));
            }
          }
        })
        .catch((error) => {
          alert("Failed to fetch the post info...");
          console.error(error);
        })
    else {
      setCoverPreviewUrl(image);
      dispatch(setCoverImageUrl(image));
    }
  }

  const handleUpdateClicked: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (confirm("You want to update the post, right?"))
      fetch(`/api/blog/post/update?update_published_date=${updatePublishedDate}`,
        {
          credentials: "same-origin",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postEditing)
        })
        .then(res => {
          if (res.ok)
            fetchPostsList();
          else
            PropagateResponse(res);
        })
        .catch(e => {
          alert("Failed to update the current post");
          console.error(e);
        });
  }

  const handleDeleteClicked: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (confirm("Are you sure you wnat to delete this post?????!"))
      fetch(`/api/blog/post/${postEditing?.Id}`,
        {
          credentials: "same-origin",
          method: "DELETE",
        })
        .then(res => {
          if (res.ok) {
            setSelectedPostIdToEdit("");
            fetchPostsList();
            setPostEditing({} as PostInfo);
          }
          else
            PropagateResponse(res);
        })
        .catch(e => {
          alert("Failed to delete the selected post")
          console.error(e)
        });
  }

  const handleUploadEmptyPostClicked = () => {
    fetch("/api/blog/post/upload-empty",
      {
        credentials: "same-origin",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then(res => {
        if (res.ok)
          fetchPostsList();
        else
          PropagateResponse(res)
      })
      .catch(e => {
        alert("Failed to create an empty post")
        console.error(e)
      });
  }

  const handleCoverChosen: React.FormEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.files !== null && e.currentTarget.files !== undefined) {
      const cover = e.currentTarget.files[0];
      if (cover !== undefined && cover !== null) {
        // Prepare for file transter
        const formData = new FormData();
        formData.append('image', cover)
        fetch(`/api/blog/posts/${postEditing?.Id}/images/upload`, {
          credentials: 'same-origin',
          method: 'POST',
          body: formData
        })
          .then(res => {
            if (res.ok)
              return res.json();
            else
              return PropagateResponse(res);
          })
          .then(res => {
            if (res !== null && res !== undefined
              && postEditing !== null && postEditing !== undefined) {
              console.log(res.imageUrl);
              dispatch(setCoverImageUrl(res.imageUrl));
              setPostEditing({
                ...postEditing, Cover: res.imageUrl
              })
              setCoverPreviewUrl(res.imageUrl)
            }
            else
              PropagateResponse(res);
          })
          .catch(error => {
            alert("Failed to upload the selected image to s3")
            console.error(error)
          })
      }
    }
  }

  return (
    <>
      {
        showPreview && postEditing &&
        <ArticleLayout >
          <ArticleContent
            post={{ ...postEditing, LikeCnt: 1004 }}
          />
        </ArticleLayout>
      }

      <div className={`flex flex-col items-center
      ${showPreview && "hidden"}`}>
        <div className='max-w-[780px] flex flex-col items-center w-full gap-5 my-10 p-3'>

          <p className='text-2xl text-slate-600 font-medium'>글 쓰기</p>

          {/* selection for posts to edit */}
          <label className='flex overflow-x-hidden'>
            Post:&#160;
            <select
              id='post-id-select'
              value={selectedPostIdToEdit}
              onChange={handlePostIdSelected}
              className='max-w-[50vw]'
            >
              {postsList && postsList.map(p =>
                <option key={p.Id} value={p.Id}>
                  {/* {`Title: ${p.Title} | Date: ${p.UploadedAt.toLocaleString()}`} */}
                  {/* {`Title: ${p.Title} | Date: ${p.UploadedAt.toLocaleString()} | ID: ${p.Id}`} */}
                  {`ID: ${p.Id} | Title: ${p.Title} | Date: ${p.UploadedAt.toLocaleString()}`}
                </option>
              )}
              <option value={""}>Select a post</option>
            </select>
          </label>

          {/* Create Empty post button */}
          <Button
            onClick={handleUploadEmptyPostClicked}
            className='text-slate-700'
          >
            Make an empty post
          </Button>

          {
            postEditing?.Id &&
            <div className='flex flex-col gap-3'>

              {/* Separator */}
              <div className='block h-1 mb-5 w-full border-b-2 border-dashed border-b-slate-500' />

              {/* input for inserting images */}
              <input
                id='IdOfPostEditing'
                type='text'
                value={postEditing.Id}
                onChange={() => { }}
                className='hidden'
              />

              {/* Cover Image Upload */}
              <div className='flex flex-col gap-2 items-center mb-3'>
                <img
                  src={typeof coverPriviewUrl === "string" ? coverPriviewUrl : undefined}
                  className='w-[70vw] md:w-[50vw]'
                />
                <Button>
                  <label className='flex items-center gap-3 text-slate-700'>
                    Upload Cover
                    <input type='file' className='border-2' onInput={handleCoverChosen} style={{ display: 'none' }} />
                  </label>
                </Button>
              </div>

              {/* Category selection */}
              <label className='flex justify-end'>
                <span className='text-slate-700 text-lg'>Category:&#160;</span>
                <select
                  className='border-[1px]'
                  value={postEditing.CategoryId ? postEditing.CategoryId : ""}
                  onChange={(e) => setPostEditing({
                    ...postEditing, CategoryId: e.currentTarget.value
                  })}>
                  {
                    leafCategories.map((cate) => {
                      return <option key={cate.Id} value={cate.Id}>{cate.Id}</option>
                    })
                  }
                  <option value={""}>Select a category</option>
                </select>
              </label>

              {/* Title input */}
              <input
                value={postEditing.Title}
                onChange={(e) => setPostEditing({
                  ...postEditing, Title: e.currentTarget.value
                })}
                className='w-full border-[1px] pl-2 border-slate-500'
              />

              <div className='max-w-[780px]'>
                <CustomQuill
                  setContent={(value) => {
                    setPostEditing({
                      ...postEditing, Content: value
                    })
                  }}
                  content={postEditing.Content}
                  className='bg-white'
                />
              </div>

              <label className='text-slate-700'>
                Public:&#160;
                <input type='checkbox' checked={postEditing.IsPublic} onChange={
                  () => setPostEditing({
                    ...postEditing, IsPublic: !postEditing.IsPublic
                  })}
                />
              </label>

              <label className='text-slate-700'>
                Update published date:&#160;
                <input type='checkbox' checked={updatePublishedDate} onChange={
                  () => setUpdatePublishedDate(!updatePublishedDate)
                }
                />
              </label>
            </div>
          }
        </div>
      </div>

      {
        selectedPostIdToEdit &&
        <div className='flex flex-row flex-wrap justify-center gap-3 mb-3'>
          <Button
            onClick={handleDeleteClicked}
            className='text-red-500'
          >
            Delete
          </Button>
          <Button
            onClick={handleUpdateClicked}
            className='text-blue-500'
          >
            Update
          </Button>
          <Button
            onClick={() => { setShowPreview(!showPreview) }}>
            {showPreview ? "Edit" : "Preview"}
          </Button>
        </div>
      }
    </>
  )
}

export default PostEdit



