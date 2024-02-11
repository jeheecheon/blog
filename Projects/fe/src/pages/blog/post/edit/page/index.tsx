import { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import Button from '@/common/components/Button';

import { useDispatch, useSelector } from 'react-redux';
import { setCoverImageUrl } from '@/common/redux/bannerSlice';
import ArticleLayout from '@/common/components/post/ArticleLayout';
import Article from '@/common/components/post/Article';
import { RootState } from '@/common/redux/store';
import CustomQuillToolbar from './components/quill/CustomQuillToolbar';
import CustomQuill from './components/quill/CustomQuill';
import { PostInfo, PostSummary } from '@/common/types/Post';
import { convertStringDateIntoDate } from '@/common/utils/post';

const PostEdit = () => {
  const dispatch = useDispatch();
  const leafCategories = useSelector((state: RootState) => state.category.leafCategories);

  const [postsList, setPostsList] = useState<PostSummary[]>();
  const [selectedPostIdToEdit, setSelectedPostIdToEdit] = useState("");
  const [postEditing, setPostEditing] = useState<PostInfo>();
  const [showPreview, setShowPreview] = useState<boolean>(false);

  useEffect(() => {
    fetchPostsList();
  }, []);

  const fetchPostsList = () =>
    fetch("/api/blog/posts/list", {
      credentials: "same-origin"
    })
      .then(res => {
        if (res.ok)
          return res.json();
        return null;
      })
      .then(res => {
        if (res !== null && res !== undefined)
          setPostsList(res);
        else
          console.error("Error occured while fecthing a list of posts..");
        return null;
      })

  const handlePostIdSelected: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedPostId = e.currentTarget.value;
    setSelectedPostIdToEdit(selectedPostId);
    if (selectedPostId === "")
      setPostEditing({} as PostInfo);
    else
      fetch(`/api/blog/post/${selectedPostId}/with-metadata`, {
        credentials: "same-origin"
      })
        .then(res => {
          if (res.ok)
            return res.json();
          return null;
        })
        .then(res => {
          if (res === null)
            console.error("something went wrong with my server...");
          else {
            const post = res as PostInfo;
            convertStringDateIntoDate(post)
            setPostEditing(post);
            if (post.Cover !== undefined && post.Cover !== null) {
              dispatch(setCoverImageUrl(post.Cover));
            }
          }
        })
  }

  const handleUpdateClicked: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (confirm("You want to update the post, right?"))
      fetch("/api/blog/post/update",
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
        })
        .catch(e => console.error(e));
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
            fetchPostsList();
            setPostEditing({} as PostInfo);
          }
        })
        .catch(e => console.error(e));
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
      })
      .catch(e => console.error(e));
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
              return null;
          })
          .then(res => {
            if (res !== null && res !== undefined
              && postEditing !== null && postEditing !== undefined) {
              console.log(res.imageUrl);
              dispatch(setCoverImageUrl(res.imageUrl));
              setPostEditing({
                ...postEditing, Cover: res.imageUrl
              })
            }
            return "";
          })
      }
    }
  }

  return (<>
    {
      showPreview && postEditing
        ?
        <ArticleLayout>
          <Article
            post={postEditing}
          />
        </ArticleLayout>
        :

        <div className='flex flex-col items-center gap-5 m-7'>
          <div className='text-2xl text-slate-600 font-medium'>글 쓰기</div>

          <Button onClick={handleUploadEmptyPostClicked}>
            Make an empty post
          </Button>

          <select value={selectedPostIdToEdit} onChange={handlePostIdSelected}>
            {postsList && postsList.map(p =>
              <option key={p.Id} value={p.Id}>
                {`ID: ${p.Id} Title: ${p.Title} Date: ${p.EditedAt ? p.EditedAt : p.UploadedAt}`}
              </option>
            )}
            <option value={""}>Select a post to start editing...</option>
          </select>

          {
            postEditing?.Id &&
            <>
              <div className='flex items-center gap-3'>
                <input type='file' className='border-2' onInput={handleCoverChosen} />
              </div>

              <label>
                Choose Category:
                <select
                  className='ml-2 border-2'
                  value={postEditing.CategoryId ? postEditing.CategoryId : ""}
                  onChange={(e) => setPostEditing({
                    ...postEditing, CategoryId: e.currentTarget.value
                  })}>
                  {
                    leafCategories.map((cate) => {
                      return <option key={cate.Id} value={cate.Id}>{cate.Id}</option>
                    })
                  }
                  <option value={""}>Select a category...</option>

                </select>
              </label>

              <label className='text-slate-700 font-bold text-lg'>
                제목:
                <input
                  value={postEditing.Title}
                  onInput={(e) => setPostEditing({
                    ...postEditing, Title: e.currentTarget.value
                  })}
                  className='border-2 ml-2'
                />
              </label>

              <div className='max-w-[780px]'>
                <input type='text' value={postEditing.Id} id='IdOfPostEditing' className='hidden'/>
                <CustomQuillToolbar />
                <CustomQuill
                  setContent={(value) => {
                    setPostEditing({
                      ...postEditing, Content: value
                    })
                  }}
                  content={postEditing.Content}
                  className='w-full'
                />
              </div>

              <label>
                Public:&#160;
                <input type='checkbox' checked={postEditing.IsPublic} onChange={
                  () => setPostEditing({
                    ...postEditing, IsPublic: !postEditing.IsPublic
                  })}
                />
              </label>
            </>
          }
        </div>
    }
    <div className='flex flex-row justify-center gap-3 '>
      <Button
        onClick={handleDeleteClicked}
        className='bg-red-500'
      >
        Delete
      </Button>
      <Button
        onClick={handleUpdateClicked}
        className='bg-red-500'
      >
        Update
      </Button>
      <Button
        onClick={() => { setShowPreview(!showPreview) }}>
        {showPreview ? "Edit" : "Preview"}
      </Button>
    </div>
  </>
  )
}

export default PostEdit



