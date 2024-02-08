import defaultAvatar from '@/common/assets/images/default/default-avatar.jpg';
import CommentInfo from '@/common/types/CommentInfo';
import { useRef, useState } from 'react';
import CommentWriteArea from './CommentWriteArea';
import { getTimeAgo } from '@/common/utils/comment';
import { PromiseAwaiter } from '@/common/utils/promiseWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/common/redux/store';

import parse from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';
import { makeVisible } from '@/common/redux/signInModalSlice';

interface CommentProps {
    className?: string;
    postId: string;
    comment: CommentInfo;
    setCommentsAwaiter: React.Dispatch<React.SetStateAction<PromiseAwaiter>>;
}

export const Comment: React.FC<CommentProps> = ({
    className = '',
    postId,
    comment,
    setCommentsAwaiter
}) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user)
    const isAuthenticated = useRef(user.email !== undefined && user.email !== null && user.email !== '');

    const content = useRef<string | JSX.Element | JSX.Element[]>(parse(DOMPurify.sanitize(comment.Content)));
    const [hasLiked, setHasLiked] = useState(comment.HasLiked);
    const [isReplying, setIsReplying] = useState<boolean>(false);
    const isLoadingLikes = useRef(false);

    const [likes, setLikes] = useState(comment.LikeCnt);

    const handleLikeCliked = () => {
        if (isLoadingLikes.current === true)
            return;
        if (isAuthenticated.current === false) {
            dispatch(makeVisible());
            return;
        }

        isLoadingLikes.current = true;

        fetch(`/api/blog/comment/${comment.Id}/has-liked`, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(!hasLiked)
        })
            .then(res => {
                if (res.ok)
                    return res.json();
            })
            .then(res => {
                setHasLiked(res.has_liked);
                setLikes(likes + (res.has_liked ? 1 : -1));
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                isLoadingLikes.current = false;
            });
    };

    return (
        <>
            <div className={`flex flex-row`}>
                {comment.ParentCommentId && (<svg className='mt-2 mx-3 fill-slate-600' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m296-224-56-56 240-240 240 240-56 56-184-183-184 183Zm0-240-56-56 240-240 240 240-56 56-184-183-184 183Z" /></svg>)}
                <div className={`flex flex-col w-full ${className}`}>
                    <div className='flex flex-row justify-between items-center'>
                        {/* 댓글 작성자 정보 */}
                        <div className='flex flex-row justify-start items-center gap-3'>
                            <img src={comment.Avatar ? comment.Avatar : defaultAvatar} className='w-[40px] h-auto rounded-full' />
                            <span>{comment.Email}</span>
                            <span className='border rounded-2xl px-[5px] py-[2px] text-xs border-green-500 text-green-500'>블로그 주인</span>
                        </div>
                        {/* 메뉴버튼 */}
                        <div className='text-2xl cursor-pointer self-start'
                            onClick={() => {

                            }}
                        >
                            ...
                        </div>
                    </div>
                    <span className='text-slate-700'>
                        {content.current}
                    </span>

                    {/* 작성 날짜 */}
                    <span className='text-slate-700 text-sm mb-3'>{getTimeAgo(comment.UploadedAt as Date)}</span>

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
                                hasLiked ? (
                                    <svg className='mr-1 text-1xl' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M720-120H320v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h218q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14ZM240-640v520H80v-520h160Z" /></svg>
                                ) : (
                                    <svg className='mr-1 text-1xl' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" /></svg>
                                )
                            }
                            <span>
                                {likes}
                            </span>
                        </div>
                    </div>


                    {isReplying && (
                        <CommentWriteArea
                            postId={postId}
                            replyingTo={comment.Id}
                            handleCancelClicked={() => setIsReplying(false)}
                            setCommentsAwaiter={setCommentsAwaiter}
                        />
                    )}

                </div>
            </div >
        </>
    )
}
