import defaultAvatar from '@/common/assets/images/icons/avatar.png';
import CommentInfo from '@/common/types/Comment';
import { useRef, useState } from 'react';
import CommentWriteArea from './CommentWriteArea';
import { getTimeAgo } from '@/common/utils/comment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/common/redux/store';

import parse from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';
import { makeVisible } from '@/common/redux/signInModalSlice';

interface CommentProps {
    postId: string;
    comment: CommentInfo;
    refreshComments: () => void;
}

export const Comment: React.FC<CommentProps> = ({
    postId,
    comment,
    refreshComments
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
        <div className={`flex flex-row auto-cols-min w-full h-full`}>
            {comment.ParentCommentId &&
                <div className='flex flex-row'>
                    {
                        Array.from({ length: comment.depth }).map((_, idx) => {
                            return (
                                <div key={idx} className='w-[5px] h-full border-r-[1px] mr-3 border-slate-400' />
                            )
                        })
                    }
                </div>
            }

            <div className={`flex flex-col py-4 w-full gap-3`}>
                <div className='flex flex-row gap-2'>
                    {/* 댓글 작성자 정보 */}
                    <img src={comment.Avatar ? comment.Avatar : defaultAvatar} className='w-[40px] h-[40px] rounded-full' />

                    <div className='flex flex-col justify-center h-full text-sm md:text-lg'>
                        <span className=''>{comment.Email}</span>
                        {/* 작성 시간 */}
                        <div className='flex flex-row items-center gap-3'>
                            <span className='text-slate-700 text-sm'>{getTimeAgo(comment.UploadedAt as Date)}</span>
                            <span className={`w-fit border rounded-2xl mt-1 px-[7px] py-[1px] text-xs 
                                ${comment.Email !== "jeheecheon@gmail.com" && "hidden"} border-green-500 text-green-500`}>
                                Site Owner
                            </span>
                        </div>
                    </div>
                </div>

                <div className='text-pretty min-h-[50px] p-2 bg-blue-100 bg-opacity-20 w-full rounded-lg
                text-slate-700'>
                    {content.current}
                </div>

                <div className='flex flex-row gap-3'>
                    <button type='button' className='border-2 border-blue-200 rounded text-sm py-[3px] px-2 w-fit
                    flex flex-row items-center justify-center gap-1'
                        onClick={(e) => {
                            e.preventDefault();
                            setIsReplying(!isReplying);
                        }}
                    >
                        <svg className='fill-blue-500' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Zm0 0v-480 480Z" /></svg>
                        <span>Reply</span>
                    </button>

                    <button onClick={handleLikeCliked} className='flex flex-row rounded justify-between items-center w-fit cursor-pointer
                    border-2 py-[3px] px-2 text-sm border-blue-200 gap-1'>
                        {
                            hasLiked ? (
                                <svg className='fill-red-500' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" /></svg>
                                // <svg className='mr-1 text-1xl' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M720-120H320v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h218q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14ZM240-640v520H80v-520h160Z" /></svg>
                            ) : (
                                <svg className='fill-red-500' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" /></svg>
                                // <svg className='mr-1 text-1xl' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" /></svg>
                            )
                        }
                        <span>
                            {likes}
                        </span>
                    </button>
                </div>

                {isReplying && (
                    <CommentWriteArea
                        postId={postId}
                        replyingTo={comment.Id}
                        handleCancelClicked={() => setIsReplying(false)}
                        refreshComments={refreshComments}
                        className='mt-2'
                    />
                )}
            </div>
        </div >
    )
}