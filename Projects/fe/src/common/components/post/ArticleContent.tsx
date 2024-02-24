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
        <div className={`flex flex-col items-center w-full ${className}`}>
            <div className='text-slate-50 max-w-[900px] w-full text-left pl-2 text-xl h-fit'>
                <span className='bg-default-18 dark:bg-default-14-dark bg-opacity-90 dark:bg-opacity-80 px-3 rounded-md 
                text-slate-200 font-medium pb-3'>
                    {leafCategories && flattenOutCategoriesV1(leafCategories.find(category => category.Id === post.CategoryId))}
                </span>
            </div>

            {/* blog content goes here */}
            <div className='sm:mx-[30px] md:mx-[30px] lg:mx-[60px] xl:mx-auto max-w-[900px]
                    text-pretty h-fit min-h-[40vh] rounded-2xl shadow-md dark:shadow-lg dark:drop-shadow-lg
                    overflow-hidden mb-10 whitespace-pre-line w-full flex flex-col items-center justify-between
                    bg-white dark:bg-body-dark'>
                <div className='w-full flex flex-col items-center'>
                    <div className='bg-default-18 dark:bg-default-11-dark h-[10px] w-[170px] rounded-2xl relative bottom-1' />
                    <span className='block text-center font-medium text-sm mb-3'>
                        {post.EditedAt !== undefined && post.EditedAt !== null ?
                            `Last Edited: ${post.EditedAt.toLocaleDateString()}` :
                            `Published: ${post.UploadedAt.toLocaleDateString()}`
                            // `Published: ${post.EditedAt.toLocaleDateString()}` :
                            // `Published: ${post.UploadedAt.toLocaleDateString()}`
                        }
                    </span>
                    <div className='text-left w-full blog-post-content  px-3 md:px-10 pb-5 md:pb-10'>
                        {content}
                    </div>
                </div>
                {/* {props.headerImage && (<img src={props.headerImage} className='bg-fixed bg-center' />)} */}

                <div className='flex flex-row justify-center gap-2 items-center text-md fill-sky-700 pb-5'>
                    <div onClick={handleLikeCliked} className='flex flex-row gap-1 justify-between items-center cursor-pointer
                    border-2 py-[6px] px-3 
                    bg-default-1 dark:bg-default-3-dark dark:border-default-8-dark'>
                        {
                            hasLiked ? (
                                <svg className='fill-red-500' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" /></svg>
                            ) : (
                                <svg className='fill-red-500' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" /></svg>
                            )
                        }
                        <span>
                            {likes}
                        </span>
                    </div>
                    <div className='flex flex-row justify-center gap-1 cursor-pointer border-2 py-[6px] px-3 
                bg-default-1 dark:bg-default-3-dark dark:border-default-8-dark'
                        onClick={() => alert("미구현 기능...")}>
                        <svg className='' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-40q-33 0-56.5-23.5T160-120v-440q0-33 23.5-56.5T240-640h120v80H240v440h480v-440H600v-80h120q33 0 56.5 23.5T800-560v440q0 33-23.5 56.5T720-40H240Zm200-280v-447l-64 64-56-57 160-160 160 160-56 57-64-64v447h-80Z" /></svg>
                        <span>공유</span>
                    </div>
                </div>
            </div>

        </div>
    )
});

export default ArticleContent;
