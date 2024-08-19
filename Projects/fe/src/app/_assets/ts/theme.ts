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
    const postUrls = [
        "/post",
        "/about-me",
        "/privacy-policy",
        "/post/edit",
    ];
    let needsUpdate = false;
    for (const postUrl of postUrls) {
        if (pathname.startsWith(postUrl)) {
            needsUpdate = true;
            break;
        }
    }
    if (pathname === "/") {
        needsUpdate = true;
    }

    let themeColor = "";
    if (isDarkMode) {
        themeColor = needsUpdate ? "rgb(16, 16, 16)" : "rgb(24, 24, 27)";
        // themeColor = "rgb(16, 16, 16)";
    } else {
        themeColor = needsUpdate ? "rgb(255, 255, 255)" :"rgb(250, 250, 250)";
    }

    document.body.style.backgroundColor = themeColor;

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
