import defaultAvatar from '@/common/assets/images/default/default-avatar.jpg';
import { useState } from 'react';

export const Comment = ({ liked, isReply, className }: {
    liked?: boolean,
    isReply?: boolean,
    className?: string
}) => {
    const [isLiked, setIsLiked] = useState(liked);

    const handleLikeCliked = () => setIsLiked(!isLiked);

    return (
        <div className={`flex flex-row ${className}`}>
            {isReply && (
                <svg className='mt-2 mx-3 fill-slate-600' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m296-224-56-56 240-240 240 240-56 56-184-183-184 183Zm0-240-56-56 240-240 240 240-56 56-184-183-184 183Z" /></svg>
            )
            }
            <div className='flex flex-col w-full'>
                <div className='flex flex-row justify-between items-center'>
                    {/* 댓글 작성자 정보 */}
                    <div className='flex flex-row justify-start items-center gap-3'>
                        <img src={defaultAvatar} className='w-[40px] h-auto rounded-full' />
                        <span>jeheecheon</span>
                        <span className='border rounded-2xl px-[5px] py-[2px] text-xs text-green-500'>블로그 주인</span>
                    </div>
                    {/* 메뉴버튼 */}
                    <div className='text-2xl cursor-pointer self-start'>...</div>
                </div>
                <span className='text-slate-700'>
                    댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다.
                </span>

                {/* 작성 날짜 */}
                <span className='text-slate-700 text-sm mb-3'>2024-01-01</span>

                <div className='flex flex-row justify-between'>
                    {/* 댓글 */}
                    <button type='button' className='border-2 text-sm py-[3px] px-2'>답글</button>

                    {/* 좋아요 */}
                    <div onClick={handleLikeCliked} className='flex flex-row justify-between items-center fill-sky-700 cursor-pointer
                border-2 py-[3px] px-2 text-sm'>
                        {
                            isLiked ? (
                                <svg className='mr-1 text-1xl' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M720-120H320v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h218q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14ZM240-640v520H80v-520h160Z" /></svg>
                            ) : (
                                <svg className='mr-1 text-1xl' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" /></svg>
                            )
                        }
                        <span>
                            42
                        </span>
                    </div>
                </div>
            </div>
        </div >
    )
}
