import React from 'react'

interface ArticleLayoutProps {
    children?: React.ReactNode;
    className?: string;
}

const ArticleLayout: React.FC<ArticleLayoutProps> = React.memo(({ children, className }) => {
    return (
        <div className={`flex flex-col items-center relative -top-[150px] z-10
        ${className}`}>
            {children}
        </div>
    )
});

export default ArticleLayout;