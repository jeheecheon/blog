import { useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import Button from '@/common/components/Button';

import { useDispatch } from 'react-redux';
import { setBannerImageUrl } from '@/common/redux/bannerSlice';
import ArticleLayout from '@/common/components/ArticleLayout';
import Article from '@/common/components/Article';
import { useLoaderData } from 'react-router-dom';

interface category {
  id: number,
  name: string
}

const PostUpload = () => {
  const dispatch = useDispatch();
  const categories = useLoaderData() as category[];

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [selectedCategory, setCategory] = useState<number>(categories[0].id);

  const handleUpload: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    console.log(JSON.stringify({
          title,
          category: selectedCategory,
          content
        }))
    fetch("/api/blog/post-upload",
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
          publisedDate='2024-01-01'
          categories={['아무', '카테고리']}>
          {content}
        </Article>
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
          <select className='ml-2 border-2' defaultValue={categories[0].id}
            onChange={(e) => setCategory(parseInt(e.currentTarget.value))}>
            {
              categories.map((cate) => {
                return <option key={cate.id} value={cate.id}>{cate.name}</option>
              })
            }
          </select>
        </label>

        <label className='text-slate-700 font-bold text-lg'>
          제목:
          <input className='border-2 ml-2'
            onInput={(e) => setTitle(e.currentTarget.value)} />
        </label>

        <ReactQuill theme="snow" value={content}
          className='max-w-[780px] w-full'
          onChange={(val) => {
            console.log(val);
            setContent(val);
          }} />

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

export default PostUpload
