import '@/pages/blog/post/page/css/index.css'
import { Comments } from '@/pages/blog/post/page/components/Comments'
import { Article } from '@/common/components/Article';
import { PostsPagination } from '@/common/components/PostsPagination';

import exampleImg from '@/common/assets/images/default/banner.jpg';
import { ArticleLayout } from '@/common/components/ArticleLayout';

export const Post = ({ liked = false }: {
    liked?: boolean
}) => {
    return (
        <ArticleLayout className='flex flex-col items-center relative -top-[150px] z-10'>
            <Article liked={liked} headerImage={exampleImg} publisedDate='2024-01-01'
            categories={['Algorithm', 'DP']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus blandit magna lacus, non fringilla est facilisis vitae. Nam semper ligula odio, id posuere lacus porttitor maximus. Nam tincidunt, libero non mattis tempor, ex diam cursus ex, in egestas erat nisl condimentum eros. Ut eget ante neque. Nunc vel nunc et lorem vulputate scelerisque ac malesuada augue. Donec a blandit quam, a mollis elit. In sodales pretium eros, eu molestie eros molestie vitae. Donec tortor arcu, tempor sed nisl sed, malesuada tempus sem. Donec sit amet diam porta arcu efficitur imperdiet. Ut at ornare ante, quis porttitor purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In pretium ipsum quam, sed blandit enim pulvinar id. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer eget ultricies ante. Nam suscipit egestas ornare. Ut vestibulum in nibh ut consequat. Fusce sed fermentum mi. Ut ac turpis pharetra, tincidunt sem nec, pulvinar justo. Suspendisse id hendrerit mauris. Nunc scelerisque massa et orci lacinia, vel vehicula ligula eleifend. Mauris pharetra est a enim dignissim tincidunt at non lectus.
                In suscipit nunc eu dolor facilisis suscipit. In pellentesque, augue et pretium blandit, lectus neque placerat mauris, nec ultricies diam dolor condimentum ante. Pellentesque in diam sed tellus lobortis elementum. Pellentesque sed enim eu erat lobortis malesuada. Aliquam vitae rhoncus justo. In mollis in nisi quis bibendum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas lacinia orci in lacus faucibus, eu dictum leo hendrerit. Aliquam consectetur tristique odio et molestie. Donec fermentum rhoncus dolor, non dapibus sapien ullamcorper vitae. Praesent venenatis varius nisl ut gravida.
            </Article>
            <PostsPagination />
            <Comments className='px-2 relative top-[75px]' />
        </ArticleLayout>
    )
}
