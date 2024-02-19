import React, { useEffect, useMemo, useRef, useState } from 'react';

import parse from 'html-react-parser';

import DOMPurify from "isomorphic-dompurify";
import { PostInfo } from '@/common/types/Post';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/common/redux/store';
import { makeVisible } from '@/common/redux/signInModalSlice';
import { flattenOutCategoriesV1 } from '@/common/utils/category';
import { setCoverImageUrl, setTitleOnCover } from '@/common/redux/bannerSlice';
import { image } from '@/common/utils/siteInfo';

import '@/common/assets/css/Article.scss';
import hljs from '@/common/utils/highlightSettings'

interface ArticleContentProps {
    className?: string,
    post: PostInfo
}

const ArticleContent: React.FC<ArticleContentProps> = React.memo(({
    className,
    post
}) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user)
    const isAuthenticated = useRef(user.email !== undefined && user.email !== null && user.email !== '');

    const leafCategories = useSelector((state: RootState) => state.category.leafCategories);

    const content = useMemo<string | JSX.Element | JSX.Element[]>(
        () => parse(DOMPurify.sanitize(post.Content)),
        [post.Content]
    );
    const [hasLiked, setHasLiked] = useState(post.HasLiked);
    const isLoadingLikes = useRef(false);

    const [likes, setLikes] = useState(post.LikeCnt);

    useEffect(() => {
        if (post.Cover !== null && post.Cover !== undefined)
            dispatch(setCoverImageUrl(post.Cover));

        dispatch(setTitleOnCover(post.Title))

        const codes = document.getElementsByClassName('ql-syntax');
        for (const code of codes) {
            if (code instanceof HTMLElement) {
                hljs.highlightElement(code);
            }
        }

        setLikes(post.LikeCnt);

        return () => {
            dispatch(setCoverImageUrl(image));
            dispatch(setTitleOnCover(""))
        }
    }, [post.Title, post.Cover, post.LikeCnt]);

    const handleLikeCliked = () => {
        if (isLoadingLikes.current === true)
            return;
        if (isAuthenticated.current === false) {
            dispatch(makeVisible());
            return;
        }

        isLoadingLikes.current = true;

        fetch(`/api/blog/post/${post.Id}/has-liked`, {
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
        <div className={`blog-post flex flex-col items-center w-full ${className}`}>
            <div className='text-slate-50 max-w-[780px] w-full text-left pl-2 text-xl h-fit'>
                <span className='bg-stone-700 bg-opacity-60 px-3 rounded-md 
                text-slate-200 font-medium pb-3'>
                    {leafCategories && flattenOutCategoriesV1(leafCategories.find(category => category.Id === post.CategoryId))}
                </span>
            </div>

            {/* blog content goes here */}
            <div className='px-3 text-pretty max-w-[780px] h-fit min-h-[25vh] rounded-2xl shadow-md
                    overflow-hidden pb-3 mb-10 whitespace-pre-line w-full flex flex-col items-center bg-white'>
                <div className='bg-stone-600 h-[10px] w-[170px] rounded-2xl relative bottom-1' />
                <span className='block text-center text-slate-900 font-medium text-sm mb-3'>
                    {post.EditedAt !== undefined && post.EditedAt !== null ?
                        `Last Edited: ${post.EditedAt.toLocaleDateString()}` :
                        `Published: ${post.UploadedAt.toLocaleDateString()}`
                        // `Published: ${post.EditedAt.toLocaleDateString()}` :
                        // `Published: ${post.UploadedAt.toLocaleDateString()}`
                    }
                </span>
                <div className='text-left w-full blog-post-content'>
                    {content}
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

export default ArticleContent;
