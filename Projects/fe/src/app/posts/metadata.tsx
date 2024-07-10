import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

function MetaData() {
    const { category, page } = useParams();

    return (
        <Helmet>
            <title>
                {category ? category : "Recent posts"} |{" "}
                {import.meta.env.VITE_SITE_NAME}
            </title>
            <link
                rel="canonical"
                href={`${
                    import.meta.env.VITE_CLIENT_URL
                }/categories${category}/pages/${page}`}
            />
            <meta name="description" content={`${category} posts`} />
            <meta
                name="keywords"
                content={`jeheecheon, tech, blog, posts, ${category}`}
            />
            <meta name="author" content="jeheecheon" />

            <meta property="og:title" content={`${category} posts | ${name}`} />
            <meta
                property="og:description"
                content={`${category} posts | ${name}`}
            />
            <meta
                property="og:image"
                content={import.meta.env.VITE_DEFAULT_COVER_IMAGE}
            />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="jeheecheon" />
            <meta property="og:locale" content="ko_KR" />
            <meta
                property="og:url"
                content={`${
                    import.meta.env.VITE_CLIENT_URL
                }/categories/${category}/pages/${page}`}
            />

            <meta
                name="twitter:title"
                content={`${category} posts | ${name}`}
            />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:description" content={`${category} posts`} />
            <meta
                name="twitter:image"
                content={import.meta.env.VITE_DEFAULT_COVER_IMAGE}
            />
        </Helmet>
    );
}

export default MetaData;
