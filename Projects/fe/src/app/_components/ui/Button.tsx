import React from 'react'

interface ButtonProps {
    children: React.ReactNode,
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const Button = (props: ButtonProps) => {
    return (
        <button type='button' className={`h-fit py-1 px-3 rounded-xl w-fit border-[0.0625rem] dark:text-default-10 text-default-18-dark 
        border-slate-300 font-normal bg-default-1 hover:bg-orange-50/50 
        dark:hover:bg-default-6-dark dark:bg-default-5-dark dark:border-default-10-dark 
        dark:hover:border-default-18-dark 
        ${props.className}`}
            onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default Button;