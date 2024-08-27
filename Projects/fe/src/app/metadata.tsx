import { Helmet } from "react-helmet-async";

const Metadata = () => {
    return (
        <Helmet>
            <title>jeheecheon Blog</title>
            <link rel="canonical" href={import.meta.env.VITE_CLIENT_URL} />
            <meta name="description" content="jeheecheon Blog" />
            <meta name="keywords" content="jeheecheon, tech, blog" />
            <meta name="author" content="jeheecheon" />/
            <meta property="og:title" content="jeheecheon Blog" />
            <meta property="og:description" content="jeheecheon Blog" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="jeheecheon" />
            <meta property="og:locale" content="ko_KR" />
            <meta property="og:url" content={import.meta.env.VITE_CLIENT_URL} />
            <meta name="twitter:title" content="jeheecheon Blog" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:description" content="jeheecheon Blog" />
            <meta
                name="twitter:image"
                content={import.meta.env.VITE_DEFAULT_COVER_IMAGE}
            />
        </Helmet>
    );
};

export default Metadata;
