import React from 'react'

interface ArticleLayoutProps {
    children?: React.ReactNode;
    className?: string;
}

const ArticleLayout: React.FC<ArticleLayoutProps> = React.memo(({ children, className }) => {
    return (
        <article className={`flex flex-col items-center relative -top-[150px] z-10
        ${className}`}>
            {children}
        </article>
    )
});

export default ArticleLayout;