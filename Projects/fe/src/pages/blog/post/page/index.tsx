import Comments from '@/pages/blog/post/page/components/Comments'
import Article from '@/common/components/Article';
import PostsPagination from '@/common/components/PostsPagination';
import ArticleLayout from '@/common/components/ArticleLayout';

import exampleImg from '@/common/assets/images/default/banner.jpg';

const Post = ({ liked = false }: {
    liked?: boolean
}) => {
    const dirty = '<p>asdasdasdasdasdasdasdasd</p><p>asdasdasd</p><ol><li>asdasd</li><li>asdasd</li><li>asdasdasdasdasd</li></ol>';
    return (
        <ArticleLayout className='flex flex-col items-center relative -top-[150px] z-10'>
            <Article liked={liked} headerImage={exampleImg} publisedDate='2024-01-01'
                categories={['Algorithm', 'DP']}>
                {dirty}
            </Article>
            <PostsPagination />
            <Comments className='px-2 relative top-[75px]' />
        </ArticleLayout>
    )
}

export default Post;
