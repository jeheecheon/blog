import defaultAvatar from '@/common/assets/images/default/default-avatar.jpg';
import CommentInfo from '@/common/types/CommentInfo';
import { useState } from 'react';
import CommentWriteArea from './CommentWriteArea';
import { getTimeAgo } from '@/common/utils/comment';

interface CommentProps {
    className?: string;
    comment: CommentInfo;
}

export const Comment: React.FC<CommentProps> = ({
    className = '',
    comment
}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isReplying, setIsReplying] = useState<boolean>(false);

    const handleLikeCliked = () => setIsLiked(!isLiked);

    return (
        <>
            <div className={`flex flex-row  `}>
                {comment.parent_comment_id && (<svg className='mt-2 mx-3 fill-slate-600' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m296-224-56-56 240-240 240 240-56 56-184-183-184 183Zm0-240-56-56 240-240 240 240-56 56-184-183-184 183Z" /></svg>)}
                <div className={`flex flex-col w-full ${className}`}>
                    <div className='flex flex-row justify-between items-center'>
                        {/* 댓글 작성자 정보 */}
                        <div className='flex flex-row justify-start items-center gap-3'>
                            <img src={defaultAvatar} className='w-[40px] h-auto rounded-full' />
                            <span>{comment.email}</span>
                            <span className='border rounded-2xl px-[5px] py-[2px] text-xs border-green-500 text-green-500'>블로그 주인</span>
                        </div>
                        {/* 메뉴버튼 */}
                        <div className='text-2xl cursor-pointer self-start'>...</div>
                    </div>
                    <span className='text-slate-700'>
                        {comment.content}
                    </span>

                    {/* 작성 날짜 */}
                    <span className='text-slate-700 text-sm mb-3'>{getTimeAgo(comment.uploaded_at as Date)}</span>

                    <div className='flex flex-row justify-between'>
                        {/* 댓글 */}
                        <button type='button' className='border-2 text-sm py-[3px] px-2'
                            onClick={(e) => {
                                e.preventDefault();
                                setIsReplying(!isReplying);
                            }}
                        >
                            답글
                        </button>

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


                    {isReplying && (
                        <CommentWriteArea
                            postId={comment.post_id}
                            replyingTo={comment.id}
                            handleCancelClicked={() => setIsReplying(false)}
                        />
                    )}

                </div>
            </div >
        </>
    )
}
