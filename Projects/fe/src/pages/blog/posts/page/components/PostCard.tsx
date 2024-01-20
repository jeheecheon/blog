import { useState } from 'react';

export const PostCard = ({ className, liked = false }: { className?: string, liked?: boolean }) => {
    const [isLiked, setIsLiked] = useState(liked);

    const handleLikeCliked = () => setIsLiked(!isLiked);

    return (
        <div className={`max-w-[800px] h-fit
        group hover:cursor-pointer pb-3 border-b-2
        ${className}`}>
            <div className='flex justify-between text-slate-500 text-sm'>
                <span className='text-right'>2024-01-01</span>
                <span className='self-end'>23 views</span>
            </div>
            <div className='font-semibold text-2xl mb-3 text-pretty text-slate-600 group-hover:text-sky-700'>This is an example title This is an example titleThis is an example titleThis is an example title</div>
            <div className='text-md text-pretty mb-2 h-[70px] truncate'>
                쿠키(Cookie)는 대부분의 웹 서비스에서 사용하는 기술이라 웹 개발자라면 여러 번 마주해보셨을 거에요. 저 또한 웹 서비스를 개발하면서 쿠키를 다뤘던 경험이 종종 있었습니다. 그렇지만 쿠키라는 기술 자체는 별로 흥미로운 기술이 아니다보니 그냥 구현만 마친 후 대충 넘겼던 경험이 많은 것 같아요.

                쿠키는 아주 예전부터 쓰였던 기술이지만, 요즘에는 보안이나 개인정보보호 문제 때문에 쿠키에 SameSite 같은 속성이 추가되기도하고 브라우저가 쿠키를 다루는 방식도 점차 바뀌어가고 있습니다.

                이번 글에서는 쿠키에 대한 기본적인 이해를 바탕으로 SameSite 속성은 왜 나온 것인지, 브라우저들은 어떻게 동작하고 있는지 알아보겠습니다.
            </div>
            <div className='flex flex-row justify-start items-start fill-sky-700 '>
                {/* Likes */}
                <div className='flex flex-row items-center mr-2 cursor-pointer'
                    onClick={handleLikeCliked}>
                    {
                        isLiked ? (
                            <svg className='mr-1 text-1xl' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M720-120H320v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h218q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14ZM240-640v520H80v-520h160Z" /></svg>
                        ) : (
                            <svg className='mr-1 text-1xl' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" /></svg>
                        )
                    }
                    <span className="text-xl">
                        12
                    </span>
                </div>

                {/* Comments */}
                <div className='flex flex-row items-center cursor-pointer'>
                    <svg className="mr-1 text-3xl" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Zm0 0v-480 480Z" /></svg>
                    <span className="text-xl">
                        34
                    </span>
                </div>

                {/* Tags */}
                <div className='ml-auto text-sky-700 text-pretty'>#벡준, #내인생, #힘들다, #ㅠㅠ</div>
            </div>
        </div>
    )
}
