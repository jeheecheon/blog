import { Helmet } from "react-helmet-async";

const Metadata = () => {
    return (
        <Helmet>
            <title>Edit | {import.meta.env.VITE_SITE_NAME}</title>
            <link rel="canonical" href={import.meta.env.VITE_CLIENT_URL} />
            <meta name="description" content="Blog post edit page" />
            <meta name="keywords" content={`tech, blog, ${import.meta.env.VITE_SITE_NAME}`} />
            <meta name="author" content={import.meta.env.VITE_AUTHOR_NAME} />/
            <meta property="og:title" content={`Edit | ${import.meta.env.VITE_SITE_NAME}`} />
            <meta property="og:description" content="Blog post edit page" />
            <meta
                property="og:image"
                content={import.meta.env.VITE_DEFAULT_COVER_IMAGE}
            />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={import.meta.env.VITE_AUTHOR_NAME} />
            <meta property="og:locale" content="ko_KR" />
            <meta property="og:url" content={import.meta.env.VITE_CLIENT_URL} />
            <meta name="twitter:title" content={`Edit | ${import.meta.env.VITE_SITE_NAME}`} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:description" content="Blog post edit page" />
            <meta
                name="twitter:image"
                content={import.meta.env.VITE_DEFAULT_COVER_IMAGE}
            />
        </Helmet>
    );
};

export default Metadata;
