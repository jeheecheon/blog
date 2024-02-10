import { useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import Button from '@/common/components/Button';

import { useDispatch, useSelector } from 'react-redux';
import { setBannerImageUrl } from '@/common/redux/bannerSlice';
import ArticleLayout from '@/common/components/post/ArticleLayout';
import Article from '@/common/components/post/Article';
import { RootState } from '@/common/redux/store';
import QuillToolbar from './components/quill/CustomQuillToolbar';
import { redoChange, undoChange } from './utill/quill';
import CustomQuillToolbar from './components/quill/CustomQuillToolbar';
import CustomQuill from './components/quill/CustomQuill';

const PostEdit = () => {
  const dispatch = useDispatch();
  const leafCategories = useSelector((state: RootState) => state.category.leafCategories);

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [selectedCategory, setCategory] = useState<string>(leafCategories[0].Id);

  const handleUpload: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    console.log(JSON.stringify({
      title,
      category: selectedCategory,
      content
    }))
    fetch("/api/blog/post/upload",
      {
        credentials: "same-origin",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          category_id: selectedCategory,
          content
        })
      })
      .then(res => console.log(res))
      .catch(e => console.error(e));
  }

  return (<>
    {showPreview
      ?
      <ArticleLayout>
        <Article
          post={{
            Id: "",
            CommentCnt: 0,
            LikeCnt: 0,
            Title: title,
            Content: content,
            UploadedAt: new Date(Date.now()),
            CategoryId: selectedCategory
          }}
        />
      </ArticleLayout>
      :
      <div className='flex flex-col items-center gap-5 m-7'>
        <div className='text-2xl text-slate-600 font-medium'>새 글 쓰기</div>

        <div className='flex items-center gap-3'>
          <input type='file' className='border-2' onInput={(e) => {
            e.preventDefault();
            setSelectedFiles(e.currentTarget.files);
          }} />
          <Button onClick={(e) => {
            e.preventDefault();
            if (selectedFiles !== undefined && selectedFiles !== null) {
              dispatch(setBannerImageUrl(URL.createObjectURL(selectedFiles[0])));
            }
          }}>
            Preview Banner
          </Button>
        </div>

        <label>
          Choose Category:
          <select className='ml-2 border-2' defaultValue={leafCategories[0].Id}
            onChange={(e) => setCategory(e.currentTarget.value)}>
            {
              leafCategories.map((cate) => {
                return <option key={cate.Id} value={cate.Id}>{cate.Id}</option>
              })
            }
          </select>
        </label>

        <label className='text-slate-700 font-bold text-lg'>
          제목:
          <input className='border-2 ml-2'
            onInput={(e) => setTitle(e.currentTarget.value)} />
        </label>

        <div className='max-w-[780px]'>
          <CustomQuillToolbar />
          <CustomQuill
            setContent={setContent}
            content={content}
          />
        </div>

        <div className='flex flex-row justify-center gap-3 '>
          <Button onClick={handleUpload}>
            Upload
          </Button>
        </div>
      </div>
    }
    <div className='flex justify-center mb-6'>
      <Button className='mx-auto'
        onClick={(e) => {
          e.preventDefault();
          setShowPreview(!showPreview)
        }}>
        {showPreview ? "Edit" : "Preview"}
      </Button>
    </div>
  </>
  )
}

export default PostEdit



