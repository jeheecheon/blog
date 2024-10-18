import { useMaxPageNum } from "@/_hooks/useMaxPageNum";
import { HTMLAttributes } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";

interface PageNavProps {
    className?: string;
}
const PageNav = ({ className }: PageNavProps) => {
    const { category } = useParams();
    const { maxPageNum } = useMaxPageNum();
    const minPageNum = 1;

    const [searchParams] = useSearchParams();
    const page = searchParams.get("page") ?? "1";

    if (!maxPageNum || !page) return null;
    const pageConverted = Number(page);

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
                to={`/categories/${category}?page=${pageConverted - 1}`}
                className={`mr-3 ${
                    pageConverted <= minPageNum && "cursor-not-allowed"
                }`}
                onClick={(e) => {
                    if (pageConverted <= minPageNum) e.preventDefault();
                }}
            >
                &lt;
                <div
                    className={`${
                        pageConverted > minPageNum && "group-hover:underline"
                    }`}
                >
                    Prev
                </div>
            </PageNav.ButtonLink>

            <div className="flex">
                {prevPages.map((p) => {
                    if (!p) return null;
                    return (
                        <PageNav.Button
                            key={p}
                            to={`/categories/${category}?page=${p}`}
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
                            to={`/categories/${category}?page=${p}`}
                        >
                            {p}
                        </PageNav.Button>
                    );
                })}
            </div>

            <PageNav.ButtonLink
                to={`/categories/${category}?page=${pageConverted + 1}`}
                className={`ml-3 ${
                    pageConverted >= maxPageNum && "cursor-not-allowed"
                }`}
                onClick={(e) => {
                    if (pageConverted >= maxPageNum) e.preventDefault();
                }}
            >
                <div
                    className={`${
                        pageConverted < maxPageNum && "group-hover:underline"
                    }`}
                >
                    Next
                </div>
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

interface PageNavButtonLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    to: string;
}

PageNav.ButtonLink = ({
    className,
    children,
    to,
    ...props
}: PageNavButtonLinkProps) => {
    return (
        <Link
            to={to}
            className={`flex gap-1 items-center justify-center text-sm ${className} group underline-offset-2`}
            {...props}
        >
            {children}
        </Link>
    );
};

export default PageNav;
