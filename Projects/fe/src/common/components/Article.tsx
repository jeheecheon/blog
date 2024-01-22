import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import parse from 'html-react-parser';

import DOMPurify from "isomorphic-dompurify";

interface ArticleProps {
    liked?: boolean,
    headerImage?: string,
    className?: string,
    lastEditedDate?: string,
    publisedDate: string,
    categories: string[],
    children: Node | string
}

export const Article = (props: ArticleProps) => {
    const [isLiked, setIsLiked] = useState(props.liked);
    const handleLikeCliked = () => setIsLiked(!isLiked);
    const [content, setContent] = useState<string | JSX.Element | JSX.Element[] | null>(null);

    useEffect(() => {
        setContent(parse(DOMPurify.sanitize(props.children)));

        import('@/common/assets/css/Article.css')
    }, []);

    return (
        <div className={`flex flex-col items-center w-full ${props.className}`}>
            <div className='text-slate-50 max-w-[780px] w-full text-left pl-2 pb-1 text-xl'>
                {props.categories && props.categories.map((cate, idx) => {
                    return (
                        <Link to='/blog/posts' key={idx}> {cate}
                            {idx < props.categories.length - 1 && <span>&#160;&gt;</span>}
                        </Link>);
                })}
            </div>
            {/* blog content goes here */}
            <div className='px-3 pt-2 text-pretty max-w-[780px] h-fit bg-slate-50 rounded-2xl shadow-md
                    overflow-hidden mb-10 whitespace-pre-line w-full flex flex-col items-center'>
                <span className='block text-center text-slate-600 text-sm mb-3'>
                    {props.lastEditedDate !== undefined ?
                        (<span>Last Edited: {props.lastEditedDate}</span>) :
                        (<span>Published: {props.publisedDate}</span>)}
                </span>
                <div className='text-left w-full'>
                    {content}
                </div>
                {props.headerImage && (<img src={props.headerImage} className='bg-fixed bg-center' />)}
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
        </div>
    )
}

export default Article;
