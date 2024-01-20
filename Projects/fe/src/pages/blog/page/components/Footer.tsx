export const Footer = () => {
  return (
    <>
      <div className='flex flex-col items-center bg-slate-50 py-[40px] shadow-xl shadow-slate-700'>
        <span className='text-2xl text-slate-600 font-bold'>
          <span className='italic'>JeheeCheon</span>
          <span className='text-blue-500 italic'>*</span>
          <span className='uppercase italic'>Blog</span>
        </span>

        <span className='mt-2 text-slate-600 italic'>
          백엔드 개발을 주로 다루는 블로그입니다.
        </span>

        <span className='mt-10 text-slate-600 text-sm'>
          All designed and developed by&#160;
          <span className='text-blue-600 font-bold'>
            "나, 천제희"
          </span>
        </span>
        <span className='text-slate-600 text-sm'>
          © 2024-present Jehee Cheon. All Rights Reserved.
        </span>
      </div>
    </>

    // <div className='flex flex-row justify-center w-full h-[200px] bg-slate-100 text-slate-600'>

    //   <div className='flex flex-row justify-between max-w-5xl w-full py-5 px-2'>


    //     <div className='flex flex-col grow w-full justify-start items-left'>
    //       <span className='font-medium text-lg'>
    //         Jehee Cheon blog
    //       </span>
    //       <span className=''>Thanks for reading!</span>
    //       <span className='mt-auto text-blue-800 text-pretty'>
    //         © 2024-present Jehee Cheon. All Rights Reserved.
    //       </span>
    //     </div>

    //     <div className='flex flex-row flex-wrap w-full grow text-center'>
    //       <Link className='basis-1/3' to='/blog/posts'>Home</Link>
    //       <Link className='basis-1/3' to='/blog/posts'>Recent posts</Link>
    //       <Link className='basis-1/3' to='/blog/posts'>About</Link>
    //     </div>
    //   </div>

    // </div>
  )
}
