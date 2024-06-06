import { Link } from "react-router-dom";
import MusicController from "@/blog/_components/MusicController";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {


  return (
    <section className={`border-t-[1px] border-t-default-8 dark:border-t-default-8-dark ${className} `}>
      <div className='flex flex-col items-center py-[40px]'>
        <span className='text-2xl font-medium dark:font-bold italic text-default-8-dark dark:text-default-3'>
          <span className='text-lg font-semibold text-default-16-dark dark:text-default-6'>BLOG</span>
          <span className='text-orange-400 mx-[2px] font-extrabold'>:</span>
          <span className="text-orange-400">jeheecheon</span>
        </span>

        <span className='mt-2 italic text-default-16-dark dark:text-default-6'>
          백엔드 개발을 주로 다루는 블로그입니다.
        </span>

        <MusicController className="mt-[40px] mb-[20px]" />

        <span className=' text-sm'> 
          All designed and developed by&#160;
          <span className='text-orange-400 font-bold'>
            <Link to="/blog/post/edit" className="cursor-text animate-blur-in-out">
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