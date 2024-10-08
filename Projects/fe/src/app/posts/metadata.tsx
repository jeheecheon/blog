import useLeafCategories from "@/_hooks/useLeafCategories";
import { PostInfo } from "@/_types/Post";
import { flattenOutCategoriesV2 } from "@/_utils/category";
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";

interface MetadataProps {
    post: PostInfo | undefined;
}

const Metadata = ({ post }: MetadataProps) => {
    const { leafCategories } = useLeafCategories();

    const categories = useMemo(() => {
        if (!post) return null;

        return flattenOutCategoriesV2(
            leafCategories.find((category) => category.Id === post.CategoryId)
        );
    }, [leafCategories, post]);

    if (!post) return null;

    return (
        <Helmet>
            <title>
                {post.Title} | {import.meta.env.VITE_SITE_NAME}
            </title>
            <link
                rel="canonical"
                href={`${import.meta.env.VITE_CLIENT_URL}/post/${post.Id}`}
            />
            <meta name="description" content={post.Title} />
            <meta
                name="keywords"
                content={`${
                    import.meta.env.VITE_SITE_NAME
                }, tech, blog, ${categories}`}
            />
            <meta name="author" content={import.meta.env.VITE_AUTHOR_NAME} />/
            <meta property="og:title" content={`${post.Title} | ${import.meta.env.VITE_SITE_NAME}`} />
            <meta property="og:description" content={post.Title} />
            <meta
                property="og:image"
                content={
                    post.Cover
                        ? post.Cover
                        : import.meta.env.VITE_DEFAULT_COVER_IMAGE
                }
            />
            <meta property="og:type" content="website" />
            <meta
                property="og:site_name"
                content={import.meta.env.VITE_AUTHOR_NAME}
            />
            <meta property="og:locale" content="ko_KR" />
            <meta
                property="og:url"
                content={`${import.meta.env.VITE_CLIENT_URL}/post/${post.Id}`}
            />
            <meta name="twitter:title" content={`${post.Title} | ${import.meta.env.VITE_SITE_NAME}`} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:description" content={post.Title} />
            <meta
                name="twitter:image"
                content={import.meta.env.VITE_DEFAULT_COVER_IMAGE}
            />
        </Helmet>
    );
};

export default Metadata;
