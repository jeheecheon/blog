import { RootState } from "@/common/redux/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  console.log(isDarkMode)
  
  return (
    <section>
      <div className='flex flex-col items-center  py-[40px] shadow-xl shadow-slate-700
      bg-default-1 dark:bg-default-3-dark'>
        <span className='text-2xl font-bold italic'>
          <span className='uppercase '>Blog</span>
          <span className='text-blue-500 mx-[2px]'>:</span>
          <span>jeheecheon</span>
        </span>

        <span className='mt-2 italic'>
          백엔드 개발을 주로 다루는 블로그입니다.
        </span>
        
        <span className='mt-10 text-sm'>
          All designed and developed by&#160;
          <span className='text-blue-600 font-bold'>
            <Link to="/blog/post/edit" className="cursor-text">
              "나, 천제희"
            </Link>
          </span>
        </span>
        <span className='text-default-18 dark:text-default-16-dark text-sm'>
          © 2024-present Jehee Cheon. All Rights Reserved.
        </span>
      </div>
    </section>
  )
}

export default Footer;