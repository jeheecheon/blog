import Comments from '@/common/components/Comments'
import Article from '@/common/components/Article';
import PostsPagination from '@/common/components/PostsPagination';
import ArticleLayout from '@/common/components/ArticleLayout';

import exampleImg from '@/common/assets/images/default/banner.jpg';
import { useLoaderData } from 'react-router-dom';
import post from '@/common/types/post';

const Post = () => {
    const post = useLoaderData() as post;

    return (
        <ArticleLayout className='flex flex-col items-center relative -top-[150px] z-10'>
            <Article 
                liked={false} 
                headerImage={exampleImg} 
                publisedDate={post.uploaded_at}
                categories={['Algorithm', 'DP']}>
                {post.content}
            </Article>
            <PostsPagination />
            <Comments className='px-2 relative top-[75px]' />
        </ArticleLayout>
    )
}

export default Post;
