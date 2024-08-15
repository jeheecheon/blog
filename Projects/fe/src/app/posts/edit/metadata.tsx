import { Helmet } from "react-helmet-async";

const Metadata = () => {
    return (
        <Helmet>
            <title>{import.meta.env.VITE_SITE_NAME} | Edit</title>
            <link rel="canonical" href={import.meta.env.VITE_CLIENT_URL} />
            <meta name="description" content="Blog post edit page" />
            <meta name="keywords" content="tech, blog, jeheecheon" />
            <meta name="author" content="jeheecheon" />/
            <meta property="og:title" content={`${import.meta.env.VITE_SITE_NAME} | Edit`} />
            <meta property="og:description" content="Blog post edit page" />
            <meta
                property="og:image"
                content={import.meta.env.VITE_DEFAULT_COVER_IMAGE}
            />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="jeheecheon" />
            <meta property="og:locale" content="ko_KR" />
            <meta property="og:url" content={import.meta.env.VITE_CLIENT_URL} />
            <meta name="twitter:title" content={`${import.meta.env.VITE_SITE_NAME} | Edit`} />
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
