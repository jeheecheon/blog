import '@/pages/blog/post/page/css/index.css'
import { Comments } from '@/pages/blog/post/page/components/Comments'

import exampleImg from '@/common/assets/images/default/banner.jpg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Post = ({ liked = false }: {
    liked?: boolean
}) => {
    const [isLiked, setIsLiked] = useState(liked);

    const handleLikeCliked = () => setIsLiked(!isLiked);
    const dummyData = Array.from({ length: 5 }, (_, index) => index);

    return (
        <div className='flex flex-col items-center relative -top-[150px] z-10'>
            <div className='text-slate-50 max-w-[780px] w-full text-left pl-2 pb-1 text-xl'>
                Algorithm &gt; DP
            </div>
            {/* blog content goes here */}
            <div className='px-2 text-pretty max-w-[780px] text-left bg-slate-50 rounded-2xl shadow-md
            overflow-hidden mb-10'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus blandit magna lacus, non fringilla est facilisis vitae. Nam semper ligula odio, id posuere lacus porttitor maximus. Nam tincidunt, libero non mattis tempor, ex diam cursus ex, in egestas erat nisl condimentum eros. Ut eget ante neque. Nunc vel nunc et lorem vulputate scelerisque ac malesuada augue. Donec a blandit quam, a mollis elit. In sodales pretium eros, eu molestie eros molestie vitae. Donec tortor arcu, tempor sed nisl sed, malesuada tempus sem. Donec sit amet diam porta arcu efficitur imperdiet. Ut at ornare ante, quis porttitor purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In pretium ipsum quam, sed blandit enim pulvinar id. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer eget ultricies ante. Nam suscipit egestas ornare. Ut vestibulum in nibh ut consequat. Fusce sed fermentum mi. Ut ac turpis pharetra, tincidunt sem nec, pulvinar justo. Suspendisse id hendrerit mauris. Nunc scelerisque massa et orci lacinia, vel vehicula ligula eleifend. Mauris pharetra est a enim dignissim tincidunt at non lectus.
                In suscipit nunc eu dolor facilisis suscipit. In pellentesque, augue et pretium blandit, lectus neque placerat mauris, nec ultricies diam dolor condimentum ante. Pellentesque in diam sed tellus lobortis elementum. Pellentesque sed enim eu erat lobortis malesuada. Aliquam vitae rhoncus justo. In mollis in nisi quis bibendum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas lacinia orci in lacus faucibus, eu dictum leo hendrerit. Aliquam consectetur tristique odio et molestie. Donec fermentum rhoncus dolor, non dapibus sapien ullamcorper vitae. Praesent venenatis varius nisl ut gravida.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus blandit magna lacus, non fringilla est facilisis vitae. Nam semper ligula odio, id posuere lacus porttitor maximus. Nam tincidunt, libero non mattis tempor, ex diam cursus ex, in egestas erat nisl condimentum eros. Ut eget ante neque. Nunc vel nunc et lorem vulputate scelerisque ac malesuada augue. Donec a blandit quam, a mollis elit. In sodales pretium eros, eu molestie eros molestie vitae. Donec tortor arcu, tempor sed nisl sed, malesuada tempus sem. Donec sit amet diam porta arcu efficitur imperdiet. Ut at ornare ante, quis porttitor purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                Nunc vitae velit quis nibh hendrerit tempus. Duis non nunc ultricies, feugiat sapien a, tempor leo. Mauris iaculis dolor lectus, sit amet aliquam tellus malesuada ut. Suspendisse faucibus porttitor turpis. Vestibulum id justo a arcu lacinia convallis quis pretium neque. Sed euismod quam id ex rhoncus, ullamcorper consectetur arcu condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis tellus tellus.
                Proin vitae maximus mi. Quisque laoreet molestie massa a posuere. Donec rutrum non nibh eget vestibulum. In hac habitasse platea dictumst. Aenean faucibus leo ante, vitae ultrices sapien iaculis non. In in mauris vitae ipsum dictum viverra ac eget risus. Ut nec elit suscipit, luctus massa quis, laoreet erat. Proin metus felis, convallis sit amet sagittis sed, condimentum vel leo.
                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In pretium ipsum quam, sed blandit enim pulvinar id. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer eget ultricies ante. Nam suscipit egestas ornare. Ut vestibulum in nibh ut consequat. Fusce sed fermentum mi. Ut ac turpis pharetra, tincidunt sem nec, pulvinar justo. Suspendisse id hendrerit mauris. Nunc scelerisque massa et orci lacinia, vel vehicula ligula eleifend. Mauris pharetra est a enim dignissim tincidunt at non lectus.
                In suscipit nunc eu dolor facilisis suscipit. In pellentesque, augue et pretium blandit, lectus neque placerat mauris, nec ultricies diam dolor condimentum ante. Pellentesque in diam sed tellus lobortis elementum. Pellentesque sed enim eu erat lobortis malesuada. Aliquam vitae rhoncus justo. In mollis in nisi quis bibendum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas lacinia orci in lacus faucibus, eu dictum leo hendrerit. Aliquam consectetur tristique odio et molestie. Donec fermentum rhoncus dolor, non dapibus sapien ullamcorper vitae. Praesent venenatis varius nisl ut gravida.
                <img src={exampleImg} className='bg-fixed bg-center' />
            </div>

            <div className='flex flex-row justify-center gap-2 items-center text-md fill-sky-700 mb-5'>
                <div onClick={handleLikeCliked} className='flex flex-row gap-1 justify-between items-center cursor-pointer
                border-2 py-[3px] px-2 bg-white'>
                    {
                        isLiked ? (
                            <svg className='mr-1 text-1xl' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M720-120H320v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h218q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14ZM240-640v520H80v-520h160Z" /></svg>
                        ) : (
                            <svg className='mr-1 text-1xl' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" /></svg>
                        )
                    }
                    <span>
                        13
                    </span>
                </div>
                <div className='flex flex-row justify-center gap-1 cursor-pointer border-2 py-[3px] px-2 bg-white'>
                    <svg className='' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-40q-33 0-56.5-23.5T160-120v-440q0-33 23.5-56.5T240-640h120v80H240v440h480v-440H600v-80h120q33 0 56.5 23.5T800-560v440q0 33-23.5 56.5T720-40H240Zm200-280v-447l-64 64-56-57 160-160 160 160-56 57-64-64v447h-80Z" /></svg>
                    <span>공유</span>
                </div>
            </div>

            <div className='flex flex-col justify-center items-start max-w-5xl w-full rounded-lg bg-white
            shadow-md px-5 py-3 mb-5 text-slate-700'>
                <div className='flex flex-row justify-between w-full border-b-2 border-slate-200 py-3'>
                    <span><span className='text-blue-500'>알고리즘</span> 카테고리 포스트</span>
                    <Link to='/blog/posts' className=''>전체글 보기</Link>
                </div>

                {
                    dummyData.map((_, index) => (
                        <Link to='/blog/post' key={index} className='flex flex-row justify-between items-center py-2 border-b-2 w-full cursor-pointer'>
                            <span>포스트 제목입니다 이렇게 출력<span className='pl-2 text-blue-500'>(3)</span></span>
                            <span>2024-01-01</span>
                        </Link>
                    ))
                }

                <div className='flex flex-row justify-center gap-3 items-center w-full pt-4 pb-2'>
                    <span className='cursor-pointer'>&lt; 이전</span>
                    <span className='cursor-pointer'>다음 &gt;</span>
                </div>
            </div>
            <Comments className='px-2 relative top-[75px]' />
        </div>

    )
}
