import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

export const PostUpload = () => {
  const [value, setValue] = useState('');

  return (
    <div className='flex flex-col items-center gap-5 m-7'>
      <div className='text-2xl text-slate-600 font-medium'>새 글 쓰기</div>
      <ReactQuill theme="snow" value={value} 
      className='max-w-[780px] w-full'
      onChange={(val) => {
        console.log(val);
        setValue(val);
      }} />
    </div>
  )
}
