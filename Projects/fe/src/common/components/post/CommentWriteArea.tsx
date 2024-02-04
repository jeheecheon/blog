import { RootState } from '@/common/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/common/components/Button';
import CustomTextArea from '@/common/components/CustomTextArea';
import defaultAvatar from '@/common/assets/images/icons/pngwing.com.png'
import Avatar from '@/common/components/Avatar';
import { makeVisible } from '../../redux/signInModalSlice';
import { PromiseAwaiter, wrapPromise } from '@/common/utils/promiseWrapper';

interface CommentWriteAreaProps {
    postId: string;
    replyingTo?: string;
    handleCancelClicked?: () => void | undefined;
    setCommentsAwaiter: React.Dispatch<React.SetStateAction<PromiseAwaiter>>;
}

const CommentWriteArea: React.FC<CommentWriteAreaProps> = ({
    postId,
    replyingTo,
    handleCancelClicked,
    setCommentsAwaiter
}) => {
    const user = useSelector((state: RootState) => state.user)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const dispatch = useDispatch();
    const [content, setContent] = useState('');

    useEffect(() => {
        setIsAuthenticated(user.email !== undefined && user.email !== null && user.email !== '');
    }, []);

    const handleType: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        if (isAuthenticated === false)
            dispatch(makeVisible());
        else {
            setContent(e.currentTarget.value);
            console.log(e.currentTarget.value);
        }
    }

    const handleUpload = () => {
        fetch(`/api/blog/post/${postId}/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: content,
                parent_comment_id: replyingTo
            })
        })
            .then(res => {
                if (res.ok) {
                    setCommentsAwaiter(wrapPromise(fetch(`/api/blog/post/${postId}/comments`)));
                    setContent('');
                    if (handleCancelClicked !== undefined)
                        handleCancelClicked();
                }
            })
    }

    return (
        <div className={`rounded-lg flex flex-row justify-between items-start
                px-4 pt-2 pb-4 bg-slate-200 bg-opacity-40`} >

            <Avatar
                avatar={isAuthenticated ? user.avatar : defaultAvatar}
                className='w-[50px] rounded-full bg-white'
            />

            <div className='w-full flex flex-col items-end gap-3 -mt-5 ml-3'>
                <CustomTextArea
                    content={content}
                    handleType={handleType}
                    className='w-full focus:outline-none overflow-y-hidden resize-none
                        border-b-2 border-slate-500
                        bg-transparent'
                />
                <div className='flex items-center justify-end w-full gap-3'>
                    <Button onClick={() => {
                        setContent('');
                        if (handleCancelClicked !== undefined)
                            handleCancelClicked();
                    }}>
                        Cancle
                    </Button>
                    <Button
                        onClick={handleUpload}
                    >
                        Upload
                    </Button>
                </div>
            </div>
            <svg className='fill-slate-900 cursor-pointer self-end mb-[50px]' xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="40"><path d="M480-260.667q66.667 0 122.167-36.5t80.5-98.166H277.333q25.667 61.666 80.834 98.166 55.166 36.5 121.833 36.5Zm-174.667-268 44.667-44 44 44 38-38-82-82.666-82.667 82.666 38 38Zm261.334 0 44-44 44.667 44 37.999-38-82.666-82.666-82 82.666 38 38ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 333.334q139.583 0 236.459-96.875Q813.334-340.417 813.334-480t-96.875-236.459Q619.583-813.334 480-813.334t-236.459 96.875Q146.666-619.583 146.666-480t96.875 236.459Q340.417-146.666 480-146.666Z"
                onClick={() => alert("미구현 기능...")}
            /></svg>

        </div>
    )
}

export default CommentWriteArea