import React from 'react'

const ArticleLayout = ({ children, className }: {
    className?: string,
    children: React.ReactElement[] | React.ReactElement
}) => {
    return (
        <div className={`flex flex-col items-center relative -top-[150px] z-10
        ${className}`}>
            {children}
        </div>
    )
}

export default ArticleLayout;