const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_CB_URL = "/oauth/google/sign-in";

function convertToBase64Url(url: string = window.location.href) {
    return btoa(url);
}

function getRedirectUri() {
    return `${import.meta.env.VITE_CLIENT_URL}${GOOGLE_CB_URL}`;
}

export function getGoogleLoginUrl() {
    console.log(getRedirectUri());
    return `${GOOGLE_AUTH_URL}?response_type=code&client_id=${
        import.meta.env.VITE_GOOGLE_CLIENT_ID
    }&redirect_uri=${getRedirectUri()}&scope=email&state=${convertToBase64Url()}`;
}
