import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section>
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
            <Link to="/blog/post/edit" className="cursor-text">
              "나, 천제희"
            </Link>
          </span>
        </span>
        <span className='text-slate-600 text-sm'>
          © 2024-present Jehee Cheon. All Rights Reserved.
        </span>
      </div>
    </section>
  )
}

export default Footer;