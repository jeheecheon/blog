import { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import Button from '@/common/components/Button';

import { useDispatch } from 'react-redux';
import { setBannerImageUrl } from '@/common/redux/bannerSlice';
import ArticleLayout from '@/common/components/ArticleLayout';
import Article from '@/common/components/Article';

import DefaultBannerImageUrl from '@/common/assets/images/default/banner.jpg'

const PostUpload = () => {
  const [content, setContent] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const [bannerUrl, setBannerUrl] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setBannerImageUrl(DefaultBannerImageUrl))
    };
  }, [bannerUrl]);

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

        <div className='flex flex-col items-center gap-3'>
          <input type='text' className='border-2' onInput={(e) => {
            e.preventDefault();
            setBannerUrl(e.currentTarget.value);
          }} />
          <Button onClick={(e) => {
            e.preventDefault();
            dispatch(setBannerImageUrl(bannerUrl));
          }}>
            Preview Banner
          </Button>
          <Button>Upload Banner??</Button>
        </div>

        <ReactQuill theme="snow" value={content}
          className='max-w-[780px] w-full'
          onChange={(val) => {
            console.log(val);
            setContent(val);
          }} />

        <div className='flex flex-row justify-center gap-3 '>
          <Button>
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
