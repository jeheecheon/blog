import React from "react";

interface ButtonInCommentBoxProps {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    children: React.ReactNode;
    className?: string;
}

function ButtonInCommentBox({
    children,
    onClick,
    className,
}: ButtonInCommentBoxProps) {
    return (
        <button
            type="button"
            className={`flex flex-row rounded justify-between items-center w-fit cursor-pointer
            border-[0.1rem] py-[0.1875rem] px-2 text-xs gap-2 text-default-17-dark dark:text-default-15
            bg-default-1 dark:bg-default-3-dark border-default-6 dark:border-default-5-dark ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default ButtonInCommentBox;
