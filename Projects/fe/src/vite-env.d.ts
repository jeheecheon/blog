/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
    readonly VITE_GOOGLE_CLIENT_ID: string;
    readonly VITE_SERVER_URL: string;
    readonly VITE_CLIENT_URL: string;
    readonly VITE_PORTFOLIO_URL: string;
    readonly VITE_SITE_NAME: string;
    readonly VITE_AUTHOR_NAME: string;
    readonly VITE_DEFAULT_COVER_IMAGE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
