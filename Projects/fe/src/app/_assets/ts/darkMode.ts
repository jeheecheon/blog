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

const metas = document.head.getElementsByTagName("meta");
for (const meta of metas) {
    if (
        meta.name === "theme-color" ||
        meta.name === "msapplication-navbutton-color"
    ) {
        meta.content = isDarkMode ? "rgb(24, 24, 27)" : "rgb(255, 255, 255)";
    }
}
