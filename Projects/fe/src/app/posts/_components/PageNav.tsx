import { useMaxPageNum } from "@/_hooks/useMaxPageNum";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

interface PageNavProps {
    className?: string;
}
const PageNav = ({ className }: PageNavProps) => {
    const { category, page } = useParams();
    const { maxPageNum } = useMaxPageNum();

    if (!maxPageNum || !page) return null;
    const pageConverted = parseInt(page);

    const prevPages = Array.from({ length: 3 }).map((_, i) => {
        if (pageConverted - i - 1 < 1) return null;
        return pageConverted - i - 1;
    });
    prevPages.reverse();

    const nextPages = Array.from({ length: 3 }).map((_, i) => {
        if (pageConverted + i + 1 > maxPageNum) return null;
        return pageConverted + i + 1;
    });

    return (
        <div
            className={`flex text-default-18-dark dark:text-default-8 ${className}`}
        >
            <PageNav.ButtonLink
                to={`/categories/${category}/pages/${pageConverted - 1}`}
                className={`mr-3 ${
                    pageConverted <= 1 && "pointer-events-none"
                }`}
            >
                &lt;
                <div className="group-hover:underline">Prev</div>
            </PageNav.ButtonLink>

            <div className="flex">
                {prevPages.map((p) => {
                    if (!p) return null;
                    return (
                        <PageNav.Button
                            key={p}
                            to={`/categories/${category}/pages/${p}`}
                        >
                            {p}
                        </PageNav.Button>
                    );
                })}
            </div>

            <PageNav.Button
                className="mx-1 border-[0.05rem] border-orange-400 rounded-full text-orange-400 dark:text-orange-300
                dark:shadow-none shadow-lg shadow-orange-100 pb-[0.1rem] no-underline pointer-events-none"
            >
                {pageConverted}
            </PageNav.Button>

            <div className="flex">
                {nextPages.map((p) => {
                    if (!p) return null;
                    return (
                        <PageNav.Button
                            key={p}
                            to={`/categories/${category}/pages/${p}`}
                        >
                            {p}
                        </PageNav.Button>
                    );
                })}
            </div>

            <PageNav.ButtonLink
                to={`/categories/${category}/pages/${pageConverted + 1}`}
                className={`ml-3 ${
                    pageConverted >= maxPageNum && "pointer-events-none"
                }`}
            >
                <div className="group-hover:underline">Next</div>
                &gt;
            </PageNav.ButtonLink>
        </div>
    );
};

interface PageNavButtonProps {
    className?: string;
    to?: string;
    children: React.ReactNode;
}
PageNav.Button = ({ children, className, to }: PageNavButtonProps) => {
    return (
        <PageNav.ButtonLink
            className={`w-8 h-8 ${className}`}
            to={to ? to : ""}
        >
            <div className="group-hover:underline">{children}</div>
        </PageNav.ButtonLink>
    );
};

interface PageNavButtonLinkProps {
    className?: string;
    to: string;
    children: React.ReactNode;
}
PageNav.ButtonLink = ({ className, children, to }: PageNavButtonLinkProps) => {
    return (
        <Link
            to={to}
            className={`flex gap-1 items-center justify-center text-sm ${className} group underline-offset-2`}
        >
            {children}
        </Link>
    );
};

export default PageNav;
