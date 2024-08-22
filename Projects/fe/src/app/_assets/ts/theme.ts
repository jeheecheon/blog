const isDarkMode =
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

if (isDarkMode === true) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
} else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
}

const pathname = window.location.pathname;
setThemeColor(isDarkMode, pathname);

export function setThemeColor(isDarkMode: boolean, pathname: string) {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    const postUrls = ["/posts", "/about-me", "/privacy-policy", "/post/edit"];
    let isPostPage = false;
    for (const postUrl of postUrls) {
        if (pathname.startsWith(postUrl)) {
            isPostPage = true;
            break;
        }
    }

    const root = getComputedStyle(document.documentElement);

    let themeColor = "";
    themeColor = isPostPage
        ? root.getPropertyValue("--main-bg-color-2")
        : root.getPropertyValue("--main-bg-color-1");

    const metas = document.head.getElementsByTagName("meta");
    for (const meta of metas) {
        if (
            meta.name === "theme-color" ||
            meta.name === "msapplication-navbutton-color"
        ) {
            meta.content = themeColor;
        }
    }
}
