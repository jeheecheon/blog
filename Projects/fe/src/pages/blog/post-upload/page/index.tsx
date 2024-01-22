import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Button } from '@/common/components/Button';

import pooh from '@/common/assets/images/default/pooh.png';

const PostUpload = () => {
  const [value, setValue] = useState('');
  const [bannerImageUrl, setBannerImageUrl] = useState(pooh);

  return (
    <div className='flex flex-col items-center gap-5 m-7'>
      <div className='text-2xl text-slate-600 font-medium'>새 글 쓰기</div>

      <div className='flex flex-col items-center'>

        <img src={bannerImageUrl} alt="place for banner image preview" className='w-full border-2' />
        <Button>
          Upload Image
        </Button>
      </div>

      <ReactQuill theme="snow" value={value}
        className='max-w-[780px] w-full'
        onChange={(val) => {
          console.log(val);
          setValue(val);
        }} />

      <div className='flex flex-row justify-center gap-3 '>
        <Button>
          Upload
        </Button>
        <Button>
          Draft
        </Button>
      </div>
    </div>
  )
}

export default PostUpload;
