import { Helmet } from "react-helmet-async";

const Metadata = () => {
    return (
        <Helmet>
            <title>{import.meta.env.VITE_AUTHOR_NAME} Blog</title>
            <link rel="canonical" href={import.meta.env.VITE_CLIENT_URL} />
            <meta
                name="description"
                content={`${import.meta.env.VITE_AUTHOR_NAME} Blog`}
            />
            <meta
                name="keywords"
                content={`${import.meta.env.VITE_AUTHOR_NAME}, tech, blog`}
            />
            <meta name="author" content={import.meta.env.VITE_AUTHOR_NAME} />/
            <meta
                property="og:title"
                content={`${import.meta.env.VITE_AUTHOR_NAME} Blog`}
            />
            <meta
                property="og:description"
                content={`${import.meta.env.VITE_AUTHOR_NAME} Blog`}
            />
            <meta property="og:type" content="website" />
            <meta
                property="og:site_name"
                content={import.meta.env.VITE_SITE_NAME}
            />
            <meta property="og:locale" content="ko_KR" />
            <meta property="og:url" content={import.meta.env.VITE_CLIENT_URL} />
            <meta
                name="twitter:title"
                content={`${import.meta.env.VITE_AUTHOR_NAME} Blog`}
            />
            <meta name="twitter:card" content="summary" />
            <meta
                name="twitter:description"
                content={`${import.meta.env.VITE_AUTHOR_NAME} Blog`}
            />
            <meta
                name="twitter:image"
                content={import.meta.env.VITE_DEFAULT_COVER_IMAGE}
            />
        </Helmet>
    );
};

export default Metadata;
