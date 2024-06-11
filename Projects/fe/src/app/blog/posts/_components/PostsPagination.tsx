import { Link } from 'react-router-dom'

const PostsPagination = () => {
    const dummyData = Array.from({ length: 5 }, (_, index) => index);

    return (
        <div className='flex flex-col justify-center items-start max-w-5xl w-full rounded-lg bg-white
        shadow-md px-5 py-3 mb-5 text-slate-700'>
            <div className='flex flex-row justify-between w-full border-b-2 border-slate-200 py-3'>
                <span><span className='text-blue-500'>알고리즘</span> 카테고리 포스트</span>
                <Link to='/blog/posts' className=''>전체글 보기</Link>
            </div>

            {
                dummyData.map((_, index) => (
                    <Link to='/blog' key={index} className='flex flex-row justify-between items-center py-2 border-b-2 w-full cursor-pointer'>
                        <span>이거 누르지 마세요<span className='pl-2 text-blue-500'>(88)</span></span>
                        <span>2024-01-01</span>
                    </Link>
                ))
            }

            <div className='flex flex-row justify-center gap-3 items-center w-full pt-4 pb-2'>
                <span className='cursor-pointer'>&lt; 이전</span>
                <span className='cursor-pointer'>다음 &gt;</span>
            </div>
        </div>
    )
}

export default PostsPagination;