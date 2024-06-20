import { NavLink } from "react-router-dom";
import { NavLinkRenderProps } from "@/_types/Navigation";

interface LinkButtonInfo {
    name: string;
    to: string;
    class?: string;
    subLinks?: LinkButtonInfo[];
}

const links: LinkButtonInfo[] = [
    {
        name: "😎 Portfolio",
        to: import.meta.env.VITE_PORTFOLIO_URL,
        class: "border-b-0",
    },
    {
        name: "✏️ Recent Posts",
        to: "/recent-posts/pages/1",
        class: "mt-4",
    },
    {
        name: "🔢 Algorithm",
        to: "/categories/Algorithm/pages/1",
    },
    {
        name: "🕸️ Web Development",
        to: "/categories/Web-Development/pages/1",
    },
    {
        name: "❓ Uncategorized",
        to: "/categories/Uncategorized/pages/1",
    },
];

const handleNavColor = (props?: NavLinkRenderProps) => {
    const { isActive } = props || { isActive: false };

    return isActive
        ? "text-orange-400"
        : "dark:text-default-7 text-default-18-dark" + " " + "font-[500]";
};

function convertLinksToJsx(links: LinkButtonInfo[]) {
    return links.map((link, index) => (
        <div
            key={index}
            className={`flex flex-col text-nowrap border-b-[1px] last:border-b-0 pb-2 px-1 text-sm 
                border-b-gray-400/60 dark:border-b-default-18 ${link.class}`}
        >
            {link.to && link.to?.includes("Portfolio") ? (
                <a
                    href={link.to}
                    className={handleNavColor({
                        isActive: false,
                        isPending: false,
                        isTransitioning: false,
                    })}
                >
                    {link.name}asd
                </a>
            ) : (
                <NavLink to={link.to} className={handleNavColor}>
                    {link.name}
                </NavLink>
            )}

            {link.subLinks && (
                <div className="ml-4">{convertLinksToJsx(link.subLinks)}</div>
            )}
        </div>
    ));
}

interface CategoryMenuProps {
    isCategoryOpen: boolean;
}

function CategoryMenu({ isCategoryOpen }: CategoryMenuProps) {
    return (
        <div
            className={`fixed flex flex-col mt-2 
            drop-shadow-xl border-[1px] border-slate-300 dark:border-default-18-dark ring-[0.4px] ring-orange-300 bg-default-2 dark:bg-default-5-dark
            rounded-xl p-4 dark:text-orange-50 text-default-10-dark text-base gap-2 transition-opacity duration-500
            ${
                isCategoryOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            {convertLinksToJsx(links)}
        </div>
    );
}

export default CategoryMenu;
