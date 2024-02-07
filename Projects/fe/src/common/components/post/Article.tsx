import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import parse from 'html-react-parser';

import DOMPurify from "isomorphic-dompurify";
import PostInfo from '@/common/types/PostInfo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/common/redux/store';
import { makeVisible } from '@/common/redux/signInModalSlice';

interface ArticleProps {
    className?: string,
    post: PostInfo
}

const Article: React.FC<ArticleProps> = React.memo(({
    className,
    post
}) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user)
    const isAuthenticated = useRef(user.email !== undefined && user.email !== null && user.email !== '');

    const content = useRef<string | JSX.Element | JSX.Element[]>(parse(DOMPurify.sanitize(post.content)));
    const [hasLiked, setHasLiked] = useState(post.has_liked);
    const isLoadingLikes = useRef(false);

    const [likes, setLikes] = useState(post.like_cnt);

    const dummyCategories = ['Algorithm', 'DP'];
''
    useEffect(() => {
        import('@/common/assets/css/Article.css')
    }, []);

    const handleLikeCliked = () => {
        if (isLoadingLikes.current === true)
            return;
        if (isAuthenticated.current === false) {
            dispatch(makeVisible());
            return;
        }

        isLoadingLikes.current = true;

        fetch(`/api/blog/post/${post.id}/has-liked`, {
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
        <div className={`flex flex-col items-center w-full ${className}`}>
            <div className='text-slate-50 max-w-[780px] w-full text-left pl-2 pb-1 text-xl'>
                {dummyCategories.map((cate, idx) => {
                    return (
                        <Link to='/blog/posts' key={idx}> {cate}
                            {idx < dummyCategories.length - 1 && <span>&#160;&gt;</span>}
                        </Link>);
                })}
            </div>
            {/* blog content goes here */}
            <div className='px-3 pt-2 text-pretty max-w-[780px] h-fit min-h-[25vh] bg-slate-50 rounded-2xl shadow-md
                    overflow-hidden mb-10 whitespace-pre-line w-full flex flex-col items-center'>
                <span className='block text-center text-slate-600 text-sm mb-3'>
                    <span>
                        {post.edited_at !== undefined && post.edited_at !== null ?
                            `Last Edited: ${post.edited_at.toLocaleDateString()}` :
                            `Published: ${post.uploaded_at.toLocaleDateString()}`
                        }
                    </span>
                </span>
                <div className='text-left w-full'>
                    {content.current}
                </div>
                {/* {props.headerImage && (<img src={props.headerImage} className='bg-fixed bg-center' />)} */}
            </div>

            <div className='flex flex-row justify-center gap-2 items-center text-md fill-sky-700 mb-5'>
                <div onClick={handleLikeCliked} className='flex flex-row gap-1 justify-between items-center cursor-pointer
                    border-2 py-[3px] px-2 bg-white'>
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
                <div className='flex flex-row justify-center gap-1 cursor-pointer border-2 py-[3px] px-2 bg-white'
                    onClick={() => alert("미구현 기능...")}>
                    <svg className='' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-40q-33 0-56.5-23.5T160-120v-440q0-33 23.5-56.5T240-640h120v80H240v440h480v-440H600v-80h120q33 0 56.5 23.5T800-560v440q0 33-23.5 56.5T720-40H240Zm200-280v-447l-64 64-56-57 160-160 160 160-56 57-64-64v447h-80Z" /></svg>
                    <span>공유</span>
                </div>
            </div>
        </div>
    )
});

export default Article;
